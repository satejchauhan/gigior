import { brand, practitioners, results, services, testimonials } from './catalog'

export const house = {
  ...brand,
  address: '12 House Street, [City]',
  hours: [
    ['Tuesday – Friday', '10:00 – 19:00'],
    ['Saturday', '09:00 – 17:00'],
    ['Sunday – Monday', 'Closed'],
  ],
  mapsQuery: '12 House Street',
}

export const serviceGroups = [
  {
    slug: 'hair',
    name: 'Hair',
    line: 'Cut, colour, and finish composed for the hair you have.',
    image: '/images/svc-cut.png',
    slugs: ['signature-cut', 'colour', 'hair-treatments', 'styling'],
  },
  {
    slug: 'skin',
    name: 'Skin',
    line: 'Rituals, pigment, and barrier work — indicated, never rushed.',
    image: '/images/split-aesthetics.png',
    slugs: ['ritual-facial', 'acne-plan', 'pigmentation', 'rejuvenation'],
  },
  {
    slug: 'nails',
    name: 'Nails',
    line: 'Clean shape and quiet colour. Hands that look considered.',
    image: '/images/svc-nails.png',
    slugs: ['nails'],
  },
  {
    slug: 'mani-pedi',
    name: 'Mani-Pedi',
    line: 'Manicure and pedicure, unhurried, with the same quiet palette.',
    image: '/images/mani-pedi.jpg',
    items: [
      { slug: 'mani', name: 'Signature manicure', benefit: 'Shape, cuticle care, and a colour that stays quiet.', duration_label: 'from 45 min', price_label: 'From 45', booking_mode: 'direct', bookSlug: 'nails', image: '/images/mani-pedi.jpg' },
      { slug: 'pedi', name: 'Ritual pedicure', benefit: 'Feet soaked, shaped, and finished without a novelty wall.', duration_label: 'from 60 min', price_label: 'From 55', booking_mode: 'direct', bookSlug: 'nails', image: '/images/svc-nails.png' },
    ],
  },
  {
    slug: 'makeup',
    name: 'Makeup',
    line: 'Skin-led makeup for daylight, evening, and the wedding day.',
    image: '/images/svc-makeup.png',
    slugs: ['makeup', 'bridal'],
  },
  {
    slug: 'aesthetics',
    name: 'Aesthetic Treatments',
    line: 'Consultation first. Character kept. Nothing sold against our judgement.',
    image: '/images/svc-laser.png',
    slugs: ['expression-lines', 'facial-balancing', 'laser', 'hair-restoration', 'body'],
  },
]

export function servicesFor(slug) {
  const group = serviceGroups.find((g) => g.slug === slug)
  if (!group) return []
  if (group.items) return group.items
  return (group.slugs || [])
    .map((id) => services.find((s) => s.slug === id))
    .filter(Boolean)
}

export const home = {
  hero: '/images/pillar-salon.png',
  aboutImage: '/images/svc-treatments.png',
  whyImage: '/images/svc-colour.png',
  team: [
    { ...practitioners[0], image: '/images/team-hair.jpg' },
    { ...practitioners[1], image: '/images/team-makeup.jpg' },
    { ...practitioners[2], image: '/images/team-spa.jpg' },
    { ...practitioners[3], image: '/images/team-massage.jpg' },
  ],
  testimonials,
  faqs: [
    ['Do I need an appointment?', 'Yes. The door is by appointment so the book stays small and the work stays exact.'],
    ['Can you copy a photograph?', 'We can aim for its spirit. Your hair, your skin, and the light in the room decide the result.'],
    ['Can I book injectables online?', 'You can request a consultation. Prescription work is not self-checked-out.'],
    ['Will I look “done”?', 'That is not the aim. If the face would look unlike you, we will not treat.'],
    ['How do I cancel?', 'Hair and rituals need 24 hours’ notice. Aesthetic deposits follow the consent you sign.'],
    ['I am not sure what I need.', 'Reserve a consultation. You do not need the treatment name.'],
  ],
}

export const about = {
  lead: '/images/loc-house.png',
  story: '/images/svc-bridal.png',
  meaning: '/images/hero-home.png',
  approach: '/images/svc-pigment.png',
  vision: '/images/svc-balancing.png',
  imperfect: '/images/mood-skin.png',
  founder: '/images/svc-expression.png',
}

export const inside = {
  salon: '/images/loc-house.png',
  treatment: '/images/svc-rejuvenation.png',
  work: [
    { src: '/images/pillar-salon.png', caption: 'Finish, in the chair' },
    { src: '/images/svc-colour.png', caption: 'Colour, in the salon' },
    { src: '/images/svc-makeup.png', caption: 'Makeup in the room' },
    { src: '/images/svc-bridal.png', caption: 'Bridal preparation' },
    { src: '/images/split-salon.png', caption: 'Lived-in length' },
  ],
  results,
}

export const contactPortrait = '/images/split-aesthetics.png'

export const usps = [
  ['Consultation first', 'We look before we touch. If a treatment is not indicated, we will say so.'],
  ['The same faces', 'Named practitioners. You will not be handed to a stranger mid-colour.'],
  ['One standard', 'The salon floor and the aesthetic room answer to the same honesty.'],
  ['Daylight, not filters', 'Colour and skin are judged in real light, not on a screen.'],
  ['A small book', 'Fewer guests, more time. The diary stays limited on purpose.'],
  ['Aftercare you can keep', 'You leave with a plan you can follow, not a shelf of products.'],
]
