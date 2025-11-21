function Upgrade({ onUpgrade }) {
  return (
    <section className="bg-slate-950 py-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/10 to-orange-500/10 p-6 sm:p-8">
          <h3 className="text-white text-2xl font-semibold">Daily limit reached</h3>
          <p className="text-slate-300 mt-2">
            Free plan includes 1 brainstorming session per day. Upgrade to Pro for unlimited brainstorming.
          </p>
          <div className="mt-6">
            <button
              onClick={onUpgrade}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-5 py-3 transition"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Upgrade
