import { useEffect, useState } from 'react'

function Suggestions({ session }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])

  useEffect(() => {
    const run = async () => {
      const res = await fetch(`${baseUrl}/api/session/${session.session_id}/suggestions`)
      const data = await res.json()
      setItems(data.suggestions || [])
    }
    run()
  }, [baseUrl, session])

  return (
    <section className="bg-slate-950 py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-end justify-between mb-4">
          <h3 className="text-white text-2xl font-semibold">Personalized suggestions</h3>
          <span className="text-slate-400 text-sm">{items.length} ideas</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((it) => (
            <div key={it.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="text-white font-semibold text-lg">{it.title}</h4>
              <p className="text-slate-300 mt-1 text-sm">{it.summary}</p>
              {it.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <span key={t} className="text-xs bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 rounded-full px-2 py-1">{t}</span>
                  ))}
                </div>
              )}
              {it.steps && (
                <ol className="mt-4 list-decimal list-inside text-slate-200/90 text-sm space-y-1">
                  {it.steps.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Suggestions
