import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { Btn, Picture } from '../components/Ui'
import { Reveal } from '../components/Reveal'

const COPY = {
  salon: {
    title: 'Salon',
    line: 'Hair, styling, and beauty craft. Prices from the chair — quoted in daylight.',
    image: '/images/pillar-salon.png',
  },
  aesthetics: {
    title: 'Aesthetics',
    line: 'Clinically-led skin and facial work. Plans, not packages. Consultation first.',
    image: '/images/pillar-aesthetics.png',
  },
}

export default function Pillar() {
  const { pathname } = useLocation()
  const pillar = pathname.startsWith('/aesthetics') ? 'aesthetics' : 'salon'
  const [data, setData] = useState(null)
  useEffect(() => {
    api.services().then(setData).catch(() => setData({ salon: {}, aesthetics: {}, all: [] }))
  }, [])
  const meta = COPY[pillar] || COPY.salon
  const groups = data?.[pillar] || {}

  return (
    <>
      <div className="wrap page-hero">
        <p className="breadcrumbs"><Link to="/">Home</Link> / {meta.title}</p>
        <p className="eyebrow">{meta.title}</p>
        <h1 className="display">{meta.title}</h1>
        <p>{meta.line}</p>
        <div className="btn-row" style={{ marginTop: '1.2rem' }}>
          <Btn to="/finder">Treatment finder</Btn>
          <Btn to={`/book?path=${pillar === 'aesthetics' ? 'consult' : 'service'}`} fill>
            {pillar === 'aesthetics' ? 'Request a consultation' : 'Book appointment'}
          </Btn>
        </div>
      </div>
      <figure className="page-visual">
        <Picture src={meta.image} alt={meta.title} sizes="100vw" eager />
      </figure>
      <div className="wrap">
        {Object.entries(groups).map(([cat, items]) => (
          <section className="section--tight" key={cat}>
            <h2 className="display" style={{ fontSize: '2.4rem', textTransform: 'capitalize' }}>{cat.replace('-', ' ')}</h2>
            <div className="card-grid" style={{ marginTop: '1.2rem' }}>
              {items.map((s) => (
                <Reveal as="article" className="card" key={s.slug}>
                  <Picture src={s.image} alt={s.name} sizes="360px" />
                  <h3>{s.name}</h3>
                  <p className="muted">{s.short_line}</p>
                  <Btn to={`/${s.pillar}/${s.category}/${s.slug}`}>Learn more</Btn>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

export function Category() {
  const { pillar, category } = useParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    api.services().then(setData).catch(() => setData({ salon: {}, aesthetics: {} }))
  }, [pillar, category])
  const items = data?.[pillar]?.[category] || []
  const title = category?.replace('-', ' ')

  return (
    <div className="wrap page-hero">
      <p className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to={`/${pillar}`}>{pillar}</Link> / {title}
      </p>
      <h1 className="display" style={{ textTransform: 'capitalize' }}>{title}</h1>
      <div className="card-grid" style={{ marginTop: '2rem' }}>
        {items.map((s) => (
          <article className="card" key={s.slug}>
            <Picture src={s.image} alt={s.name} sizes="360px" />
            <h3>{s.name}</h3>
            <p className="muted">{s.benefit}</p>
            <Btn to={`/${s.pillar}/${s.category}/${s.slug}`} fill>Learn more</Btn>
          </article>
        ))}
      </div>
    </div>
  )
}
