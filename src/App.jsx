import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Starter from './components/Starter'
import Conversation from './components/Conversation'
import Suggestions from './components/Suggestions'
import Upgrade from './components/Upgrade'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [clientId, setClientId] = useState(null)
  const [plan, setPlan] = useState('free')
  const [session, setSession] = useState(null)
  const [phase, setPhase] = useState('start') // start | converse | suggest
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [pendingStart, setPendingStart] = useState(null)

  // Initialize anonymous account
  useEffect(() => {
    const ensureClient = async () => {
      let id = localStorage.getItem('client_id')
      if (!id) {
        id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`
        localStorage.setItem('client_id', id)
      }
      setClientId(id)
      try {
        const res = await fetch(`${baseUrl}/api/account/init`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ client_id: id }),
        })
        if (res.ok) {
          const data = await res.json()
          setPlan(data.plan || 'free')
        }
      } catch (e) {
        // ignore; backend may be offline
      }
    }
    ensureClient()
  }, [baseUrl])

  const start = async ({ category, name, goal }) => {
    if (!clientId) return
    const payload = { category, name, goal, client_id: clientId }
    setPendingStart(payload)
    try {
      const res = await fetch(`${baseUrl}/api/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        if (res.status === 402) {
          setShowUpgrade(true)
          return
        }
        const err = await res.json().catch(() => null)
        throw new Error(err?.detail || `Failed: ${res.status}`)
      }
      const data = await res.json()
      setSession(data)
      setPhase('converse')
    } catch (e) {
      console.error(e)
    }
  }

  const onDone = () => setPhase('suggest')

  const handleUpgrade = async () => {
    if (!clientId) return
    try {
      const res = await fetch(`${baseUrl}/api/account/upgrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: clientId }),
      })
      if (res.ok) {
        const data = await res.json()
        setPlan(data.plan || 'pro')
        setShowUpgrade(false)
        if (pendingStart) {
          // Retry starting the session now that plan is pro
          await start({ category: pendingStart.category, name: pendingStart.name, goal: pendingStart.goal })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      {showUpgrade ? (
        <Upgrade onUpgrade={handleUpgrade} />
      ) : (
        <>
          {phase === 'start' && <Starter onStart={start} />}
          {phase === 'converse' && session && (
            <Conversation session={session} onDone={onDone} />
          )}
          {phase === 'suggest' && session && <Suggestions session={session} />}
        </>
      )}
      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <span>Plan:</span>
            <span className={`px-2 py-0.5 rounded text-white text-sm ${plan === 'pro' ? 'bg-emerald-600/70' : 'bg-indigo-600/70'}`}>
              {plan.toUpperCase()}
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
