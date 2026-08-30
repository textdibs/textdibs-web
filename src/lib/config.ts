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
