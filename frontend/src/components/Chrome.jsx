import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Btn } from './Ui'
import { api } from '../lib/api'
import { useLenis } from '../lib/SmoothScroll'

const SERVICES = [
  ['Hair', '/services/hair'],
  ['Skin', '/services/skin'],
  ['Nails', '/services/nails'],
  ['Mani-Pedi', '/services/mani-pedi'],
  ['Makeup', '/services/makeup'],
  ['Aesthetic Treatments', '/services/aesthetics'],
]

export function Header({ nav }) {
  const [slim, setSlim] = useState(false)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState('services')
  const [intro, setIntro] = useState(true)
  const { pathname } = useLocation()
  const brand = nav?.brand || {}
  const lenis = useLenis()
  const overlay = pathname === '/' && !slim && !open
  const onLight = overlay || open

  useEffect(() => {
    let timer
    let alive = true
    const start = () => {
      if (!alive) return
      timer = window.setTimeout(() => setIntro(false), 2200)
    }
    if (document.documentElement.classList.contains('is-ready')) start()
    else window.addEventListener('gigior:ready', start, { once: true })
    return () => {
      alive = false
      window.clearTimeout(timer)
      window.removeEventListener('gigior:ready', start)
    }
  }, [])

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
    <header className={`site-header ${slim ? 'is-slim' : ''} ${open ? 'is-open' : ''} ${overlay ? 'is-overlay' : ''} ${intro && overlay ? 'is-intro' : ''}`}>
      <div className="site-header__bar">
        <Link to="/" className="brand" aria-label="GIGIOR salon and aesthetics, home">
          <img src={onLight ? '/logo-mark-ink.png' : '/logo-mark.png'} alt="" width="594" height="298" />
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <HoverMega label="Services" to="/services" links={SERVICES} />
          <NavLink to="/inside">Inside</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Btn to="/book" fill>Book</Btn>
        </nav>

        <div className="header-cta">
          <Btn to="/book" fill className="header-book-mobile">Book</Btn>
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

            <nav className="nav-mobile__primary" aria-label="Primary">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
            </nav>

            <div className={`nav-mobile__acc ${expanded === 'services' ? 'is-open' : ''}`}>
              <button type="button" className="nav-mobile__acc-btn" aria-expanded={expanded === 'services'} onClick={() => toggleSection('services')}>
                <span>Services</span>
                <em aria-hidden="true" />
              </button>
              <div className="nav-mobile__acc-panel">
                <Link to="/services">Overview</Link>
                {SERVICES.map(([label, to]) => (
                  <Link key={to} to={to}>{label}</Link>
                ))}
              </div>
            </div>

            <nav className="nav-mobile__primary" aria-label="More">
              <Link to="/inside">Inside GIGIOR</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/#faqs">FAQs</Link>
            </nav>
          </div>

          <div className="nav-mobile__bar">
            <Btn to="/book" fill>Book appointment</Btn>
            <a className="nav-mobile__call" href={`tel:${(brand.phone || '+00000000000').replace(/\s+/g, '')}`}>Call</a>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

function HoverMega({ label, to, links }) {
  return (
    <div className="mega mega--text">
      <NavLink to={to}>{label}</NavLink>
      <div className="mega__panel" role="region" aria-label={`${label} menu`}>
        <ul className="mega__links">
          <li><Link to={to}>All services</Link></li>
          {links.map(([name, href]) => (
            <li key={href}>
              <Link to={href}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Footer({ brand = {} }) {
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

  const instagram = brand.instagram || 'https://instagram.com/gigior'
  const whatsapp = brand.whatsapp
    ? `https://wa.me/${String(brand.whatsapp).replace(/\D/g, '')}`
    : 'https://wa.me/000000000000'
  const facebook = brand.facebook || 'https://facebook.com/gigior'
  const youtube = brand.youtube || 'https://youtube.com/@gigior'

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img className="footer-logo" src="/logo-mark.png" alt="GIGIOR Salon & Aesthetics" width="594" height="298" />
            <p className="footer-line">Letters from the house. Rarely, and never loudly.</p>
            <form className="subscribe" onSubmit={onSubmit}>
              <input type="email" name="email" required placeholder="Email address" aria-label="Email address" autoComplete="email" />
              <button type="submit">Subscribe</button>
            </form>
            {note && <p className="footer-note">{note}</p>}
            <nav className="footer-social" aria-label="Social media">
              <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <IconInstagram />
              </a>
              <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <IconWhatsApp />
              </a>
              <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <IconFacebook />
              </a>
              <a href={youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <IconYouTube />
              </a>
            </nav>
          </div>
          <div>
            <p className="eyebrow">Services</p>
            <ul>
              {SERVICES.map(([label, to]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">House</p>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/inside">Inside GIGIOR</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/#faqs">FAQs</Link></li>
              <li><Link to="/book">Book appointment</Link></li>
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

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14.5 8.25H16.2V5.6h-1.7c-2.05 0-3.45 1.25-3.45 3.35v1.55H9.3V13.2h1.75V19h3.1v-5.8h2.15l.45-2.7h-2.6V9.15c0-.55.28-.9.85-.9Z"
      />
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none">
      <rect x="2.8" y="6.2" width="18.4" height="11.6" rx="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path fill="currentColor" d="M10.4 9.4v5.2L15.2 12l-4.8-2.6Z" />
    </svg>
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
