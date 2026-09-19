import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Btn, Picture } from '../components/Ui'
import { Reveal } from '../components/Reveal'

export default function About() {
  const [people, setPeople] = useState([])
  useEffect(() => {
    api.practitioners().then(setPeople).catch(() => {})
  }, [])

  return (
    <div>
      <div className="wrap page-hero">
        <p className="eyebrow">About</p>
        <h1 className="display">A house of salon and aesthetic</h1>
        <p style={{ maxWidth: '52ch' }}>GIGIOR exists so hair and skin can be held to the same standard — daylight, a small book, and the honesty to refuse work that is not indicated.</p>
      </div>
      <div className="wrap two section--tight">
        <Reveal>
          <p className="eyebrow">The house</p>
          <h2 className="display" style={{ fontSize: '2.6rem' }}>Why we opened</h2>
          <p style={{ marginTop: '1rem' }}>High-street floors mix too much noise with too little time. Clinics can feel like corridors. GIGIOR is a house: two rooms, named practitioners, and a diary that stays small on purpose.</p>
        </Reveal>
        <figure className="editorial">
          <Picture src="/images/about-arches.png" alt="The GIGIOR house" sizes="50vw" />
        </figure>
      </div>
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <p className="eyebrow">The floor</p>
          <h2 className="display" style={{ fontSize: '2.8rem', marginBottom: '1.4rem' }}>The same faces</h2>
          <div className="card-grid">
            {people.map((p) => (
              <article id={p.slug} key={p.slug}>
                <Picture src={p.image} alt={p.name} sizes="360px" />
                <h3 className="display" style={{ fontSize: '1.8rem' }}>{p.name}</h3>
                <p className="muted">{p.role} · {p.specialisation}<br />{p.years} years · {p.qualifications}<br />{p.register_line}</p>
                <p>{p.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap two" id="technology">
        <div>
          <p className="eyebrow">Care</p>
          <h2 className="display" style={{ fontSize: '2.4rem' }}>How we treat</h2>
          <p>Skin first. Then, if indicated, a plan. We do not freeze faces or copy screenshots. Superlatives — “erases”, “permanent” — are not our language.</p>
        </div>
        <div id="safety">
          <p className="eyebrow">Safety</p>
          <h2 className="display" style={{ fontSize: '2.4rem' }}>Hygiene & technology</h2>
          <p>Single-use consumables. Sterilisation logs. Named devices. Certified operators. A prescriber for prescription-only medicines.</p>
        </div>
      </section>
      <section className="final-cta section">
        <h2 className="display">Sit. We will look before we touch.</h2>
        <Btn to="/book" fill light>Book appointment</Btn>
      </section>
    </div>
  )
}
