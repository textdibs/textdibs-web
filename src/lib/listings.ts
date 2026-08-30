import { apiUrl } from "@/lib/config";

export type Listing = {
  id: number;
  title: string;
  description: string;
  price: string;
  photo_urls: string[];
  created_at: string;
};

// Fetched server-side from textdibs-backend (see docs/api_contract.md) — no
// client-side fetch, so listing pages still render real content/OG tags for
// link-preview bots.
export async function getListings(): Promise<Listing[]> {
  const res = await fetch(`${apiUrl}/listings`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch listings: ${res.status}`);
  return res.json();
}
