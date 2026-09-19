import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Btn, Picture } from './Ui'
import { api } from '../lib/api'
import { useLenis } from '../lib/SmoothScroll'

const SALON = [
  ['Hair', '/salon/hair', '/images/mega-hair.png', 'Cut, colour, treatments, styling.'],
  ['Makeup', '/salon/makeup', '/images/mega-makeup.png', 'Skin-led makeup for daylight and night.'],
  ['Nails', '/salon/nails', '/images/mega-nails.png', 'Clean shape, quiet colour.'],
  ['Bridal', '/salon/bridal', '/images/mega-bridal.png', 'Trials first. The day, unhurried.'],
  ['Grooming', '/salon/grooming', '/images/mega-grooming.png', 'Cut, beard, and skin — one chair.'],
]

const AESTHETICS = [
  ['Skin', '/aesthetics/skin', '/images/mega-skin.png', 'Rituals, pigment, and barrier work.'],
  ['Injectables', '/aesthetics/injectables', '/images/mega-injectables.png', 'Movement softened. Character kept.'],
  ['Laser', '/aesthetics/laser', '/images/mega-laser.png', 'Hair and tone, with named devices.'],
  ['Hair restoration', '/aesthetics/hair-restoration', '/images/mega-restoration.png', 'Density as a plan, not a promise.'],
  ['Body', '/aesthetics/body', '/images/mega-body.png', 'Contour and skin quality, conservatively.'],
]

export function Header({ nav }) {
  const [slim, setSlim] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const brand = nav?.brand || {}
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setSlim(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 1100px)').matches) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) lenis?.stop()
    else lenis?.start()
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [open, lenis])

  return (
    <>
    <header className={`site-header ${slim ? 'is-slim' : ''} ${open ? 'is-open' : ''}`}>
      <div className="site-header__bar">
        <Link to="/" className="brand wordmark" aria-label="GIGIOR home">
          <strong>GIGIOR</strong>
          <span>{brand.descriptor || 'SALON · AESTHETIC'}</span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          <HoverMega label="Salon" to="/salon" line="Colour, cut, and craft." links={SALON} />
          <HoverMega label="Aesthetics" to="/aesthetics" line="Skin and the face, consultation first." links={AESTHETICS} />
          <NavLink to="/results">Results</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Visit</NavLink>
          <Btn to="/book" fill>Reserve</Btn>
        </nav>

        <div className="header-cta">
          <Btn to="/book" fill className="header-book-mobile">Reserve</Btn>
          <button className={`nav-toggle ${open ? 'is-open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span />
          </button>
        </div>
      </div>
    </header>
      {open && (
        <div className="nav-mobile" role="dialog" aria-label="Menu" onClick={() => setOpen(false)}>
          <Link to="/salon">Salon</Link>
          {SALON.map(([label, to]) => <Link className="sub" key={to} to={to}>{label}</Link>)}
          <Link to="/aesthetics">Aesthetics</Link>
          {AESTHETICS.map(([label, to]) => <Link className="sub" key={to} to={to}>{label}</Link>)}
          <Link to="/finder">Treatment finder</Link>
          <Link to="/results">Results</Link>
          <Link to="/about">About</Link>
          <Link to="/membership">Membership</Link>
          <Link to="/locations">Locations</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/contact">Visit</Link>
          <Link to="/book">Reserve</Link>
        </div>
      )}
    </>
  )
}

function HoverMega({ label, to, line, links }) {
  const [active, setActive] = useState(0)
  const current = links[active] || links[0]

  return (
    <div className="mega" onMouseLeave={() => setActive(0)}>
      <NavLink to={to}>{label}</NavLink>
      <div className="mega__panel" role="region" aria-label={`${label} menu`}>
        <Link to={current[1]} className="mega__feature">
          <Picture src={current[2]} alt={current[0]} sizes="280px" />
          <div className="mega__feature-copy">
            <p className="eyebrow">{label}</p>
            <h3>{current[0]}</h3>
            <p>{current[3] || line}</p>
          </div>
        </Link>
        <ul className="mega__links">
          {links.map(([name, href], i) => (
            <li key={href}>
              <Link
                to={href}
                className={i === active ? 'is-on' : ''}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                {name}
              </Link>
            </li>
          ))}
          <li><Link to="/finder">Not sure — find a treatment</Link></li>
        </ul>
      </div>
    </div>
  )
}

export function Footer() {
  const [note, setNote] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const email = new FormData(e.target).get('email')
    try {
      const data = await api.subscribe(String(email))
      setNote(data.message)
      e.target.reset()
    } catch (err) {
      setNote(err.message)
    }
  }

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <p className="wordmark footer-mark">GIGIOR</p>
            <p className="eyebrow">Salon · Aesthetic</p>
            <p className="footer-line">Letters from the house. Rarely, and never loudly.</p>
            <form className="subscribe" onSubmit={onSubmit}>
              <input type="email" name="email" required placeholder="Email address" aria-label="Email address" autoComplete="email" />
              <button type="submit">Subscribe</button>
            </form>
            {note && <p className="footer-note">{note}</p>}
          </div>
          <div>
            <p className="eyebrow">Rooms</p>
            <ul>
              <li><Link to="/salon">Salon</Link></li>
              <li><Link to="/aesthetics">Aesthetics</Link></li>
              <li><Link to="/finder">Treatment finder</Link></li>
              <li><Link to="/results">Results</Link></li>
              <li><Link to="/membership">Membership</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">House</p>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/locations">Locations</Link></li>
              <li><Link to="/journal">Journal</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/book">Reserve</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Legal</p>
            <ul>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/terms">Terms &amp; conditions</Link></li>
              <li><Link to="/cancellation">Cancellation</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} GIGIOR. All rights reserved.</span>
          <span>house@gigior.local</span>
        </div>
      </div>
    </footer>
  )
}

export function StickyMobile({ phone = 'tel:+00000000000', whatsapp = 'https://wa.me/00000000000' }) {
  const { pathname } = useLocation()
  if (pathname.startsWith('/book')) return null
  return (
    <div className="sticky-mobile">
      <a href={whatsapp} aria-label="WhatsApp">WhatsApp</a>
      <a href={phone} aria-label="Call">Call</a>
      <Link to="/book">Reserve</Link>
    </div>
  )
}
