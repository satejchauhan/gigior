import { Link } from 'react-router-dom'
import { Chapter } from '../components/Salon'
import { usePageTitle } from '../lib/usePageTitle'
import { about } from '../data/site'

const blocks = [
  {
    id: 'about',
    word: 'About',
    kicker: 'About GIGIOR',
    title: 'A house, not a corridor',
    copy: 'GIGIOR holds hair and skin to the same standard. Daylight, a small book, and the honesty to refuse work that is not indicated. Guests come by appointment. The same practitioners are in the chair when they return.',
    image: about.lead,
    alt: 'The GIGIOR salon floor',
  },
  {
    id: 'story',
    word: 'Story',
    kicker: 'Brand story',
    title: 'Why the house opened',
    copy: 'High-street floors mix too much noise with too little time. Clinics can feel like corridors. GIGIOR was opened so craft and clinical care could share one door: named people, a diary that stays small, and rooms that feel lived in.',
    image: about.story,
    alt: 'Bridal preparation in the salon',
  },
  {
    id: 'meaning',
    word: 'Name',
    kicker: 'Meaning behind GIGIOR',
    title: 'A name kept whole',
    copy: 'GIGIOR is not an acronym and not a trend word. It is the name of the house — said once, and left to stand. The work underneath it is the meaning: composed, personal, and unwilling to costume a person.',
    image: about.meaning,
    alt: 'A finished face in daylight',
  },
  {
    id: 'approach',
    word: 'Care',
    kicker: 'Our approach',
    title: 'Look before we touch',
    copy: 'Every visit begins with a conversation. Hair history, skin barrier, and the light in the room come before a formula or a device. If we would not choose the treatment for ourselves, we will not sell it.',
    image: about.approach,
    alt: 'A facial serum treatment',
  },
  {
    id: 'vision',
    word: 'Vision',
    kicker: 'Vision',
    title: 'Beauty that still looks like you',
    copy: 'We want guests to leave looking rested and precise — not replaced. The vision is a house people return to for years, with the same faces, and a result their own friends still recognise.',
    image: about.vision,
    alt: 'A facial device treatment',
  },
  {
    id: 'imperfect',
    word: 'True',
    kicker: 'Imperfectly perfect',
    title: 'Character stays',
    copy: 'Freckles, a cowlick, a smile line that is yours — these are not flaws to erase. Imperfectly perfect is the house rule: refine, do not overwrite. Movement stays. Texture stays. The person stays.',
    image: about.imperfect,
    alt: 'Makeup being finished',
  },
  {
    id: 'founder',
    word: 'House',
    kicker: 'Founder story',
    title: 'Opened so the two rooms would agree',
    copy: 'The house was founded on a simple frustration: the salon and the clinic rarely spoke to each other. Colour was rushed. Skin was sold. GIGIOR was built so a hair director and an aesthetic practitioner could share one standard — consultation, consent, and the right to say no.',
    image: about.founder,
    alt: 'A practitioner at work',
  },
]

export default function About() {
  usePageTitle('About')

  return (
    <article>
      <div className="wrap page-hero">
        <p className="eyebrow">About us</p>
        <h1 className="display">The house, in its own words</h1>
        <p>Hair, skin, and the decision to keep both honest.</p>
      </div>
      {blocks.map((b, i) => (
        <Chapter
          key={b.id}
          id={b.id}
          word={b.word}
          kicker={b.kicker}
          title={b.title}
          media={b.image}
          alt={b.alt}
          flip={i % 2 === 1}
        >
          <p>{b.copy}</p>
        </Chapter>
      ))}
      <section className="stage">
        <div className="stage__copy">
          <h2 className="display chapter__title">Sit. We will look before we touch.</h2>
          <Link className="text-link" to="/book">Book appointment</Link>
        </div>
        <div className="stage__media photo">
          <img src={about.story} alt="" />
        </div>
      </section>
    </article>
  )
}
