import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { Btn, Picture } from '../components/Ui'

export default function Journal() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    api.journal().then(setRows).catch(() => {})
  }, [])

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Journal</p>
      <h1 className="display">For anyone still deciding</h1>
      <div className="card-grid" style={{ marginTop: '2rem' }}>
        {rows.map((a) => (
          <Link className="journal-card" to={`/journal/${a.slug}`} key={a.slug}>
            <Picture src={a.image} alt="" sizes="360px" />
            <p className="eyebrow" style={{ marginTop: '0.8rem' }}>{a.category}</p>
            <h2 className="display" style={{ fontSize: '1.8rem' }}>{a.title}</h2>
            <p className="muted">{a.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function Article() {
  const { slug } = useParams()
  const [row, setRow] = useState(null)
  useEffect(() => {
    api.article(slug).then(setRow).catch(() => {})
  }, [slug])
  if (!row) return <div className="wrap page-hero"><p>Loading…</p></div>

  return (
    <article className="wrap page-hero">
      <p className="breadcrumbs"><Link to="/journal">Journal</Link> / {row.title}</p>
      <p className="eyebrow">{row.category}</p>
      <h1 className="display">{row.title}</h1>
      <Picture src={row.image} alt="" sizes="80vw" />
      <p style={{ maxWidth: '62ch', marginTop: '1.6rem', fontSize: '1.12rem' }}>{row.body}</p>
      <div style={{ marginTop: '2rem' }}><Btn to="/book?path=consult" fill>Book a consultation</Btn></div>
    </article>
  )
}
