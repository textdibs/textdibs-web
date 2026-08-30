const sellSteps = [
  "Text a photo of what you're selling.",
  "Your agent prices it, posts it, and handles buyer interest.",
  "You step in once there's a real buyer.",
];

const buySteps = [
  "Text Dibs what you're looking for.",
  "Your agent finds a match, or keeps looking until one shows up.",
  "Or just browse the marketplace — coming soon.",
];

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-4 space-y-4">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs font-medium">
            {i + 1}
          </span>
          <span className="text-foreground/80">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function HowItWorks() {
  return (
    <section className="mx-auto grid w-full max-w-4xl gap-12 px-6 py-20 sm:grid-cols-2">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
          Selling
        </h2>
        <StepList steps={sellSteps} />
      </div>
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
          Buying
        </h2>
        <StepList steps={buySteps} />
      </div>
    </section>
  );
}
