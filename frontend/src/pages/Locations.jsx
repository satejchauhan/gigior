import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { Btn, Picture } from '../components/Ui'

export default function Locations() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    api.locations().then(setRows).catch(() => {})
  }, [])

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Locations</p>
      <h1 className="display">Find the house</h1>
      <div className="card-grid" style={{ marginTop: '2rem' }}>
        {rows.map((l) => (
          <article className="loc-card" key={l.slug}>
            <Picture src={l.image} alt={l.name} sizes="400px" />
            <h2 className="display" style={{ fontSize: '2rem' }}>{l.name}</h2>
            <p className="muted">{l.address}<br />{l.phone}</p>
            <Btn to={`/locations/${l.slug}`} fill>Book at this house</Btn>
          </article>
        ))}
      </div>
    </div>
  )
}

export function Location() {
  const { slug } = useParams()
  const [row, setRow] = useState(null)
  useEffect(() => {
    api.location(slug).then(setRow).catch(() => {})
  }, [slug])
  if (!row) return <div className="wrap page-hero"><p>Loading…</p></div>

  return (
    <div className="wrap page-hero">
      <p className="breadcrumbs"><Link to="/locations">Locations</Link> / {row.name}</p>
      <h1 className="display">{row.name}</h1>
      <p>{row.neighbourhood}</p>
      <div className="two" style={{ marginTop: '2rem' }}>
        <Picture src={row.image} alt={row.name} sizes="50vw" />
        <div>
          <p className="eyebrow">Visit</p>
          <p>{row.address}</p>
          <p style={{ whiteSpace: 'pre-line' }}>{row.hours}</p>
          <p>{row.phone}<br />{row.email}</p>
          <p className="muted">{row.parking}</p>
          <div className="btn-row" style={{ marginTop: '1rem' }}>
            <Btn to={`/book?location=${row.slug}`} fill>Book appointment</Btn>
            {row.whatsapp && <Btn href={`https://wa.me/${row.whatsapp.replace(/\D/g, '')}`}>WhatsApp</Btn>}
          </div>
        </div>
      </div>
    </div>
  )
}
