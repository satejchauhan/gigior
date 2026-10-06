import { Link, useParams } from 'react-router-dom'
import { Btn, Picture } from '../components/Ui'
import { Reveal } from '../components/Reveal'
import { Ghost, Tile } from '../components/Salon'
import { usePageTitle } from '../lib/usePageTitle'
import { serviceGroups, servicesFor } from '../data/site'

const TILE = ['xl', 'a', 'b', 'c', 'd', 'e']

export default function Services() {
  usePageTitle('Services')

  return (
    <article>
      <div className="wrap page-hero">
        <p className="eyebrow">Services</p>
        <h1 className="display">Hair, skin, and the work between</h1>
        <p>Six rooms of the book. Choose one, or reserve a consultation if you are not sure.</p>
      </div>
      <Reveal as="section" className="band">
        <Ghost word="Services" />
        <div className="mosaic">
          {serviceGroups.map((g, i) => (
            <Tile key={g.slug} to={`/services/${g.slug}`} image={g.image} label={g.name} size={TILE[i] || 'm'} />
          ))}
        </div>
      </Reveal>
    </article>
  )
}

export function ServiceCategory() {
  const { slug } = useParams()
  const group = serviceGroups.find((g) => g.slug === slug)
  const items = servicesFor(slug)
  usePageTitle(group?.name || 'Services')

  if (!group) {
    return (
      <div className="wrap page-hero">
        <h1 className="display">That service is not in the book</h1>
        <Btn to="/services">All services</Btn>
      </div>
    )
  }

  return (
    <article>
      <section className="stage">
        <div className="stage__media">
          <Picture src={group.image} alt={group.name} sizes="50vw" />
        </div>
        <div className="stage__copy">
          <p className="breadcrumbs">
            <Link to="/">Home</Link> / <Link to="/services">Services</Link> / {group.name}
          </p>
          <p className="eyebrow">Services</p>
          <h1 className="display chapter__title">{group.name}</h1>
          <p className="stage__line">{group.line}</p>
          <div className="stage__links">
            <Btn to="/book" className="text-link">Book appointment</Btn>
            <Btn to="/contact" className="text-link">Ask the house</Btn>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">In this room</p>
          <div className="card-grid" style={{ marginTop: '1.4rem' }}>
            {items.map((s) => (
              <article key={s.slug} className="room-card">
                {s.image && <Picture src={s.image} alt={s.name} sizes="(max-width: 700px) 92vw, 30vw" />}
                <h3 className="display" style={{ fontSize: '1.8rem' }}>{s.name}</h3>
                <p>{s.benefit}</p>
                <p className="muted">{s.duration_label} · {s.price_label}</p>
                <div className="btn-row" style={{ marginTop: '0.8rem' }}>
                  <Btn
                    to={`/book?service=${s.bookSlug || s.slug}&path=${s.booking_mode === 'consultation' ? 'consult' : 'service'}`}
                    fill
                  >
                    {s.booking_mode === 'consultation' ? 'Book a consultation' : 'Book appointment'}
                  </Btn>
                  {s.pillar && <Btn to={`/${s.pillar}/${s.category}/${s.slug}`}>Details</Btn>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
