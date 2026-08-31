import type { ReactNode } from "react";
import { smsHref } from "@/lib/config";

export function TextDibsButton({
  className,
  children,
  body,
}: {
  className?: string;
  children: ReactNode;
  body?: string;
}) {
  const href = smsHref(body);

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="Coming soon — the number isn't live yet"
        className={`cursor-not-allowed opacity-50 ${className ?? ""}`}
      >
        {children}
      </span>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
