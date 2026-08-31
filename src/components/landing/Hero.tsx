import { TextDibsButton } from "./TextDibsButton";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
      <h1 className="max-w-2xl text-5xl font-semibold tracking-tight sm:text-6xl">
        The marketplace in your texts
      </h1>
      <p className="max-w-xl text-xl text-foreground/70">
        Text a photo to sell, text what you want to buy. Your agent handles
        pricing, posting, and finding matches while you go about your day.
      </p>
      <TextDibsButton className="rounded-full bg-accent px-6 py-3 text-base font-medium text-white transition hover:bg-accent-hover">
        Text Dibs to get started
      </TextDibsButton>
    </section>
  );
}
