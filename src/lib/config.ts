export const dibsPhoneNumber = process.env.NEXT_PUBLIC_DIBS_PHONE_NUMBER ?? "";

export function smsHref(body?: string): string | null {
  if (!dibsPhoneNumber) return null;
  const query = body ? `?body=${encodeURIComponent(body)}` : "";
  return `sms:${dibsPhoneNumber}${query}`;
}
