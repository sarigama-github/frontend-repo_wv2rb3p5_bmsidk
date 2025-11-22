import { useEffect, useState } from 'react'
import Onboarding from './Onboarding'

function NavItem({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`px-3 py-2 rounded-lg text-sm ${active ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/10'}`}>{label}</button>
  )
}

export default function Shell() {
  const [view, setView] = useState('home')
  const [showOnboard, setShowOnboard] = useState(false)

  useEffect(() => {
    const done = localStorage.getItem('tl_onboard_done') === '1'
    if (!done) setShowOnboard(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="font-bold">Team Logger</div>
          <nav className="flex items-center gap-2">
            {['Home','Log','Journal','Reminders','Trash'].map((n) => (
              <NavItem key={n} label={n} active={view.toLowerCase()===n.toLowerCase()} onClick={() => setView(n.toLowerCase())} />
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">
        {view === 'home' && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Quick Log" desc="Add a quick note with optional backdate."/>
            <Card title="Journal" desc="Write longer entries. Make posts private if needed."/>
            <Card title="Reminders" desc="Create one-off or repeating reminders."/>
            <Card title="Trash" desc="Restore or permanently delete soft-deleted items."/>
          </div>
        )}
        {view === 'log' && <Placeholder title="Logs" />}
        {view === 'journal' && <Placeholder title="Journal" />}
        {view === 'reminders' && <Placeholder title="Reminders" />}
        {view === 'trash' && <Placeholder title="Trash" />}
      </main>
      {showOnboard && <Onboarding onClose={() => setShowOnboard(false)} />}
    </div>
  )
}

function Card({ title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="text-lg font-semibold mb-1">{title}</div>
      <div className="text-sm text-slate-300">{desc}</div>
    </div>
  )
}

function Placeholder({ title }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300">
      {title} UI will appear here as we implement features.
    </div>
  )
}
