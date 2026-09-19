import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'

const UPDATED = '19 September 2026'

function LegalFrame({ kicker, title, intro, toc, children }) {
  return (
    <article className="legal wrap">
      <header className="legal__hero">
        <p className="eyebrow">{kicker}</p>
        <h1 className="display">{title}</h1>
        <p className="legal__intro">{intro}</p>
        <p className="muted">Last updated {UPDATED}</p>
      </header>
      <div className="legal__grid">
        <nav className="legal__toc" aria-label="On this page">
          <p className="eyebrow">Contents</p>
          <ol>
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`}>{label}</a></li>
            ))}
          </ol>
          <p className="legal__siblings">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cancellation">Cancellation</Link>
            <Link to="/faq">FAQs</Link>
          </p>
        </nav>
        <div className="prose">{children}</div>
      </div>
    </article>
  )
}

export function Privacy() {
  usePageTitle('Privacy policy')
  return (
    <LegalFrame
      kicker="Legal"
      title="Privacy policy"
      intro="How GIGIOR holds the information you give us — for the book, for care, and for the rare letter you ask to receive."
      toc={[
        ['who', 'Who we are'],
        ['collect', 'What we collect'],
        ['health', 'Health information'],
        ['photos', 'Photographs'],
        ['use', 'How we use it'],
        ['share', 'Who we share it with'],
        ['keep', 'How long we keep it'],
        ['cookies', 'Cookies'],
        ['rights', 'Your rights'],
        ['contact', 'Contact'],
      ]}
    >
      <h2 id="who">Who we are</h2>
      <p>This policy is issued by GIGIOR (“we”, “the house”), a salon and aesthetic practice. For the purpose of data protection law, GIGIOR is the controller of personal data described here. Our correspondence address is 12 House Street, [City], and our privacy email is privacy@gigior.local.</p>
      <p>This is a working policy for the website and the rooms. It is not a substitute for advice from counsel in your jurisdiction. Replace the legal entity, address, and registers before public launch.</p>

      <h2 id="collect">What we collect</h2>
      <p>When you reserve, write, or subscribe, we may collect:</p>
      <ul>
        <li>Identity and contact — name, email, telephone</li>
        <li>Reservation details — service, preferred time, practitioner, notes you choose to leave</li>
        <li>Messages sent through the contact form</li>
        <li>Newsletter email, if you subscribe</li>
        <li>Technical data — IP address, device, pages read — only if quiet analytics are enabled</li>
      </ul>
      <p>We do not require an account to reserve. Guest booking is always available.</p>

      <h2 id="health">Health information</h2>
      <p>For aesthetic consultations and treatments, practitioners take a medical history in the rooms. That information is special-category (health) data. It is not requested in full on the public website. Short screening flags on a consultation request (for example pregnancy) are used only to route the enquiry safely.</p>
      <p>Health records are accessible to the treating practitioner, the prescriber where required, and those who must see them to run the house or meet the law. They are not used for marketing.</p>

      <h2 id="photos">Photographs</h2>
      <p>Clinical or “before and after” images are published only where written consent is on file. Marketing consent is separate from consent to treat, and from consent to keep a record photograph. You may withdraw marketing consent; we will remove the image from the site. Record photographs may still be kept where the law or professional standards require a file.</p>
      <p>A line on the Results page — “Real client, consent on file. Results vary.” — is there so the gallery is never silent on this point.</p>

      <h2 id="use">How we use it</h2>
      <ul>
        <li>To hold and confirm a reservation or consultation</li>
        <li>To provide salon and aesthetic care, and to follow up on aftercare</li>
        <li>To answer notes you send</li>
        <li>To send house letters if you asked for them</li>
        <li>To meet legal, professional, and insurance duties</li>
        <li>To understand, in aggregate, which pages are read — never to retarget you with ads</li>
      </ul>
      <p>Lawful bases typically include contract (a reservation), consent (newsletter, marketing images), legitimate interests (running a quiet, safe house), and legal obligation (health records, tax).</p>

      <h2 id="share">Who we share it with</h2>
      <p>We do not sell your data. We may share it with:</p>
      <ul>
        <li>The practitioner or prescriber responsible for your visit</li>
        <li>Hosting, email, and (if connected) diary software, under contract</li>
        <li>Professional advisers, insurers, or regulators where required</li>
        <li>A successor of the practice, if the house is transferred, on the same terms</li>
      </ul>

      <h2 id="keep">How long we keep it</h2>
      <p>Reservation and enquiry records are kept for as long as needed to run the book and handle disputes, then deleted or archived. Health records are kept for the period required by professional standards in our jurisdiction. Newsletter data is kept until you unsubscribe. Analytics, if used, is kept in aggregated form.</p>

      <h2 id="cookies">Cookies</h2>
      <p>The site needs cookies (or similar) to keep the booking form stable and to remember essential preferences. If we add quiet analytics, a slim bar will ask before any non-essential cookie is set. We do not use advertising pixels or retargeting at launch.</p>

      <h2 id="rights">Your rights</h2>
      <p>Depending on where you live, you may ask to access, correct, delete, or restrict your data, to object to certain processing, and to take your data elsewhere. You may withdraw consent where we relied on it. You may also complain to your data-protection authority. Write to privacy@gigior.local. We will need to confirm who you are before we release a file.</p>

      <h2 id="contact">Contact</h2>
      <p>Privacy: privacy@gigior.local · The house: house@gigior.local · [telephone]</p>
    </LegalFrame>
  )
}

export function Terms() {
  usePageTitle('Terms & conditions')
  return (
    <LegalFrame
      kicker="Legal"
      title="Terms & conditions"
      intro="The conditions of using this website and of visiting GIGIOR. A reservation is an offer until the house writes back."
      toc={[
        ['site', 'The website'],
        ['visits', 'Visits to the house'],
        ['salon', 'Salon services'],
        ['aesthetic', 'Aesthetic services'],
        ['prices', 'Prices'],
        ['results', 'Results'],
        ['ip', 'Content and images'],
        ['liability', 'Liability'],
        ['law', 'Governing law'],
      ]}
    >
      <h2 id="site">The website</h2>
      <p>By using gigior’s public site you agree to these terms. If you do not, please do not use it. We may update these pages; the date above is the version that applies.</p>
      <p>Nothing on the site is medical advice. Aesthetic information is educational. Suitability is decided in consultation, in the rooms, by a named practitioner — and, where the law requires it, a prescriber.</p>

      <h2 id="visits">Visits to the house</h2>
      <p>The door is by appointment. A request sent through Reserve is an offer. It becomes a reservation when GIGIOR confirms it in writing (email or message). Until then, the time is not held as yours.</p>
      <p>Please arrive five to ten minutes early. Arrival more than ten minutes late may mean the service is shortened so the next guest is not delayed. Children and additional guests are by arrangement; the floor is kept quiet.</p>

      <h2 id="salon">Salon services</h2>
      <p>Hair, makeup, nails, bridal, and grooming are provided with reasonable skill and care. A consultation happens in the chair. Colour is mixed for the canvas in front of us; we do not guarantee a match to a photograph.</p>
      <p>Patch tests, where relevant, are your responsibility to attend. If you decline a test that we advise, we may refuse the service.</p>

      <h2 id="aesthetic">Aesthetic services</h2>
      <p>Facial aesthetics, laser, and related work are consultation-led. Prescription-only medicines are not self-booked. You will be asked for a history, you will be examined in daylight, and you will be given a plan that may be: treat, wait, or do not treat.</p>
      <p>Treatment is not performed without written consent after discussion of risks, alternatives, cost, and aftercare. You may withdraw consent before treatment begins. Cooling-off periods apply where the law requires them.</p>
      <p>We do not use language of guaranteed, permanent, or “erased” outcomes. If a request would not look like you, we will refuse it.</p>

      <h2 id="prices">Prices</h2>
      <p>From-prices on salon pages are a guide. The quote in the room prevails, especially for corrective colour or staged work. Aesthetic prices are given at consultation unless a page states otherwise. Membership is framed as access and cadence, not as a discount scheme.</p>

      <h2 id="results">Results</h2>
      <p>Results vary by individual. Gallery images are of real guests with consent on file, under consistent lighting where possible. They are not a promise of the same outcome for you.</p>

      <h2 id="ip">Content and images</h2>
      <p>The wordmark GIGIOR, the site design, and our photographs remain ours. You may not copy them for another business. Guest images are used only under the consents we hold.</p>

      <h2 id="liability">Liability</h2>
      <p>Nothing in these terms limits liability for death or personal injury caused by negligence, or for fraud, or any liability that cannot be limited by law. For salon and website use, we are not liable for indirect or consequential loss, or for a result that differs from a photograph you brought.</p>
      <p>Aesthetic complications are discussed at consent. Follow the aftercare you are given. Contact the house if something is not as expected.</p>

      <h2 id="law">Governing law</h2>
      <p>These terms are governed by the law of [jurisdiction]. Courts of [jurisdiction] have exclusive jurisdiction, except that you may have mandatory consumer rights in your country of residence.</p>
    </LegalFrame>
  )
}

export function Cancellation() {
  usePageTitle('Cancellation')
  return (
    <LegalFrame
      kicker="The book"
      title="Cancellation & lateness"
      intro="How the diary is held. Quiet rooms depend on times that are real."
      toc={[
        ['hair', 'Hair, skin rituals, beauty craft'],
        ['consult', 'Aesthetic consultations'],
        ['treatment', 'Aesthetic treatment'],
        ['late', 'Lateness'],
        ['gifts', 'Gift cards'],
      ]}
    >
      <h2 id="hair">Hair, skin rituals, beauty craft</h2>
      <p>Move or cancel with at least 24 hours’ notice and the time is released without charge. Inside 24 hours, up to the full service may be charged. A no-show is charged in full. We will say this again when we confirm your reservation.</p>

      <h2 id="consult">Aesthetic consultations</h2>
      <p>Consultation fees, if any, and whether they deduct from treatment are stated when you book. Please give 24 hours’ notice to move a consult. Repeated late cancellations may mean we ask for a deposit before holding another time.</p>

      <h2 id="treatment">Aesthetic treatment</h2>
      <p>Deposits and cooling-off follow the law and the consent you sign. If you withdraw consent before treatment, you will not be treated. Deposits may still be handled as the consent form describes.</p>

      <h2 id="late">Lateness</h2>
      <p>The next guest’s time is as protected as yours. More than ten minutes late, the service may be shortened. We will not run into the next chair to “make up” the minutes.</p>

      <h2 id="gifts">Gift cards</h2>
      <p>Unused balances follow the period stated on the card — default [12] months unless the card says otherwise. Gift cards are not redeemed for cash except where the law requires it.</p>
    </LegalFrame>
  )
}

export function NotFound() {
  usePageTitle('Not found')
  return (
    <div className="wrap page-hero">
      <p className="eyebrow">404</p>
      <h1 className="display">This page is not in the house.</h1>
      <p>Return to GIGIOR, or write if you followed a link that should still exist.</p>
      <p className="legal__siblings" style={{ marginTop: '1.5rem' }}>
        <Link to="/">Home</Link>
        <Link to="/salon">Salon</Link>
        <Link to="/aesthetics">Aesthetics</Link>
        <Link to="/contact">Visit</Link>
      </p>
    </div>
  )
}
