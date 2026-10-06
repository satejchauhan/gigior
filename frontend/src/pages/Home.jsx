import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { Chapter, Ghost, Tile } from '../components/Salon'
import { useLenis } from '../lib/SmoothScroll'
import { usePageTitle } from '../lib/usePageTitle'
import { home, house, serviceGroups, usps } from '../data/site'

const TILE = ['xl', 'a', 'b', 'c', 'd', 'e']

export default function Home() {
  usePageTitle('')
  const wa = `https://wa.me/${house.whatsapp.replace(/\D/g, '')}`
  const portrait = useRef(null)
  const brand = useRef(null)
  const scroller = useRef(null)
  const lenis = useLenis()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined
    let frame = 0
    const apply = (y) => {
      const img = portrait.current
      const p = Math.min(Math.max(y, 0) / 1000, 1)
      if (img) {
        img.style.transform = `translate3d(0, ${p * 110}px, 0) scale(${1 + p * 0.06})`
        img.style.opacity = String(1 - p)
        img.style.filter = `blur(${(p * 18).toFixed(2)}px)`
      }
      if (brand.current) brand.current.style.opacity = String(1 - Math.min(y / 280, 1))
      if (scroller.current) scroller.current.style.opacity = String(1 - Math.min(y / 90, 1))
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        apply(window.scrollY)
      })
    }
    apply(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    const unsubscribe = lenis?.on?.('scroll', (event) => apply(event.scroll))
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
      unsubscribe?.()
    }
  }, [lenis])

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__media">
          <img ref={portrait} src="/images/hero-portrait.jpg" alt="A guest of GIGIOR" />
        </div>
        <div className="home-hero__panel">
          <div ref={brand} className="home-hero__brand">
            <img className="home-hero__mark" src="/logo-mark-ink.png" alt="GIGIOR Salon & Aesthetics" />
            <Link className="text-link" to="/book">Book appointment</Link>
          </div>
        </div>
        <a ref={scroller} className="mouse" href="#about" aria-label="Scroll" />
      </section>

      <Reveal as="section" className="story" id="about">
        <Ghost word="About" />
        <div className="story__head">
          <p className="eyebrow">About GIGIOR</p>
          <h2 className="display story__title">A house for hair and skin</h2>
        </div>
        <div className="story__grid">
          <figure className="story__shot story__shot--short photo">
            <img src="/images/svc-cut.png" alt="A cut in the salon" />
          </figure>
          <div className="story__copy">
            <p>GIGIOR is a small appointment house. Cut and colour sit beside consultation-led skin work. The book stays limited so the person in the chair is not rushed.</p>
            <Link className="text-link" to="/about">Read our story</Link>
          </div>
          <figure className="story__shot story__shot--tall photo">
            <img src={home.aboutImage} alt="Hair wash at the salon basin" />
          </figure>
        </div>
      </Reveal>

      <Reveal as="section" className="band" id="services">
        <Ghost word="Services" />
        <div className="band__head">
          <h2 className="display band__title">Services</h2>
          <Link className="text-link" to="/services">All services</Link>
        </div>
        <div className="mosaic">
          {serviceGroups.map((g, i) => (
            <Tile key={g.slug} to={`/services/${g.slug}`} image={g.image} label={g.name} size={TILE[i] || 'm'} />
          ))}
        </div>
      </Reveal>

      <Chapter
        id="why"
        word="Why"
        kicker="Why GIGIOR"
        title="How we work"
        media={home.whyImage}
        alt="Colour being applied in the salon"
        flip
      >
        <div className="why-list">
          {usps.map(([title, line]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{line}</p>
            </article>
          ))}
        </div>
      </Chapter>

      <Reveal as="section" className="band" id="team">
        <Ghost word="Team" />
        <div className="band__head">
          <h2 className="display band__title">Meet the team</h2>
        </div>
        <div className="team-row">
          {home.team.map((p) => (
            <article className="person" key={p.slug} id={p.slug}>
              <span className="photo person__photo">
                <img src={p.image} alt={p.name} />
              </span>
              <h3>{p.name}</h3>
              <p>{p.role}<br />{p.specialisation}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="band" id="testimonials">
        <Ghost word="Notes" />
        <div className="band__head">
          <h2 className="display band__title">Testimonials</h2>
        </div>
        <div className="quotes-line">
          {home.testimonials.map((t) => (
            <blockquote key={t.id}>
              <p>{t.quote}</p>
              <cite>{t.name} · {t.treatment}</cite>
            </blockquote>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="band" id="faqs">
        <Ghost word="FAQs" />
        <div className="band__head">
          <h2 className="display band__title">FAQs</h2>
        </div>
        <div className="quotes-line">
          <div className="faq-plain">
            {home.faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="stage" id="book">
        <div className="stage__media photo">
          <img src="/images/loc-house.png" alt="The GIGIOR salon" />
        </div>
        <div className="stage__copy">
          <p className="eyebrow">Book appointment</p>
          <h2 className="display chapter__title">The door is by appointment.</h2>
          <div className="stage__links">
            <Link className="text-link" to="/book">Book appointment</Link>
            <a className="text-link" href={wa}>WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}
