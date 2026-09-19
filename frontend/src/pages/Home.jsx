import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { Btn, Picture } from '../components/Ui'
import { Reveal } from '../components/Reveal'
import { usePageTitle } from '../lib/usePageTitle'

const CONCERNS = ['Skin', 'Hair', 'Face', 'Body', 'Ageing', 'Acne', 'Pigmentation', 'Hair Loss', 'Bridal Prep']

export default function Home() {
  usePageTitle('')
  const [data, setData] = useState(null)
  const [concern, setConcern] = useState('')
  const [found, setFound] = useState(null)

  useEffect(() => {
    api.home().then(setData).catch(() => setData({ brand: {} }))
  }, [])

  async function pickConcern(name) {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    const next = concern === slug ? '' : slug
    setConcern(next)
    if (!next) {
      setFound(null)
      return
    }
    try {
      setFound(await api.finder(next))
    } catch {
      setFound({ items: [] })
    }
  }

  const brand = data?.brand || {}
  const wa = brand.whatsapp ? `https://wa.me/${brand.whatsapp.replace(/\D/g, '')}` : 'https://wa.me/00000000000'

  return (
    <>
      <section className="hero">
        <Picture
          src="/images/hero-home.png"
          alt="Sunlit hair in the GIGIOR rooms"
          widths={[800, 1400, 2000]}
          sizes="100vw"
          eager
        />
        <div className="hero__scrim" />
        <div className="wrap hero__content">
          <p className="eyebrow">GIGIOR</p>
          <h1 className="display">{brand.tagline || 'Hair and skin, held to one standard.'}</h1>
          <p>{brand.support || 'Consultation-led salon and aesthetic work — composed, never hurried.'}</p>
          <div className="btn-row">
            <Btn to="/book" fill light>Reserve</Btn>
            <Btn to="/finder" light>Explore treatments</Btn>
          </div>
          <p className="eyebrow" style={{ marginTop: '1.4rem', opacity: 0.8 }}>
            {brand.years || '8'} years · {brand.locations_count || '1'} house · {brand.practitioners_count || '12'} practitioners
          </p>
        </div>
      </section>

      <section className="trust section--tight">
        <div className="wrap">
          <div className="trust__stats">
            <div><strong>{brand.years || '8'}</strong>Years</div>
            <div><strong>{brand.locations_count || '1'}</strong>House</div>
            <div><strong>{brand.practitioners_count || '12'}</strong>Practitioners</div>
            <div><strong>{brand.rating || '4.9'}</strong>Google · {brand.review_count || '320'}</div>
          </div>
          <div className="trust__press">
            <span>Consultation-led</span>
            <span>Prescriber on site</span>
            <span>Single-use protocol</span>
            <span>Named devices</span>
          </div>
        </div>
      </section>

      <section className="split">
        <Link to="/salon">
          <Picture src={data?.split?.salon?.image} alt="GIGIOR salon" sizes="50vw" />
          <div className="split__copy">
            <p className="eyebrow">Enter</p>
            <h2 className="display">Salon</h2>
            <p>{data?.split?.salon?.line}</p>
            <div className="chips">{(data?.split?.salon?.chips || []).map((c) => <span key={c}>{c}</span>)}</div>
            <span className="btn btn--light">Explore salon</span>
          </div>
        </Link>
        <Link to="/aesthetics">
          <Picture src={data?.split?.aesthetics?.image} alt="GIGIOR aesthetics" sizes="50vw" />
          <div className="split__copy">
            <p className="eyebrow">Enter</p>
            <h2 className="display">Aesthetics</h2>
            <p>{data?.split?.aesthetics?.line}</p>
            <div className="chips">{(data?.split?.aesthetics?.chips || []).map((c) => <span key={c}>{c}</span>)}</div>
            <span className="btn btn--light">Explore aesthetics</span>
          </div>
        </Link>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Signature services</p>
            <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', margin: '0.4rem 0 1.6rem' }}>What we keep in the book</h2>
          </Reveal>
        </div>
        <div className="h-scroll h-scroll--bleed">
          {(data?.signature || []).map((s) => (
            <article className="card" key={s.slug}>
              <Picture src={s.image} alt={s.name} sizes="400px" />
              <h3>{s.name}</h3>
              <p className="muted">{s.benefit}</p>
              <p className="muted">{s.duration_label}{s.booking_mode === 'direct' && s.price_label ? ` · ${s.price_label}` : ''}</p>
              <div className="btn-row" style={{ marginTop: '0.8rem' }}>
                <Btn to={`/${s.pillar}/${s.category}/${s.slug}`}>Learn more</Btn>
                <Btn to={`/book?service=${s.slug}&path=${s.booking_mode === 'consultation' ? 'consult' : 'service'}`} fill>
                  {s.booking_mode === 'consultation' ? 'Consult' : 'Book'}
                </Btn>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Treatment finder</p>
            <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', margin: '0.4rem 0 1.4rem', maxWidth: '16ch' }}>What would you like to improve?</h2>
          </Reveal>
          <div className="finder-grid">
            {CONCERNS.map((name) => {
              const slug = name.toLowerCase().replace(/\s+/g, '-')
              return (
                <button key={name} className={`tile ${concern === slug ? 'is-on' : ''}`} onClick={() => pickConcern(name)}>
                  {name}
                </button>
              )
            })}
          </div>
          {found && (
            <div className="finder-panel">
              <div className="finder-panel__grid">
                {(found.items || []).map((s) => (
                  <article className="finder-hit" key={s.slug}>
                    <Picture src={s.image} alt="" sizes="140px" />
                    <div>
                      <h3 className="display">{s.name}</h3>
                      <p className="muted">{s.benefit}</p>
                      <Btn to={`/${s.pillar}/${s.category}/${s.slug}`}>Why this helps</Btn>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="finder-panel__aside">
                <p className="eyebrow">Not sure?</p>
                <h3 className="display">Book a consultation</h3>
                <p>You do not need the treatment name.</p>
                <Btn to="/book?path=consult" fill light>Reserve a consult</Btn>
              </aside>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow">Results</p>
              <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>Proof, quietly</h2>
            </div>
            <Btn to="/results">View all results</Btn>
          </Reveal>
          <p className="muted" style={{ margin: '0.8rem 0 1.4rem' }}>{brand.disclaimer} Real client, consent on file.</p>
          <div className="ba-grid">
            {(data?.results || []).map((r) => (
              <article className="ba" key={r.id}>
                <div className="ba__pair">
                  <Picture src={r.before_image} alt={`${r.treatment} before`} sizes="200px" />
                  <Picture src={r.after_image} alt={`${r.treatment} after`} sizes="200px" />
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, marginTop: '0.7rem' }}>{r.treatment}</h3>
                <p className="muted">{r.concern} · {r.timeline}<br />{r.guest_label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Experts</p>
            <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', marginBottom: '1.4rem' }}>Who is in the room</h2>
          </Reveal>
        </div>
        <div className="h-scroll h-scroll--bleed">
          {(data?.practitioners || []).map((p) => (
            <article className="people" key={p.slug}>
              <Picture src={p.image} alt={p.name} sizes="340px" />
              <h3>{p.name}</h3>
              <p className="muted">{p.role} · {p.specialisation}<br />{p.years} years · {p.qualifications}</p>
              <Btn to={`/about#${p.slug}`}>View profile</Btn>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Why GIGIOR</p>
          <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', marginBottom: '1.6rem' }}>Four proofs, not eight adjectives</h2>
          <div className="pillar-grid">
            <Reveal><h3 className="display">Expertise</h3><p className="muted">{brand.practitioners_count || '12'} named practitioners. Credentials on About.</p><Btn to="/about">The floor</Btn></Reveal>
            <Reveal><h3 className="display">Technology</h3><p className="muted">Named devices. Certified operators. No anonymous machines.</p><Btn to="/about#technology">Standards</Btn></Reveal>
            <Reveal><h3 className="display">Safety</h3><p className="muted">Single-use consumables. Sterilisation protocol. Prescriber where required.</p><Btn to="/about#safety">Hygiene</Btn></Reveal>
            <Reveal><h3 className="display">Personalisation</h3><p className="muted">Consultation first. If it is not indicated, we will not sell it.</p><Btn to="/book?path=consult">Consult</Btn></Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }} id="technology">
        <div className="wrap two">
          <Reveal>
            <p className="eyebrow">Technology & rooms</p>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Clinical confidence, still a house</h2>
            <p style={{ marginTop: '1rem', maxWidth: '48ch' }}>The aesthetic room is quieter than the salon floor. Devices are named at consultation. Photography here is of our rooms — not a stock clinic corridor.</p>
          </Reveal>
          <figure className="editorial">
            <Picture src="/images/tech-still.png" alt="Named devices in the GIGIOR rooms" sizes="50vw" />
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">In their words</p>
          <div className="card-grid">
            {(data?.testimonials || []).map((t) => (
              <blockquote key={t.id}>
                <p className="display" style={{ fontSize: '1.7rem', lineHeight: 1.25 }}>{t.quote}</p>
                <p className="muted" style={{ marginTop: '0.8rem' }}>{t.name}, {t.city} · {t.treatment}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap two">
          <div>
            <p className="eyebrow">Membership</p>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>A cadence, not a discount</h2>
            <p className="muted" style={{ margin: '1rem 0' }}>Priority in the book. A named practitioner. Reviews on a schedule — never “save 20%”.</p>
            <Btn to="/membership">View all plans</Btn>
          </div>
          <div>
            {(data?.memberships || []).slice(0, 3).map((m) => (
              <article key={m.name} style={{ padding: '1rem 0', borderBottom: '1px solid var(--sand)' }}>
                <h3 className="display" style={{ fontSize: '1.8rem' }}>{m.name}</h3>
                <p className="muted">{m.tagline} · {m.price_label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Locations</p>
          <div className="card-grid">
            {(data?.locations || []).map((l) => (
              <article className="loc-card" key={l.slug}>
                <Picture src={l.image} alt={l.name} sizes="360px" />
                <h3 className="display" style={{ fontSize: '2rem', marginTop: '0.8rem' }}>{l.name}</h3>
                <p className="muted">{l.address}</p>
                <Btn to={`/locations/${l.slug}`} fill>Book at this house</Btn>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <Reveal style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow">Journal</p>
              <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>For the research stage</h2>
            </div>
            <Btn to="/journal">Read the journal</Btn>
          </Reveal>
          <div className="card-grid" style={{ marginTop: '1.4rem' }}>
            {(data?.journal || []).map((a) => (
              <Link className="journal-card" to={`/journal/${a.slug}`} key={a.slug}>
                <Picture src={a.image} alt="" sizes="360px" />
                <p className="eyebrow" style={{ marginTop: '0.8rem' }}>{a.category}</p>
                <h3 className="display" style={{ fontSize: '1.7rem' }}>{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta section">
        <div className="wrap">
          <p className="eyebrow">Next</p>
          <h2 className="display">Your next visit begins with a consultation.</h2>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Btn to="/book" fill light>Reserve</Btn>
            <Btn href={wa} light>Talk to an expert</Btn>
          </div>
        </div>
      </section>
    </>
  )
}
