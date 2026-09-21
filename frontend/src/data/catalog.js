const img = (file) => `/images/${file}.png`

const EXTRA = {
  who: ['You want a considered change, not a costume', 'You prefer daylight and an honest consult', 'You can keep a simple cadence at home'],
  benefits: ['A plan before any product or needle', 'Work composed for your canvas', 'Aftercare you can actually follow', 'The same faces on return visits'],
  process: ['Arrive 10 minutes early', 'Consultation in daylight', 'The work itself', 'Aftercare and a return window'],
  results: 'Changes are usually visible in the days and weeks after — not overnight, and not identical for every guest.',
  facts: ['Downtime varies', 'Sessions as advised', 'Patch tests where relevant'],
  contra: 'Active infection, sunburn, pregnancy for some treatments, and anything listed at consultation. We will not treat against our judgement.',
  faqs: [
    { q: 'Will it hurt?', a: 'Sensation varies. We will tell you what to expect before we begin — never as a surprise.' },
    { q: 'How many sessions?', a: 'Some salon work is once. Skin and aesthetic plans are often a course. You will leave with a number, not a mystery.' },
    { q: 'Can I book treatment today?', a: 'Hair and rituals can often be reserved. Prescription aesthetics begin with a consultation.' },
    { q: 'Do you guarantee results?', a: 'No. We speak in ranges. If a look would not be you, we will say so.' },
    { q: 'Who performs this?', a: 'Named practitioners. Juniors are not rotated onto your work without your knowledge.' },
  ],
}

export const brand = {
  studio_name: 'GIGIOR',
  descriptor: 'SALON · AESTHETIC',
  tagline: 'Hair and skin, held to one standard.',
  support: 'Consultation-led salon and aesthetic work — composed, never hurried.',
  phone: '+00 000 000 0000',
  whatsapp: '+000000000000',
  email: 'house@gigior.local',
  instagram: 'https://instagram.com/gigior',
  rating: '4.9',
  review_count: '320',
  years: '8',
  locations_count: '1',
  practitioners_count: '12',
  disclaimer: 'Results vary by individual. Consent on file for all imagery.',
}

