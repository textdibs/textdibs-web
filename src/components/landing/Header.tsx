import { TextDibsButton } from "./TextDibsButton";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 sm:px-10">
      <span className="text-lg font-semibold tracking-tight">Dibs</span>
      <TextDibsButton className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover">
        Text Dibs
      </TextDibsButton>
    </header>
  );
}
