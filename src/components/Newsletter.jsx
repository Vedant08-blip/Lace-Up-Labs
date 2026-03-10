export function Newsletter() {
  return (
    <section
      id="newsletter"
      className="rounded-3xl bg-gradient-to-r from-black via-card to-black border border-zinc-800/80 p-5 space-y-3"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
            Drop Alerts
          </p>
          <h2 className="font-heading text-2xl tracking-[0.16em] uppercase">
            Vault Newsletter
          </h2>
        </div>
      </div>
      <p className="text-xs text-zinc-300">
        Stay ahead of the line. Get early access to heat, exclusive
        AI-styled fits, and members-only pricing.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Enter your email for early drops"
          className="flex-1 rounded-full bg-black/70 border border-zinc-800 px-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/60"
        />
        <button className="rounded-full bg-accent px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-black shadow-glow hover:brightness-110 transition-transform hover:-translate-y-0.5">
          Join Vault
        </button>
      </div>
    </section>
  );
}

export default Newsletter;