export const services = [
  { pillar: 'salon', category: 'hair', slug: 'signature-cut', name: 'Signature cut & finish', short_line: 'A line that holds beyond the blow-dry.', benefit: 'Cut and finish composed for your bone structure.', overview: 'Consultation, cut, and a considered finish in daylight.', duration_label: 'from 60 min', price_from: 85, price_label: 'From 85', booking_mode: 'direct', image: img('svc-cut'), extra: EXTRA },
  { pillar: 'salon', category: 'hair', slug: 'colour', name: 'GIGIOR colour', short_line: 'Lived-in colour mixed for your light.', benefit: 'Dimension without a harsh line.', overview: 'Gloss, balayage, and corrective colour mixed in daylight — never copied from a screen.', duration_label: 'from 2 hrs', price_from: 160, price_label: 'From 160', booking_mode: 'direct', image: img('svc-colour'), extra: EXTRA },
  { pillar: 'salon', category: 'hair', slug: 'hair-treatments', name: 'Hair treatments', short_line: 'Strength and movement restored to the fibre.', benefit: 'Repair without weighing the hair down.', overview: 'Bond and moisture rituals chosen after a strand assessment.', duration_label: 'from 45 min', price_from: 70, price_label: 'From 70', booking_mode: 'direct', image: img('svc-treatments'), extra: EXTRA },
  { pillar: 'salon', category: 'hair', slug: 'styling', name: 'Styling', short_line: 'A finish for the evening — or the Tuesday.', benefit: 'Blow-dry, set, or dressed hair.', overview: 'Editorial or quiet. Built to last the day you actually have.', duration_label: '45 min', price_from: 55, price_label: 'From 55', booking_mode: 'direct', image: img('svc-styling'), extra: EXTRA },
  { pillar: 'salon', category: 'makeup', slug: 'makeup', name: 'Makeup', short_line: 'Skin-led makeup for daylight and night.', benefit: 'Your features, not a trend overlay.', overview: 'Consultation, skin prep, and a finish that photographs honestly.', duration_label: 'from 60 min', price_from: 90, price_label: 'From 90', booking_mode: 'direct', image: img('svc-makeup'), extra: EXTRA },
  { pillar: 'salon', category: 'nails', slug: 'nails', name: 'Nails', short_line: 'Clean shape, quiet colour.', benefit: 'Hands that look considered, not costumed.', overview: 'Manicure, pedicure, and lasting colour — no novelty walls.', duration_label: 'from 45 min', price_from: 45, price_label: 'From 45', booking_mode: 'direct', image: img('svc-nails'), extra: EXTRA },
  { pillar: 'salon', category: 'bridal', slug: 'bridal', name: 'Bridal & occasion', short_line: 'Trials first. The day, unhurried.', benefit: 'Hair and makeup that hold through the hours.', overview: 'A trial, a plan, and day-of attendance in the house or on location.', duration_label: 'by arrangement', price_from: 220, price_label: 'Trials from 220', booking_mode: 'direct', image: img('svc-bridal'), extra: EXTRA },
  { pillar: 'salon', category: 'grooming', slug: 'grooming', name: 'Grooming', short_line: 'Cut, beard, and skin — one chair.', benefit: 'Precise, quiet grooming.', overview: 'Men’s cut, beard, and a simple skin finish.', duration_label: 'from 45 min', price_from: 50, price_label: 'From 50', booking_mode: 'direct', image: img('svc-grooming'), extra: EXTRA },
  { pillar: 'aesthetics', category: 'skin', slug: 'ritual-facial', name: 'Ritual facial', short_line: 'A diagnostic hour, not a spa menu.', benefit: 'Skin that behaves better after, not just pinker.', overview: 'Analysis, treatment, massage, finish — products chosen in the room.', duration_label: '75 min', price_from: 140, price_label: 'From 140', booking_mode: 'either', image: img('svc-ritual'), extra: EXTRA },
  { pillar: 'aesthetics', category: 'skin', slug: 'acne-plan', name: 'Acne plan', short_line: 'Congestion treated as a course, not a one-off.', benefit: 'Fewer breakouts, calmer barrier.', overview: 'A staged plan: consultation, in-room work, and a home cadence.', duration_label: 'course', price_from: null, price_label: 'Quoted at consultation', booking_mode: 'consultation', image: img('svc-acne'), extra: EXTRA },
  { pillar: 'aesthetics', category: 'skin', slug: 'pigmentation', name: 'Pigmentation', short_line: 'Evenness, without stripping the barrier.', benefit: 'Softer contrast in tone over a measured course.', overview: 'Peels, light, or topical plans — only after a consult.', duration_label: 'course', price_from: null, price_label: 'Quoted at consultation', booking_mode: 'consultation', image: img('svc-pigment'), extra: EXTRA },
  { pillar: 'aesthetics', category: 'skin', slug: 'rejuvenation', name: 'Skin rejuvenation', short_line: 'Texture and dew, built over sessions.', benefit: 'Skin that looks like rest.', overview: 'Needling, boosters, or medical facials as indicated.', duration_label: 'from 60 min', price_from: null, price_label: 'Quoted at consultation', booking_mode: 'consultation', image: img('svc-rejuvenation'), extra: EXTRA },
  { pillar: 'aesthetics', category: 'injectables', slug: 'expression-lines', name: 'Expression lines', short_line: 'Movement softened. Character kept.', benefit: 'A conservative, prescriber-led approach.', overview: 'Consultation required. Prescription anti-wrinkle treatment only where indicated.', duration_label: 'consult + treatment', price_from: null, price_label: 'Quoted at consultation', booking_mode: 'consultation', image: img('svc-expression'), extra: EXTRA },
  { pillar: 'aesthetics', category: 'injectables', slug: 'facial-balancing', name: 'Facial balancing', short_line: 'Proportion, not a trend.', benefit: 'Volume only where it serves the face you have.', overview: 'Hyaluronic acid, or a decision against it — after daylight examination.', duration_label: 'consult', price_from: null, price_label: 'Quoted at consultation', booking_mode: 'consultation', image: img('svc-balancing'), extra: EXTRA },
  { pillar: 'aesthetics', category: 'laser', slug: 'laser', name: 'Laser', short_line: 'Hair and tone, with named devices.', benefit: 'Fewer sessions when the device and the skin match.', overview: 'Laser hair and pigment work by certified operators. Consult first.', duration_label: 'from 20 min', price_from: null, price_label: 'Quoted at consultation', booking_mode: 'consultation', image: img('svc-laser'), extra: EXTRA },
  { pillar: 'aesthetics', category: 'hair-restoration', slug: 'hair-restoration', name: 'Hair restoration', short_line: 'Density as a plan, not a promise.', benefit: 'A medical conversation about what is possible.', overview: 'PRP or medical plans after assessment. Results vary.', duration_label: 'consult', price_from: null, price_label: 'Quoted at consultation', booking_mode: 'consultation', image: img('svc-restoration'), extra: EXTRA },
  { pillar: 'aesthetics', category: 'body', slug: 'body', name: 'Body', short_line: 'Contour and skin quality, conservatively.', benefit: 'Body work only when it is indicated.', overview: 'Consultation-led body treatments. Face remains our centre.', duration_label: 'consult', price_from: null, price_label: 'Quoted at consultation', booking_mode: 'consultation', image: img('svc-body'), extra: EXTRA },
]

