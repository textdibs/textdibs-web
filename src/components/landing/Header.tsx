import Link from "next/link";
import { TextDibsButton } from "./TextDibsButton";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 sm:px-10">
      <Link href="/" className="text-xl font-semibold tracking-tight">
        Dibs
      </Link>
      <div className="flex items-center gap-5">
        <Link
          href="/listings"
          className="text-base font-medium text-foreground/70 transition hover:text-foreground"
        >
          Browse listings
        </Link>
        <TextDibsButton className="rounded-full bg-accent px-4 py-2 text-base font-medium text-white transition hover:bg-accent-hover">
          Text Dibs
        </TextDibsButton>
      </div>
    </header>
  );
}
