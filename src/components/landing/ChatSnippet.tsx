export function ChatSnippet() {
  return (
    <section className="flex justify-center px-6 pb-20">
      <div className="w-full max-w-sm space-y-2 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-message-sent px-4 py-2 text-base text-white">
            📷 desk lamp, barely used
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-message-received px-4 py-2 text-base text-black">
            Got it — posted for $18. I&apos;ll let you know when someone&apos;s
            interested.
          </div>
        </div>
      </div>
    </section>
  );
}
