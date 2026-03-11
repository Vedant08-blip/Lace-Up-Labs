export function Newsletter() {
  return (
    <section
      id="newsletter"
      className="rounded-3xl bg-gradient-to-r from-black via-card to-black border border-zinc-800/80 p-5 space-y-4 min-h-[260px] flex flex-col justify-between"
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
          className="input-field flex-1"
        />
        <button className="btn-primary whitespace-nowrap">
          Join Community
        </button>
      </div>
    </section>
  );
}

export default Newsletter;