export const practitioners = [
  { slug: 'anya-mehta', name: 'Anya Mehta', role: 'Hair director', specialisation: 'Cut, colour, bridal', qualifications: 'Senior colour & form', years: 14, bio: 'Anya holds the hair book. Lived-in colour, geometry, and bridal trials.', image: img('p-anya'), register_line: null },
  { slug: 'rahul-sen', name: 'Rahul Sen', role: 'Colourist', specialisation: 'GIGIOR colour, correction', qualifications: 'Advanced colour', years: 9, bio: 'Rahul mixes in daylight. Corrective work is quoted, never rushed.', image: img('p-rahul'), register_line: null },
  { slug: 'leila-rahman', name: 'Dr Leila Rahman', role: 'Aesthetic practitioner', specialisation: 'Skin quality, injectables', qualifications: 'Medical aesthetics', years: 11, bio: 'Consultation-led facial work. Conservative. Named prescriber where required.', image: img('p-leila'), register_line: 'Prescriber on the register — number confirmed in the rooms.' },
  { slug: 'mira-kapoor', name: 'Mira Kapoor', role: 'Skin therapist', specialisation: 'Rituals, acne, barrier', qualifications: 'Skin analysis', years: 8, bio: 'Mira reads the barrier before any device or peel is discussed.', image: img('p-mira'), register_line: null },
]

export const results = [
  { id: 1, treatment: 'GIGIOR colour', concern: 'Hair', pillar: 'salon', description: 'Warmth kept through the ends. No heavy root.', timeline: 'One session', practitioner: 'Anya Mehta', before_image: img('ba-colour-before'), after_image: img('ba-colour-after'), guest_label: 'A., consented' },
  { id: 2, treatment: 'Signature cut', concern: 'Hair', pillar: 'salon', description: 'A line that moves. Length kept.', timeline: 'One session', practitioner: 'Anya Mehta', before_image: img('ba-cut-before'), after_image: img('ba-cut-after'), guest_label: 'N., consented' },
  { id: 3, treatment: 'Ritual facial', concern: 'Skin', pillar: 'aesthetics', description: 'Barrier calmer. Less redness at week two.', timeline: '3 sessions', practitioner: 'Mira Kapoor', before_image: img('ba-facial-before'), after_image: img('ba-facial-after'), guest_label: 'S., consented' },
  { id: 4, treatment: 'Pigmentation', concern: 'Pigmentation', pillar: 'aesthetics', description: 'Softer contrast across the cheek. Course still running.', timeline: '4 sessions', practitioner: 'Dr Leila Rahman', before_image: img('ba-pigment-before'), after_image: img('ba-pigment-after'), guest_label: 'R., consented' },
  { id: 5, treatment: 'Expression lines', concern: 'Ageing', pillar: 'aesthetics', description: 'Movement kept. Forehead quieter at rest.', timeline: '14 days after', practitioner: 'Dr Leila Rahman', before_image: img('ba-lines-before'), after_image: img('ba-lines-after'), guest_label: 'M., consented' },
  { id: 6, treatment: 'Bridal', concern: 'Bridal Prep', pillar: 'salon', description: 'Hair that held through the day.', timeline: 'Trial + day', practitioner: 'Anya Mehta', before_image: img('ba-bridal-before'), after_image: img('ba-bridal-after'), guest_label: 'K., consented' },
]

