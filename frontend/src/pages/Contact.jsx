import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { Btn, Picture } from '../components/Ui'
import { usePageTitle } from '../lib/usePageTitle'
import { contactPortrait, house } from '../data/site'

export default function Contact() {
  usePageTitle('Contact')
  const [note, setNote] = useState('')
  const tel = `tel:${house.phone.replace(/\s/g, '')}`
  const wa = `https://wa.me/${house.whatsapp.replace(/\D/g, '')}`
  const map = `https://maps.google.com/maps?q=${encodeURIComponent(house.mapsQuery)}&output=embed`

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    try {
      const data = await api.enquire(Object.fromEntries(form.entries()))
      setNote(data.message)
      e.target.reset()
    } catch (err) {
      setNote(err.message)
    }
  }

  return (
    <article>
      <section className="stage">
        <div className="stage__media">
          <Picture src={contactPortrait} alt="A facial at GIGIOR" sizes="50vw" />
        </div>
        <div className="stage__copy">
          <p className="eyebrow">Contact us</p>
          <h1 className="display chapter__title">Write, call, or come to the house</h1>
          <p className="stage__line">The door is by appointment. If you are not yet in the book, send a note or reserve a time.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap contact-sheet">
          <div id="phone">
            <p className="eyebrow">Phone / WhatsApp</p>
            <p><a href={tel}>{house.phone}</a></p>
            <p><a href={wa} target="_blank" rel="noreferrer">WhatsApp the house</a></p>
          </div>
          <div id="email">
            <p className="eyebrow">Email</p>
            <p><a href={`mailto:${house.email}`}>{house.email}</a></p>
            <p className="muted">Press: press@gigior.local<br />Privacy: privacy@gigior.local</p>
          </div>
          <div id="address">
            <p className="eyebrow">Address</p>
            <p>{house.address}</p>
            <p className="muted">Entrance by appointment. Limited street parking. A courtyard buzzer on arrival.</p>
          </div>
          <div id="hours">
            <p className="eyebrow">Opening hours</p>
            <ul className="hours">
              {house.hours.map(([day, time]) => (
                <li key={day}><span>{day}</span><span>{time}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--cream" id="map">
        <div className="wrap">
          <p className="eyebrow">Google Maps</p>
          <h2 className="display section-title">Find the door</h2>
          <iframe
            className="map-frame"
            title="GIGIOR on Google Maps"
            src={map}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="section" id="find-us">
        <div className="wrap two">
          <div>
            <p className="eyebrow">Store locator / Find us</p>
            <h2 className="display section-title">One house</h2>
            <p className="section-lead">{house.studio_name}<br />{house.address}</p>
            <p className="muted">There is one GIGIOR. Appointments are held here, unless a bridal day has been arranged on location.</p>
            <Btn to="/book" fill>Book at this house</Btn>
          </div>
          <form className="form" id="form" onSubmit={onSubmit}>
            <p className="eyebrow">Contact form</p>
            <label>Name <input name="name" required autoComplete="name" /></label>
            <label>Email <input type="email" name="email" required autoComplete="email" /></label>
            <label>Telephone <input name="phone" autoComplete="tel" /></label>
            <label>
              Reason
              <select name="reason">
                <option>Hair</option>
                <option>Skin</option>
                <option>Nails</option>
                <option>Mani-Pedi</option>
                <option>Makeup</option>
                <option>Aesthetic treatments</option>
                <option>Press</option>
                <option>Other</option>
              </select>
            </label>
            <label>Message <textarea name="message" required /></label>
            <Btn type="submit" fill>Send</Btn>
            {note && <p className="notice">{note}</p>}
          </form>
        </div>
      </section>

      <section className="section section--cream" id="social">
        <div className="wrap">
          <p className="eyebrow">Social media</p>
          <h2 className="display section-title">Elsewhere, quietly</h2>
          <nav className="legal__siblings" aria-label="Social media">
            <a href={house.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={house.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={house.youtube} target="_blank" rel="noreferrer">YouTube</a>
          </nav>
          <p className="legal__siblings" style={{ marginTop: '1.4rem' }}>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cancellation">Cancellation</Link>
          </p>
        </div>
      </section>
    </article>
  )
}
