import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Header, Footer, StickyMobile } from './components/Chrome'
import { Loader } from './components/Loader'
import { PhotoMotion } from './components/PhotoMotion'
import { SmoothScroll } from './lib/SmoothScroll'
import { api } from './lib/api'
import Home from './pages/Home'
const Treatment = lazy(() => import('./pages/Treatment'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceCategory = lazy(() => import('./pages/Services').then((m) => ({ default: m.ServiceCategory })))
const Inside = lazy(() => import('./pages/Inside'))
const Membership = lazy(() => import('./pages/Membership'))
const Journal = lazy(() => import('./pages/Journal'))
const Article = lazy(() => import('./pages/Journal').then((m) => ({ default: m.Article })))
const Contact = lazy(() => import('./pages/Contact'))
const Book = lazy(() => import('./pages/Book'))
const Privacy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Terms })))
const Cancellation = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Cancellation })))
const NotFound = lazy(() => import('./pages/Legal').then((m) => ({ default: m.NotFound })))

const LEGACY_CATEGORY = {
  hair: '/services/hair',
  makeup: '/services/makeup',
  nails: '/services/nails',
  bridal: '/services/makeup',
  grooming: '/services/hair',
  skin: '/services/skin',
  injectables: '/services/aesthetics',
  laser: '/services/aesthetics',
  'hair-restoration': '/services/aesthetics',
  body: '/services/aesthetics',
}

function LegacyCategory() {
  const { category } = useParams()
  return <Navigate to={LEGACY_CATEGORY[category] || '/services'} replace />
}

export default function App() {
  const [nav, setNav] = useState(null)
  useEffect(() => {
    api.nav().then(setNav).catch(() => setNav({ brand: {}, locations: [] }))
  }, [])

  return (
    <SmoothScroll>
      <Loader />
      <a className="skip" href="#main">Skip to content</a>
      <Header nav={nav} />
      <PhotoMotion />
      <main id="main">
        <Suspense fallback={<div className="wrap page-hero" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceCategory />} />
            <Route path="/inside" element={<Inside />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cancellation" element={<Cancellation />} />
            <Route path="/salon" element={<Navigate to="/services" replace />} />
            <Route path="/aesthetics" element={<Navigate to="/services/aesthetics" replace />} />
            <Route path="/results" element={<Navigate to="/inside#before-after" replace />} />
            <Route path="/faq" element={<Navigate to="/#faqs" replace />} />
            <Route path="/finder" element={<Navigate to="/services" replace />} />
            <Route path="/locations" element={<Navigate to="/contact#find-us" replace />} />
            <Route path="/locations/:slug" element={<Navigate to="/contact#find-us" replace />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<Article />} />
            <Route path="/:pillar/:category/:slug" element={<Treatment />} />
            <Route path="/:pillar/:category" element={<LegacyCategory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer brand={nav?.brand || {}} />
      <StickyMobile
        phone={nav?.brand?.phone ? `tel:${nav.brand.phone.replace(/\s/g, '')}` : undefined}
        whatsapp={nav?.brand?.whatsapp ? `https://wa.me/${nav.brand.whatsapp.replace(/\D/g, '')}` : undefined}
      />
    </SmoothScroll>
  )
}
