import type { ReactNode } from "react";
import Link from "next/link";

export function BackLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition hover:text-foreground"
    >
      <span aria-hidden>←</span>
      {children}
    </Link>
  );
}
