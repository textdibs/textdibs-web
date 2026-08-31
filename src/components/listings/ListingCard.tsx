import Image from "next/image";
import Link from "next/link";
import { conditionLabel, type Listing } from "@/lib/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block overflow-hidden rounded-2xl border border-foreground/10 transition hover:border-foreground/20"
    >
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
          <span className="text-base font-medium">{listing.title}</span>
          <span className="shrink-0 text-base font-semibold text-accent">
            ${listing.price}
          </span>
        </div>
        {conditionLabel(listing.condition) && (
          <span className="mt-1 block text-sm text-foreground/50">
            {conditionLabel(listing.condition)}
          </span>
        )}
      </div>
    </Link>
  );
}