export const testimonials = [
  { id: 1, quote: 'The colour still looks like me — just better in daylight.', name: 'Amina', city: 'The city', treatment: 'GIGIOR colour' },
  { id: 2, quote: 'They refused a treatment I had asked for. That is why I stayed.', name: 'Leah', city: 'The city', treatment: 'Consultation' },
  { id: 3, quote: 'A quiet room, a precise cut, no selling from the chair.', name: 'Noor', city: 'The city', treatment: 'Signature cut' },
  { id: 4, quote: 'The consult was longer than the injection. That felt correct.', name: 'Priya', city: 'The city', treatment: 'Expression lines' },
]

export const locations = [
  {
    slug: 'the-house',
    name: 'GIGIOR',
    neighbourhood: 'The house',
    address: '12 House Street, [City]',
    hours: 'Tuesday–Friday 10:00–19:00\nSaturday 09:00–17:00\nSunday–Monday closed',
    phone: '+00 000 000 0000',
    whatsapp: '+000000000000',
    email: 'house@gigior.local',
    image: img('loc-house'),
    parking: 'Entrance by appointment. Limited street parking. A courtyard buzzer on arrival.',
  },
]

export const articles = [
  { slug: 'retinol-vs-peels', title: 'Retinol vs professional peels: what actually works', excerpt: 'A plain comparison for anyone standing between a bottle and a booking.', body: 'Aesthetics is not a race to the strongest acid. Retinol at home and peels in the rooms do different jobs. We start with the barrier. If it is thin, we wait. If pigment sits deep, a peel course may be indicated — after a consult, never from a social caption.', category: 'Skin', image: img('j-retinol'), published_at: '2026-08-31' },
  { slug: 'lived-in-colour', title: 'Lived-in colour: why we will not copy the screenshot', excerpt: 'Your canvas decides the result. A photograph is a starting point.', body: 'We can aim for the spirit of a reference. We cannot promise its hex code. Hair history, porosity, and your light in the room matter more than the save-folder.', category: 'Hair', image: img('j-colour'), published_at: '2026-08-24' },
  { slug: 'consultation-first', title: 'Why aesthetics at GIGIOR begins with a conversation', excerpt: 'Treatment is not self-checked-out.', body: 'Prescription work needs a prescriber and a pause. Some guests are asked to start with a ritual instead. That is the standard, not a delay tactic.', category: 'Aesthetics', image: img('j-consult'), published_at: '2026-08-17' },
  { slug: 'bridal-timeline', title: 'A bridal timeline that does not panic the hair', excerpt: 'Trials, pigment, and the two-week rule.', body: 'Major colour changes close to the day are often refused. We would rather hold the hair than gamble it. Book the trial early.', category: 'Bridal', image: img('j-bridal'), published_at: '2026-08-10' },
]

export const memberships = [
  { name: 'House', tagline: 'Your ongoing skin cadence', price_label: 'By arrangement', perks: ['Priority booking', 'Named practitioner', 'Quarterly skin review', 'Home-care edit twice a year'] },
  { name: 'Bridal journey', tagline: 'From trial to the last guest leaving', price_label: 'Quoted', perks: ['Hair and makeup trials', 'Day-of team', 'Party hair add-on by arrangement'] },
  { name: 'Colour keep', tagline: 'Gloss and trim, kept in rhythm', price_label: 'From 4 visits', perks: ['Scheduled gloss', 'Trim included as advised', 'Same colourist'] },
]

