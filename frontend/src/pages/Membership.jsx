import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Btn } from '../components/Ui'

export default function Membership() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    api.memberships().then(setRows).catch(() => {})
  }, [])

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Membership</p>
      <h1 className="display">A cadence with the house</h1>
      <p style={{ maxWidth: '48ch' }}>Relationship and access — priority in the book, a named practitioner, scheduled reviews. Not a percentage off.</p>
      <div className="card-grid" style={{ marginTop: '2.4rem' }}>
        {rows.map((m) => (
          <article key={m.name} style={{ background: 'var(--cream)', padding: '1.6rem' }}>
            <h2 className="display" style={{ fontSize: '2.4rem' }}>{m.name}</h2>
            <p>{m.tagline}</p>
            <p className="eyebrow" style={{ margin: '0.8rem 0' }}>{m.price_label}</p>
            <ul>{(m.perks || []).map((p) => <li key={p}>— {p}</li>)}</ul>
            <div style={{ marginTop: '1.2rem' }}><Btn to="/book?path=consult" fill>Begin</Btn></div>
          </article>
        ))}
      </div>
    </div>
  )
}
