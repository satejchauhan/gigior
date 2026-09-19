import { useState } from 'react'
import { api } from '../lib/api'
import { Btn, Picture } from '../components/Ui'

const CONCERNS = ['Skin', 'Hair', 'Face', 'Body', 'Ageing', 'Acne', 'Pigmentation', 'Hair Loss', 'Bridal Prep']

export default function Finder() {
  const [concern, setConcern] = useState('')
  const [found, setFound] = useState(null)

  async function pick(name) {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    const next = concern === slug ? '' : slug
    setConcern(next)
    if (!next) return setFound(null)
    try {
      setFound(await api.finder(next))
    } catch {
      setFound({ items: [] })
    }
  }

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Treatment finder</p>
      <h1 className="display">What would you like to improve?</h1>
      <p>You do not need the treatment name. Choose a concern — or book a consultation.</p>
      <div className="finder-grid" style={{ marginTop: '2rem' }}>
        {CONCERNS.map((name) => {
          const slug = name.toLowerCase().replace(/\s+/g, '-')
          return (
            <button key={name} className={`tile ${concern === slug ? 'is-on' : ''}`} onClick={() => pick(name)}>
              {name}
            </button>
          )
        })}
      </div>
      {found && (
        <div className="finder-panel">
          <div className="finder-panel__grid">
            {(found.items || []).length === 0 && (
              <p className="finder-panel__empty">No exact match yet. The closest path is a consultation.</p>
            )}
            {(found.items || []).map((s) => (
              <article className="finder-hit" key={s.slug}>
                <Picture src={s.image} alt={s.name} sizes="140px" />
                <div>
                  <h3 className="display">{s.name}</h3>
                  <p className="muted">{s.benefit}</p>
                  <Btn to={`/${s.pillar}/${s.category}/${s.slug}`}>Learn more</Btn>
                </div>
              </article>
            ))}
          </div>
          <aside className="finder-panel__aside">
            <p className="eyebrow">Not sure?</p>
            <h3 className="display">Skip the names</h3>
            <p>Tell us what is on your mind.</p>
            <Btn to="/book?path=consult" fill light>Book a consultation</Btn>
          </aside>
        </div>
      )}
    </div>
  )
}
