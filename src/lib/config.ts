export const dibsPhoneNumber = process.env.NEXT_PUBLIC_DIBS_PHONE_NUMBER ?? "";

export function smsHref(body?: string): string | null {
  if (!dibsPhoneNumber) return null;
  const query = body ? `?body=${encodeURIComponent(body)}` : "";
  return `sms:${dibsPhoneNumber}${query}`;
}

// Server-only: textdibs-backend's base URL. Listings are fetched in Server
// Components (see docs/api_contract.md), so this never reaches the client
// and doesn't need a NEXT_PUBLIC_ prefix.
export const apiUrl = process.env.DIBS_API_URL ?? "http://localhost:8000";

// Server-only fallback for reading listings directly from Supabase (same
// project/key textdibs-backend already uses) when the backend API itself is
// unreachable. Primary path stays the API — see getListings() in listings.ts.
export const supabaseUrl = process.env.SUPABASE_URL ?? "";
export const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
