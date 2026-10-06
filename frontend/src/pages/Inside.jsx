import { Link } from 'react-router-dom'
import { Picture } from '../components/Ui'
import { Chapter } from '../components/Salon'
import { usePageTitle } from '../lib/usePageTitle'
import { house, inside } from '../data/site'

export default function Inside() {
  usePageTitle('Inside GIGIOR')

  return (
    <article>
      <div className="wrap page-hero">
        <p className="eyebrow">Inside GIGIOR</p>
        <h1 className="display">The rooms, and the work</h1>
        <p>Interiors, treatment spaces, and results with consent on file. {house.disclaimer}</p>
      </div>

      <Chapter
        id="interiors"
        word="Salon"
        kicker="Salon interiors"
        title="The floor, in daylight"
        media={inside.salon}
        alt="GIGIOR salon interior"
      >
        <p>Chairs along the window. Mirrors that show the hair as it is, not as a filter. The floor is kept quiet so a conversation can stay private.</p>
      </Chapter>

      <Chapter
        id="treatment-spaces"
        word="Rooms"
        kicker="Treatment spaces"
        title="A quieter room"
        media={inside.treatment}
        alt="A facial in the treatment room"
        flip
      >
        <p>Skin work happens apart from the salon floor. Single-use protocol, named devices, and enough time to explain what we will and will not do.</p>
      </Chapter>

      <section className="section" id="our-work">
        <div className="wrap">
          <p className="eyebrow">Our work</p>
          <h2 className="display section-title">Faces we have dressed</h2>
          <div className="work-grid" style={{ marginTop: '1.6rem' }}>
            {inside.work.map((item) => (
              <figure key={item.src}>
                <Picture src={item.src} alt={item.caption} sizes="50vw" />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream" id="before-after">
        <div className="wrap">
          <p className="eyebrow">Before / after</p>
          <h2 className="display section-title">The time between</h2>
          <p className="muted section-lead">Real guests, consent on file. A photograph is not a promise of the same result.</p>
          <div className="ba-grid">
            {inside.results.map((r) => (
              <article className="ba" key={r.id}>
                <div className="ba__pair">
                  <figure>
                    <Picture src={r.before_image} alt={`${r.treatment} before`} sizes="280px" />
                    <figcaption>Before</figcaption>
                  </figure>
                  <figure>
                    <Picture src={r.after_image} alt={`${r.treatment} after`} sizes="280px" />
                    <figcaption>After</figcaption>
                  </figure>
                </div>
                <h3>{r.treatment}</h3>
                <p className="muted">{r.timeline} · {r.description}<br />{r.guest_label}</p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: '1.6rem' }}><Link className="text-link" to="/book">Book appointment</Link></p>
        </div>
      </section>
    </article>
  )
}
