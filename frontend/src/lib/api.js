const API = '/api'

async function request(path, options) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: 'application/json', ...(options?.body ? { 'Content-Type': 'application/json' } : {}) },
    ...options,
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || json.ok === false) {
    throw new Error(json.error || 'Something did not send.')
  }
  return json.data
}

export const api = {
  nav: () => request('/nav'),
  home: () => request('/home'),
  services: () => request('/services'),
  service: (pillar, slug) => request(`/services/${pillar}/${slug}`),
  practitioners: () => request('/practitioners'),
  practitioner: (slug) => request(`/practitioners/${slug}`),
  results: (params = '') => request(`/results${params}`),
  locations: () => request('/locations'),
  location: (slug) => request(`/locations/${slug}`),
  journal: () => request('/journal'),
  article: (slug) => request(`/journal/${slug}`),
  memberships: () => request('/memberships'),
  finder: (concern) => request(`/finder?concern=${encodeURIComponent(concern)}`),
  book: (body) => request('/bookings', { method: 'POST', body: JSON.stringify(body) }),
  enquire: (body) => request('/enquiries', { method: 'POST', body: JSON.stringify(body) }),
  subscribe: (email) => request('/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),
}

export function imgSrc(url, w) {
  if (!url) return ''
  if (!url.includes('unsplash.com')) return url
  const clean = url.replace(/w=\d+/, `w=${w}`)
  return clean.includes('w=') ? clean : `${url}&w=${w}`
}
