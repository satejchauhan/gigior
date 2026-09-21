import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [expanded, setExpanded] = useState('salon')
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
    document.body.classList.toggle('nav-open', open)
    if (open) {
      lenis?.stop()
      lenis?.scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)
      setSlim(false)
    } else {
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('nav-open')
      lenis?.start()
    }
  }, [open, lenis])

  const toggleSection = (key) => {
    setExpanded((current) => (current === key ? '' : key))
  }

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
          <button
            type="button"
            className={`nav-toggle ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle__box" aria-hidden="true">
              <i className="nav-toggle__line" />
              <i className="nav-toggle__line" />
              <i className="nav-toggle__line" />
            </span>
          </button>
        </div>
      </div>
    </header>
      {open && createPortal(
        <div className="nav-mobile" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="nav-mobile__scroll">
            <p className="nav-mobile__intro">Salon · Aesthetic</p>

            <div className={`nav-mobile__acc ${expanded === 'salon' ? 'is-open' : ''}`}>
              <button type="button" className="nav-mobile__acc-btn" aria-expanded={expanded === 'salon'} onClick={() => toggleSection('salon')}>
                <span>Salon</span>
                <em aria-hidden="true" />
              </button>
              <div className="nav-mobile__acc-panel">
                <Link to="/salon">Overview</Link>
                {SALON.map(([label, to]) => (
                  <Link key={to} to={to}>{label}</Link>
                ))}
              </div>
            </div>

            <div className={`nav-mobile__acc ${expanded === 'aesthetics' ? 'is-open' : ''}`}>
              <button type="button" className="nav-mobile__acc-btn" aria-expanded={expanded === 'aesthetics'} onClick={() => toggleSection('aesthetics')}>
                <span>Aesthetics</span>
                <em aria-hidden="true" />
              </button>
              <div className="nav-mobile__acc-panel">
                <Link to="/aesthetics">Overview</Link>
                {AESTHETICS.map(([label, to]) => (
                  <Link key={to} to={to}>{label}</Link>
                ))}
              </div>
            </div>

            <nav className="nav-mobile__primary" aria-label="More">
              <Link to="/finder">Treatment finder</Link>
              <Link to="/results">Results</Link>
              <Link to="/about">About</Link>
              <Link to="/membership">Membership</Link>
              <Link to="/locations">Locations</Link>
              <Link to="/journal">Journal</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/contact">Visit</Link>
            </nav>
          </div>

          <div className="nav-mobile__bar">
            <Btn to="/book" fill>Reserve</Btn>
            <a className="nav-mobile__call" href={`tel:${(brand.phone || '+00000000000').replace(/\s+/g, '')}`}>Call</a>
          </div>
        </div>,
        document.body,
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

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.96.52 3.8 1.44 5.4L2 22l4.92-1.55a9.9 9.9 0 0 0 5.12 1.4h.01c5.46 0 9.89-4.4 9.89-9.85C21.94 6.4 17.5 2 12.04 2Zm5.5 13.99c-.23.64-1.33 1.17-1.84 1.24-.47.07-1.07.1-1.73-.11-.4-.12-.91-.3-1.56-.58-2.75-1.19-4.54-3.95-4.68-4.13-.13-.18-1.1-1.46-1.1-2.79 0-1.32.69-1.97.94-2.24.24-.27.53-.34.71-.34h.51c.16 0 .38-.06.59.45.23.55.77 1.89.84 2.03.07.13.11.29.02.47-.09.18-.14.29-.27.45-.14.16-.29.35-.41.47-.14.14-.28.29-.12.56.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.61-.13.25.09 1.58.74 1.85.88.27.13.45.2.52.31.07.11.07.64-.16 1.28Z"
      />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none">
      <path
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.2 4.8h2.1l1 3.2-1.4 1.1a11.4 11.4 0 0 0 5 5l1.1-1.4 3.2 1v2.1c0 .7-.5 1.3-1.2 1.4A14.6 14.6 0 0 1 4.6 6c.1-.7.7-1.2 1.4-1.2Z"
      />
    </svg>
  )
}

export function StickyMobile({ phone = 'tel:+00000000000', whatsapp = 'https://wa.me/00000000000' }) {
  const { pathname } = useLocation()
  if (pathname.startsWith('/book')) return null
  return (
    <nav className="sticky-mobile" aria-label="Quick contact">
      <a className="sticky-mobile__call" href={phone} aria-label="Call">
        <IconPhone />
        <span>Call</span>
      </a>
      <a className="sticky-mobile__wa" href={whatsapp} aria-label="WhatsApp">
        <IconWhatsApp />
      </a>
    </nav>
  )
}
