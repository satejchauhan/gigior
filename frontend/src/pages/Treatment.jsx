import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { Btn } from '../components/Ui'

export default function Treatment() {
  const { pillar, category, slug } = useParams()
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    api.service(pillar, slug).then(setData).catch((e) => setErr(e.message))
  }, [pillar, slug])

  if (err) return <div className="wrap page-hero"><p>{err}</p></div>
  if (!data?.service) return <div className="wrap page-hero"><p>Loading…</p></div>

  const s = data.service
  const extra = s.extra || {}
  const consult = s.booking_mode === 'consultation'
  const bookTo = `/book?service=${s.slug}&path=${consult ? 'consult' : 'service'}`

  return (
    <article className="wrap page-hero">
      <p className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <Link to={`/services/${category === 'injectables' || category === 'laser' || category === 'hair-restoration' || category === 'body' ? 'aesthetics' : category === 'bridal' ? 'makeup' : category}`}>{category}</Link> / {s.name}
      </p>
      <div className="two">
        <div>
          <p className="eyebrow">{consult ? 'Consultation required' : 'Salon'}</p>
          <h1 className="display">{s.name}</h1>
          <p>{s.benefit}</p>
          <div className="btn-row" style={{ marginTop: '1.2rem' }}>
            <Btn to={bookTo} fill>{consult ? 'Book a consultation' : 'Book appointment'}</Btn>
            <Btn to="/services">All services</Btn>
          </div>
        </div>
      </div>

      <section className="section--tight">
        <p className="eyebrow">Overview</p>
        <p style={{ maxWidth: '62ch', fontSize: '1.15rem' }}>{s.overview}</p>
      </section>

      <section className="section--tight">
        <p className="eyebrow">Who it is for</p>
        <ul>{(extra.who || []).map((w) => <li key={w}>— {w}</li>)}</ul>
      </section>

      <section className="section--tight">
        <p className="eyebrow">Benefits</p>
        <ul>{(extra.benefits || []).map((w) => <li key={w}>— {w}</li>)}</ul>
      </section>

      <section className="section--tight">
        <p className="eyebrow">The visit</p>
        <div className="facts">
          {(extra.process || []).map((step, i) => (
            <div key={step}><strong>0{i + 1}</strong><p>{step}</p></div>
          ))}
        </div>
      </section>

      <section className="section--tight">
        <p className="eyebrow">Expected results</p>
        <p style={{ maxWidth: '60ch' }}>{extra.results}</p>
      </section>

      <section className="section--tight facts">
        <div><p className="eyebrow">Duration</p><p>{s.duration_label}</p></div>
        <div><p className="eyebrow">Investment</p><p>{s.price_label}</p></div>
        <div><p className="eyebrow">Booking</p><p>{consult ? 'Consultation first' : 'Reservable'}</p></div>
      </section>

      <section className="section--tight">
        <p className="eyebrow">Suitable / not yet</p>
        <p style={{ maxWidth: '60ch' }}>{extra.contra}</p>
      </section>

      <section className="section--tight">
        <p className="eyebrow">Practitioners</p>
        <div className="h-scroll">
          {data.practitioners.map((p) => (
            <article key={p.slug}>
              <h3 className="display" style={{ fontSize: '1.6rem' }}>{p.name}</h3>
              <p className="muted">{p.role}<br />{p.register_line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section--tight faq">
        <p className="eyebrow">Questions</p>
        {(extra.faqs || []).map((f) => (
          <details key={f.q}><summary>{f.q}</summary><p className="muted">{f.a}</p></details>
        ))}
      </section>

      <section className="section--tight">
        <p className="eyebrow">Related</p>
        <div className="card-grid">
          {data.related.map((r) => (
            <Link key={r.slug} to={`/${r.pillar}/${r.category}/${r.slug}`}>
              <h3 className="display" style={{ fontSize: '1.6rem' }}>{r.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="final-cta section">
        <h2 className="display">{consult ? 'Confirm fit in a consultation.' : 'Reserve this in the book.'}</h2>
        <Btn to={bookTo} fill>{consult ? 'Book a consultation' : 'Book appointment'}</Btn>
      </section>
    </article>
  )
}
