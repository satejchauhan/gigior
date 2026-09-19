import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { Btn, Picture } from '../components/Ui'

export default function Results() {
  const [data, setData] = useState(null)
  const [pillar, setPillar] = useState('')
  const [concern, setConcern] = useState('')

  useEffect(() => {
    const q = new URLSearchParams()
    if (pillar) q.set('pillar', pillar)
    if (concern) q.set('concern', concern)
    api.results(q.toString() ? `?${q}` : '').then(setData).catch(() => setData({ items: [], concerns: [], disclaimer: '' }))
  }, [pillar, concern])

  const items = data?.items || []
  const empty = data && items.length === 0

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Results</p>
      <h1 className="display">Before, after, and the time between</h1>
      <p className="notice">{data?.disclaimer} Real client, consent on file.</p>
      <div className="filter-bar">
        {['', 'salon', 'aesthetics'].map((p) => (
          <button key={p || 'all'} className={!pillar && !p ? 'is-on' : pillar === p ? 'is-on' : ''} onClick={() => setPillar(p)}>
            {p || 'All'}
          </button>
        ))}
        {(data?.concerns || []).map((c) => (
          <button key={c} className={concern === c ? 'is-on' : ''} onClick={() => setConcern(concern === c ? '' : c)}>{c}</button>
        ))}
      </div>
      {empty && (
        <p>No results yet for this combination. Here is the closest path: <Link to="/finder">treatment finder</Link> or a <Link to="/book?path=consult">consultation</Link>.</p>
      )}
      <div className="ba-grid">
        {items.map((r) => (
          <article className="ba" key={r.id}>
            <div className="ba__pair">
              <Picture src={r.before_image} alt={`${r.treatment} before`} sizes="220px" />
              <Picture src={r.after_image} alt={`${r.treatment} after`} sizes="220px" />
            </div>
            <h3 className="display" style={{ fontSize: '1.6rem' }}>{r.treatment}</h3>
            <p className="muted">{r.concern} · {r.timeline}<br />{r.description}<br />{r.guest_label} · {r.practitioner}</p>
            <Btn to="/book">Book this treatment</Btn>
          </article>
        ))}
      </div>
    </div>
  )
}
