import { apiUrl, supabaseUrl, supabaseServiceRoleKey } from "@/lib/config";

export type Listing = {
  id: number;
  title: string;
  description: string;
  price: string;
  photo_urls: string[];
  created_at: string;
};

// Mirrors the backend's own "publicly viewable" filter (app/main.py) so the
// fallback below returns the same rows the API would.
const PUBLIC_FILTER =
  "status=eq.active&title=not.is.null&description=not.is.null&price=not.is.null";
const SELECT = "id,title,description,price,photo_urls,created_at";

function supabaseHeaders() {
  return {
    apikey: supabaseServiceRoleKey,
    Authorization: `Bearer ${supabaseServiceRoleKey}`,
  };
}

// Direct-to-Supabase fallback for when textdibs-backend itself is
// unreachable. Same Supabase project/key the backend already uses for
// Storage — kept server-only, never exposed to the client. The backend API
// is still the primary path (see docs/api_contract.md); this only kicks in
// on a fetch failure below.
async function getListingsFromSupabase(): Promise<Listing[]> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/listing?select=${SELECT}&${PUBLIC_FILTER}&order=created_at.desc`,
    { headers: supabaseHeaders(), next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error(`Supabase fallback failed: ${res.status}`);
  return res.json();
}

async function getListingFromSupabase(id: string): Promise<Listing | null> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/listing?select=${SELECT}&id=eq.${id}&${PUBLIC_FILTER}`,
    { headers: supabaseHeaders(), next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error(`Supabase fallback failed: ${res.status}`);
  const rows: Listing[] = await res.json();
  return rows[0] ?? null;
}

// Fetched server-side from textdibs-backend (see docs/api_contract.md) — no
// client-side fetch, so listing pages still render real content/OG tags for
// link-preview bots.
export async function getListings(): Promise<Listing[]> {
  try {
    const res = await fetch(`${apiUrl}/listings`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Failed to fetch listings: ${res.status}`);
    return await res.json();
  } catch (err) {
    if (!supabaseUrl || !supabaseServiceRoleKey) throw err;
    return getListingsFromSupabase();
  }
}

export async function getListing(id: string): Promise<Listing | null> {
  try {
    const res = await fetch(`${apiUrl}/listings/${id}`, {
      next: { revalidate: 60 },
    });
    // A 404 here is ambiguous — it could mean "no such listing" from a
    // working API, or "route doesn't exist" from a backend that isn't
    // deployed with this endpoint yet. Don't short-circuit on it; fall
    // through to the Supabase fallback below, which resolves the real
    // answer either way (empty result there also means not-found).
    if (!res.ok) throw new Error(`Failed to fetch listing ${id}: ${res.status}`);
    return await res.json();
  } catch (err) {
    if (!supabaseUrl || !supabaseServiceRoleKey) throw err;
    return getListingFromSupabase(id);
  }
}
