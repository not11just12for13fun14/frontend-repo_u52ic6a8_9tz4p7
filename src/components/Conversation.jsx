import { useEffect, useState } from 'react'

function Conversation({ session, onDone }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [question, setQuestion] = useState('')
  const [step, setStep] = useState(0)
  const [total, setTotal] = useState(0)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNext()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchNext = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/session/${session.session_id}/next-question`)
      const data = await res.json()
      if (data.done) {
        onDone()
        return
      }
      setQuestion(data.question)
      setStep(data.step)
      setTotal(data.total_steps)
    } finally {
      setLoading(false)
    }
  }

  const submit = async () => {
    if (!answer.trim()) return
    setLoading(true)
    try {
      await fetch(`${baseUrl}/api/session/${session.session_id}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      })
      setAnswer('')
      await fetchNext()
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-slate-950 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-xl font-semibold">Step {step + 1} of {total}</h3>
            {loading && <span className="text-slate-400 text-sm">Thinking...</span>}
          </div>
          <p className="text-slate-200 mt-2 text-lg">{question}</p>

          <div className="mt-4">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              placeholder="Type your answer..."
              className="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </div>

          <div className="mt-4">
            <button
              onClick={submit}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold px-5 py-3 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Conversation
