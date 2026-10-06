import { fallback } from '../data/catalog'

const API = '/api'

async function request(path, options) {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { Accept: 'application/json', ...(options?.body ? { 'Content-Type': 'application/json' } : {}) },
      ...options,
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || json.ok === false) {
      throw new Error(json.error || 'Something did not send.')
    }
    return json.data
  } catch (err) {
    if (options?.method && options.method !== 'GET') throw err
    const data = fallback(path)
    if (data !== undefined && data !== null) return data
    throw err
  }
}

export const api = {
  nav: () => request('/nav'),
  services: () => request('/services'),
  service: (pillar, slug) => request(`/services/${pillar}/${slug}`),
  practitioners: () => request('/practitioners'),
  locations: () => request('/locations'),
  journal: () => request('/journal'),
  article: (slug) => request(`/journal/${slug}`),
  memberships: () => request('/memberships'),
  book: (body) => request('/bookings', { method: 'POST', body: JSON.stringify(body) }),
  enquire: (body) => request('/enquiries', { method: 'POST', body: JSON.stringify(body) }),
  subscribe: (email) => request('/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),
}
