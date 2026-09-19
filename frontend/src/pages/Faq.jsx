import { usePageTitle } from '../lib/usePageTitle'
import { Btn } from '../components/Ui'
import { Link } from 'react-router-dom'

const GROUPS = [
  {
    id: 'visit',
    title: 'Visiting',
    items: [
      ['Do I need an appointment?', 'Yes. The door is by appointment. Walk-ins are not part of how the house runs — the book stays small so the work can stay exact.'],
      ['Where are you?', 'GIGIOR, 12 House Street, [City]. Entrance notes are on the Visit page. There is limited street parking; a courtyard buzzer on arrival.'],
      ['What are the hours?', 'Tuesday–Friday 10:00–19:00. Saturday 09:00–17:00. Sunday and Monday closed, unless a private bridal arrangement has been made.'],
      ['May I bring someone with me?', 'By arrangement. The floor is kept quiet. Children are welcome only when we have agreed it, so other guests are not surprised.'],
    ],
  },
  {
    id: 'salon',
    title: 'Salon',
    items: [
      ['Can you copy this photograph?', 'We can aim for its spirit. Your canvas — history, porosity, and the light in the room — decides the result. We will say so in the chair before we mix.'],
      ['How are prices set?', 'Salon pages show from-prices. Corrective colour and staged work are quoted after we see the hair. The quote in the room is the one that applies.'],
      ['Do you do bridal?', 'Yes, with a trial. We often refuse a major colour change inside two weeks of the day. Book the trial early — the timeline is on the Journal.'],
      ['Will a junior do my colour?', 'Not without your knowledge. You will see the same faces. That is a rule of the house, not a slogan.'],
    ],
  },
  {
    id: 'aesthetics',
    title: 'Aesthetics',
    items: [
      ['Can I book injectables online today?', 'You can request a consultation. Prescription work is not self-checked-out. Treatment may be another day — especially the first time.'],
      ['Will I look “done”?', 'That is not the aim. If we think the face would look unlike you, we will not treat. Conservative is the standard, not a style option.'],
      ['Is it safe?', 'Suitability, contraindications, named devices, and the practitioner are on each treatment page and again at consent. We do not omit the risk conversation to make a page feel softer.'],
      ['Do you guarantee results?', 'No. Results vary. Gallery images are consented and real; they are not a contract for the same outcome.'],
      ['Who performs the treatment?', 'A named practitioner. Where the medicine is prescription-only, a named prescriber is involved. Credentials sit on About and on the treatment page.'],
      ['What happens at consultation?', 'A conversation, a history, the face in daylight, and a written plan: treat, wait, or do not. Cost is framed there, not as a package on the internet.'],
    ],
  },
  {
    id: 'book',
    title: 'Reservations',
    items: [
      ['Do I need an account?', 'No. Guest reservation is always available. We may offer an account after confirmation, for return visits — never as a gate.'],
      ['How do I cancel?', 'Hair and rituals: 24 hours’ notice, or the visit may be charged. Full policy on Cancellation. Aesthetic deposits follow the consent you sign.'],
      ['I am not sure what I need.', 'Choose “Not sure what I need” on Reserve, or use the treatment finder by concern. You will not be forced to pick a product name.'],
      ['Can I just talk to someone?', 'Yes. WhatsApp and telephone are on every page (and as a bar on a small screen). No form required.'],
    ],
  },
  {
    id: 'membership',
    title: 'Membership',
    items: [
      ['Is this a discount club?', 'No. Membership is cadence and access — priority in the book, a named practitioner, scheduled reviews. We do not badge “save 20%”.'],
      ['How do I begin?', 'Write or reserve a conversation. Tiers are on the Membership page; the fit is decided with you, not by a checkout.'],
    ],
  },
]

export default function Faq() {
  usePageTitle('FAQs')
  return (
    <article className="legal wrap">
      <header className="legal__hero">
        <p className="eyebrow">FAQs</p>
        <h1 className="display">Questions, answered as we would in the room</h1>
        <p className="legal__intro">If your question is medical, the honest answer is still a consultation. These notes are for orientation — not a diagnosis and not a quote.</p>
      </header>
      <div className="legal__grid">
        <nav className="legal__toc" aria-label="FAQ groups">
          <p className="eyebrow">Contents</p>
          <ol>
            {GROUPS.map((g) => (
              <li key={g.id}><a href={`#${g.id}`}>{g.title}</a></li>
            ))}
          </ol>
          <p className="legal__siblings">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cancellation">Cancellation</Link>
          </p>
        </nav>
        <div>
          {GROUPS.map((group) => (
            <section className="faq-group" id={group.id} key={group.id}>
              <h2 className="display">{group.title}</h2>
              <div className="faq">
                {group.items.map(([q, a]) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <p className="muted">{a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <div className="faq-end">
            <p>Still unsure. That is a reason to sit, not to guess.</p>
            <Btn to="/book?path=consult" fill>Request a consultation</Btn>
          </div>
        </div>
      </div>
    </article>
  )
}
