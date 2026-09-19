import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header, Footer, StickyMobile } from './components/Chrome'
import { SmoothScroll } from './lib/SmoothScroll'
import { api } from './lib/api'
import Home from './pages/Home'
const Pillar = lazy(() => import('./pages/Pillar'))
const Category = lazy(() => import('./pages/Pillar').then((m) => ({ default: m.Category })))
const Treatment = lazy(() => import('./pages/Treatment'))
const Finder = lazy(() => import('./pages/Finder'))
const Results = lazy(() => import('./pages/Results'))
const About = lazy(() => import('./pages/About'))
const Membership = lazy(() => import('./pages/Membership'))
const Locations = lazy(() => import('./pages/Locations'))
const Location = lazy(() => import('./pages/Locations').then((m) => ({ default: m.Location })))
const Journal = lazy(() => import('./pages/Journal'))
const Article = lazy(() => import('./pages/Journal').then((m) => ({ default: m.Article })))
const Contact = lazy(() => import('./pages/Contact'))
const Book = lazy(() => import('./pages/Book'))
const Faq = lazy(() => import('./pages/Faq'))
const Privacy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Terms })))
const Cancellation = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Cancellation })))
const NotFound = lazy(() => import('./pages/Legal').then((m) => ({ default: m.NotFound })))

export default function App() {
  const [nav, setNav] = useState(null)
  useEffect(() => {
    api.nav().then(setNav).catch(() => setNav({ brand: {}, locations: [] }))
  }, [])

  return (
    <SmoothScroll>
      <a className="skip" href="#main">Skip to content</a>
      <Header nav={nav} />
      <main id="main">
        <Suspense fallback={<div className="wrap page-hero" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salon" element={<Pillar />} />
            <Route path="/aesthetics" element={<Pillar />} />
            <Route path="/finder" element={<Finder />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:slug" element={<Location />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<Article />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cancellation" element={<Cancellation />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/:pillar/:category/:slug" element={<Treatment />} />
            <Route path="/:pillar/:category" element={<Category />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <StickyMobile
        phone={nav?.brand?.phone ? `tel:${nav.brand.phone.replace(/\s/g, '')}` : undefined}
        whatsapp={nav?.brand?.whatsapp ? `https://wa.me/${nav.brand.whatsapp.replace(/\D/g, '')}` : undefined}
      />
    </SmoothScroll>
  )
}
