import { useState } from 'react'
import Hero from './components/Hero'
import Starter from './components/Starter'
import Conversation from './components/Conversation'
import Suggestions from './components/Suggestions'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [session, setSession] = useState(null)
  const [phase, setPhase] = useState('start') // start | converse | suggest

  const start = async ({ category, name, goal }) => {
    const res = await fetch(`${baseUrl}/api/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, name, goal }),
    })
    const data = await res.json()
    setSession(data)
    setPhase('converse')
  }

  const onDone = () => setPhase('suggest')

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      {phase === 'start' && <Starter onStart={start} />}
      {phase === 'converse' && session && (
        <Conversation session={session} onDone={onDone} />
      )}
      {phase === 'suggest' && session && <Suggestions session={session} />}
      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center text-slate-400">
          Built with an AI voice agent aura aesthetic — modern, minimal, and focused.
        </div>
      </footer>
    </div>
  )
}

export default App