const FINDER = {
  skin: ['ritual-facial', 'acne-plan', 'pigmentation', 'rejuvenation'],
  hair: ['signature-cut', 'colour', 'hair-treatments', 'hair-restoration'],
  face: ['ritual-facial', 'expression-lines', 'facial-balancing', 'makeup'],
  body: ['body', 'laser'],
  ageing: ['expression-lines', 'facial-balancing', 'rejuvenation'],
  acne: ['acne-plan', 'ritual-facial'],
  pigmentation: ['pigmentation', 'laser', 'ritual-facial'],
  'hair-loss': ['hair-restoration', 'hair-treatments'],
  'bridal-prep': ['bridal', 'makeup', 'colour', 'nails'],
}

export function grouped(pillar) {
  const groups = {}
  for (const row of services.filter((s) => s.pillar === pillar)) {
    ;(groups[row.category] ||= []).push(row)
  }
  return groups
}

export function homeData() {
  const signatureSlugs = ['colour', 'signature-cut', 'bridal', 'ritual-facial', 'pigmentation', 'expression-lines', 'laser', 'makeup']
  return {
    brand,
    signature: services.filter((s) => signatureSlugs.includes(s.slug)),
    split: {
      salon: { title: 'Salon', line: 'Hair, styling, and beauty craft', chips: ['Cut', 'Colour', 'Bridal', 'Nails'], image: img('split-salon') },
      aesthetics: { title: 'Aesthetics', line: 'Clinically-led skin and facial work', chips: ['Skin', 'Injectables', 'Laser', 'Body'], image: img('split-aesthetics') },
    },
    results: results.slice(0, 4),
    practitioners,
    testimonials,
    memberships,
    locations,
    journal: articles.slice(0, 4),
  }
}

export function fallback(path) {
  const url = new URL(path, 'http://local')
  const p = url.pathname.replace(/^\/api/, '')

  if (p === '/nav') return { brand, salon: grouped('salon'), aesthetics: grouped('aesthetics'), locations }
  if (p === '/home') return homeData()
  if (p === '/services') return { salon: grouped('salon'), aesthetics: grouped('aesthetics'), all: services }
  if (p === '/practitioners') return practitioners
  if (p === '/results') {
    const pillar = url.searchParams.get('pillar') || ''
    const concern = url.searchParams.get('concern') || ''
    const items = results.filter((r) => (!pillar || r.pillar === pillar) && (!concern || r.concern === concern))
    return { items, concerns: [...new Set(results.map((r) => r.concern))], disclaimer: brand.disclaimer }
  }
  if (p === '/locations') return locations
  if (p === '/journal') return articles
  if (p === '/memberships') return memberships
  if (p === '/finder') {
    const concern = (url.searchParams.get('concern') || '').toLowerCase()
    const slugs = FINDER[concern] || []
    return { concern, items: services.filter((s) => slugs.includes(s.slug)) }
  }

  const service = p.match(/^\/services\/([^/]+)\/([^/]+)$/)
  if (service) {
    const row = services.find((s) => s.pillar === service[1] && s.slug === service[2])
    if (!row) return null
    return {
      service: row,
      related: services.filter((s) => s.pillar === row.pillar && s.slug !== row.slug).slice(0, 3),
      practitioners,
      results: results.filter((r) => r.treatment === row.name || r.pillar === row.pillar).slice(0, 4),
    }
  }

  const person = p.match(/^\/practitioners\/([^/]+)$/)
  if (person) return practitioners.find((x) => x.slug === person[1]) || null

  const loc = p.match(/^\/locations\/([^/]+)$/)
  if (loc) return locations.find((x) => x.slug === loc[1]) || null

  const article = p.match(/^\/journal\/([^/]+)$/)
  if (article) return articles.find((x) => x.slug === article[1]) || null

  return undefined
}
