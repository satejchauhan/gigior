import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { Btn } from '../components/Ui'

const STEPS = ['Service', 'Location', 'Practitioner', 'Time', 'Details']

export default function Book() {
  const [params] = useSearchParams()
  const initialPath = params.get('path') === 'consult' ? 'consult' : 'service'
  const [step, setStep] = useState(1)
  const [services, setServices] = useState([])
  const [people, setPeople] = useState([])
  const [locations, setLocations] = useState([])
  const [note, setNote] = useState('')
  const [form, setForm] = useState({
    path: initialPath,
    service_slug: params.get('service') || '',
    location_slug: params.get('location') || 'the-house',
    practitioner_slug: '',
    preferred_date: '',
    preferred_time: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    notes: '',
  })

  useEffect(() => {
    api.services().then((d) => setServices(d.all || [])).catch(() => {})
    api.practitioners().then(setPeople).catch(() => {})
    api.locations().then(setLocations).catch(() => {})
  }, [])

  const bookable = useMemo(
    () => (form.path === 'consult' ? services.filter((s) => s.booking_mode !== 'direct') : services.filter((s) => s.booking_mode !== 'consultation')),
    [services, form.path],
  )

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    try {
      const data = await api.book(form)
      setNote(data.message)
      setStep(6)
    } catch (err) {
      setNote(err.message)
    }
  }

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">The book</p>
      <h1 className="display">{form.path === 'consult' ? 'Request a consultation' : 'Book appointment'}</h1>
      <p className="steps">Step {Math.min(step, 5)} of 5</p>
      <div className="btn-row" style={{ marginBottom: '1.4rem' }}>
        <Btn fill={form.path === 'service'} onClick={() => { set('path', 'service'); set('service_slug', '') }}>I know the service</Btn>
        <Btn fill={form.path === 'consult'} onClick={() => { set('path', 'consult'); set('service_slug', '') }}>Not sure what I need</Btn>
        <Btn href="https://wa.me/00000000000">Just want to talk</Btn>
      </div>

      {step < 6 && (
        <form className="form" onSubmit={step === 5 ? submit : (e) => { e.preventDefault(); setStep((s) => s + 1) }}>
          {step === 1 && (
            <>
              <label>
                {form.path === 'consult' ? 'What is on your mind' : 'Service'}
                {form.path === 'consult' ? (
                  <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="A line is enough." />
                ) : (
                  <select required value={form.service_slug} onChange={(e) => set('service_slug', e.target.value)}>
                    <option value="">Choose</option>
                    {bookable.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  </select>
                )}
              </label>
              {form.path === 'consult' && (
                <label>
                  Family
                  <select value={form.service_slug} onChange={(e) => set('service_slug', e.target.value)}>
                    <option value="">I am not sure</option>
                    {services.filter((s) => s.pillar === 'aesthetics').map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  </select>
                </label>
              )}
            </>
          )}
          {step === 2 && (
            <label>
              Location
              <select value={form.location_slug} onChange={(e) => set('location_slug', e.target.value)}>
                {locations.map((l) => <option key={l.slug} value={l.slug}>{l.name} — {l.neighbourhood}</option>)}
              </select>
            </label>
          )}
          {step === 3 && (
            <label>
              Practitioner
              <select value={form.practitioner_slug} onChange={(e) => set('practitioner_slug', e.target.value)}>
                <option value="">No preference</option>
                {people.map((p) => <option key={p.slug} value={p.slug}>{p.name} — {p.role}</option>)}
              </select>
            </label>
          )}
          {step === 4 && (
            <>
              <label>Date <input type="date" required value={form.preferred_date} onChange={(e) => set('preferred_date', e.target.value)} /></label>
              <label>Time <input type="time" required value={form.preferred_time} onChange={(e) => set('preferred_time', e.target.value)} /></label>
              <p className="muted">The diary confirms when GIGIOR writes back — unless a live slot is later connected.</p>
            </>
          )}
          {step === 5 && (
            <>
              <label>First name <input required value={form.first_name} onChange={(e) => set('first_name', e.target.value)} /></label>
              <label>Last name <input value={form.last_name} onChange={(e) => set('last_name', e.target.value)} /></label>
              <label>Email <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} /></label>
              <label>Telephone <input required value={form.phone} onChange={(e) => set('phone', e.target.value)} /></label>
              {form.path !== 'consult' && (
                <label>Notes <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Colour history, occasion, sensitivities — optional." /></label>
              )}
            </>
          )}
          {note && step < 6 && <p className="notice">{note}</p>}
          <div className="btn-row">
            {step > 1 && <Btn type="button" onClick={() => setStep((s) => s - 1)}>Back</Btn>}
            <Btn type="submit" fill>{step === 5 ? 'Confirm' : 'Continue'}</Btn>
          </div>
        </form>
      )}

      {step === 6 && (
        <div className="notice">
          <h2 className="display" style={{ fontSize: '2.2rem' }}>Received.</h2>
          <p>{note}</p>
          <div className="btn-row" style={{ marginTop: '1rem' }}>
            <Btn to="/">Home</Btn>
            <Btn href={`mailto:house@gigior.local?subject=GIGIOR reservation`}>Add a note</Btn>
          </div>
        </div>
      )}
      <p className="muted" style={{ marginTop: '2rem' }}>
        Prefer not to use a form? <a href="https://wa.me/00000000000">WhatsApp</a> or <Link to="/contact">write</Link>. Guest booking — no account required.
      </p>
    </div>
  )
}
