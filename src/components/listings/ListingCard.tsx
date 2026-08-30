import Image from "next/image";
import type { Listing } from "@/lib/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/10">
      <div className="relative aspect-square w-full bg-foreground/5">
        <Image
          src={listing.photo_urls[0]}
          alt={listing.title}
          fill
          sizes="(min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium">{listing.title}</span>
          <span className="shrink-0 text-sm font-semibold text-accent">
            ${listing.price}
          </span>
        </div>
      </div>
    </div>
  );
}
