import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { Btn } from '../components/Ui'
import { usePageTitle } from '../lib/usePageTitle'

export default function Contact() {
  usePageTitle('Visit')
  const [note, setNote] = useState('')

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
    <div className="wrap page-hero two">
      <div>
        <p className="eyebrow">Visit</p>
        <h1 className="display">The door is by appointment</h1>
        <p>If you are in the book, come as you are. If you are not, write first — or reserve a time.</p>
        <p style={{ marginTop: '1.4rem' }}>
          <strong className="wordmark" style={{ letterSpacing: '0.2em' }}>GIGIOR</strong><br />
          12 House Street, [City]<br />
          +00 000 000 0000<br />
          house@gigior.local
        </p>
        <p className="muted" style={{ whiteSpace: 'pre-line', marginTop: '1rem' }}>
          {`Tuesday–Friday 10:00–19:00
Saturday 09:00–17:00
Sunday–Monday closed`}
        </p>
        <div className="btn-row" style={{ marginTop: '1.4rem' }}>
          <Btn to="/book" fill>Reserve</Btn>
          <Btn to="/faq">FAQs</Btn>
          <Btn href="https://wa.me/00000000000">WhatsApp</Btn>
        </div>
        <p className="muted" style={{ marginTop: '1.6rem' }}>
          Press: press@gigior.local · Privacy: privacy@gigior.local
        </p>
        <p className="legal__siblings" style={{ marginTop: '1rem' }}>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/cancellation">Cancellation</Link>
        </p>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <p className="eyebrow">Write</p>
        <label>Name <input name="name" required autoComplete="name" /></label>
        <label>Email <input type="email" name="email" required autoComplete="email" /></label>
        <label>Telephone <input name="phone" autoComplete="tel" /></label>
        <label>
          Reason
          <select name="reason">
            <option>Hair</option>
            <option>Skin</option>
            <option>Aesthetics</option>
            <option>Bridal</option>
            <option>Press</option>
            <option>Other</option>
          </select>
        </label>
        <label>Message <textarea name="message" required /></label>
        <Btn type="submit" fill>Send</Btn>
        {note && <p className="notice">{note}</p>}
      </form>
    </div>
  )
}
