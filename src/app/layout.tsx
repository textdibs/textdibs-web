import type { Metadata } from "next";
import "./globals.css";

const description =
  "Sell with a photo, buy with a text. Dibs is a marketplace that lives in iMessage — your agent handles pricing, posting, and finding matches.";

export const metadata: Metadata = {
  title: "Dibs — the marketplace in your texts",
  description,
  openGraph: {
    title: "Dibs — the marketplace in your texts",
    description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
