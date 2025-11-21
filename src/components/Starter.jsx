import { useState } from 'react'

const categories = [
  { id: 'business', label: 'Business Ventures' },
  { id: 'content', label: 'Content Creation' },
  { id: 'general', label: 'General Problem-Solving' },
]

function Starter({ onStart }) {
  const [category, setCategory] = useState('business')
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  return (
    <section className="relative bg-slate-950 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-white text-2xl font-semibold">Start a brainstorming session</h2>
          <p className="text-slate-300 mt-1">Pick a track and tell us what you want to achieve.</p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition border ${
                  category === c.id
                    ? 'bg-indigo-600/80 text-white border-indigo-400/40'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10 border-white/10'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="What goal do you have for this session?"
              className="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={() => onStart({ category, name, goal })}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-5 py-3 transition"
            >
              Start Session
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Starter
