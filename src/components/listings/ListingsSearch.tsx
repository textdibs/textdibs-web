"use client";

import { useState } from "react";
import type { Listing } from "@/lib/listings";
import { ListingCard } from "./ListingCard";

export function ListingsSearch({ listings }: { listings: Listing[] }) {
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? listings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(normalized) ||
          listing.description.toLowerCase().includes(normalized),
      )
    : listings;

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search listings…"
        className="mt-8 w-full rounded-full border border-foreground/15 bg-background px-5 py-3 text-base outline-none transition focus:border-accent"
      />
      {filtered.length === 0 ? (
        <p className="mt-8 text-lg text-foreground/60">
          No listings match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
