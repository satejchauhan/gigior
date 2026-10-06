import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

export function Ghost({ word, place = '' }) {
  return (
    <div className={`ghost ${place}`.trim()} aria-hidden="true">
      {word}
      <span data-letters={word} />
      <span data-letters={word} />
    </div>
  )
}

export function Tile({ to, image, label, size = 'm' }) {
  return (
    <Link to={to} className={`tile tile--${size}`}>
      <span className="tile__frame photo">
        <img src={image} alt="" />
      </span>
      <span className="tile__label">{label}</span>
      <span className="tile__arrow" aria-hidden="true">→</span>
    </Link>
  )
}

export function Chapter({ id, word, title, kicker, children, media, alt, flip = false }) {
  return (
    <Reveal as="section" className={`chapter ${flip ? 'chapter--flip' : ''}`} id={id}>
      <Ghost word={word} />
      <div className="chapter__media photo">
        <img src={media} alt={alt || ''} />
      </div>
      <div className="chapter__copy">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h2 className="display chapter__title">{title}</h2>
        {children}
      </div>
    </Reveal>
  )
}
