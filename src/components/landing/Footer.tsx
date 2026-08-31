import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-foreground/10 px-6 py-8 text-center text-sm text-foreground/50">
      <p>© {new Date().getFullYear()} Dibs</p>
      <Link
        href="/privacy"
        className="mt-2 inline-block transition hover:text-foreground"
      >
        Privacy Policy
      </Link>
    </footer>
  );
}
