// ─────────────────────────────────────────────
// App.jsx
// Root application component.
// Handles client-side routing between:
//   /           → Landing Page (home)
//   /plants     → Product Listing Page
//   /cart       → Shopping Cart Page
//
// The Landing Page is defined inline here and includes:
//   • Background image (via App.css .landing-page)
//   • Company name (Paradise Nursery)
//   • AboutUs paragraph component
//   • "Get Started" button linking to /plants
// ─────────────────────────────────────────────

import { Routes, Route, Link } from 'react-router-dom' // React Router v6 routing
import AboutUs      from './components/AboutUs'          // Company description component
import ProductList  from './components/ProductList'      // Plant catalogue page
import CartItem     from './components/CartItem'         // Shopping cart page

// ── Landing Page ─────────────────────────────────
// Defined here in App.jsx as it's tightly coupled
// to the overall app shell and routing.
function LandingPage() {
  return (
    /*
      .landing-page applies the full-viewport background image
      defined in App.css — a botanical photo with a dark
      gradient overlay for readability.
    */
    <div className="landing-page">
      <div className="landing-content">

        {/* Small badge above the title */}
        <span className="landing-badge">Est. 2024 · Sustainably Sourced</span>

        {/* ── Company Name ── */}
        <h1 className="landing-title">
          Paradise <span>Nursery</span>
        </h1>

        {/* ── About Us paragraph ── */}
        {/*
          AboutUs is its own component so the company description
          can be updated independently without touching App.jsx
        */}
        <AboutUs />

        {/*
          "Get Started" button:
          Uses React Router <Link> to navigate to /plants.
          Styled as .btn-primary — a prominent gold CTA button.
        */}
        <Link to="/plants" className="btn-primary">
          Get Started →
        </Link>
      </div>
    </div>
  )
}

// ── App (Router Shell) ───────────────────────────
// Defines all client-side routes for the application.
function App() {
  return (
    <Routes>
      {/* Route 1: Landing page at root "/" */}
      <Route path="/"        element={<LandingPage />} />

      {/* Route 2: Product listing at "/plants" */}
      <Route path="/plants"  element={<ProductList />} />

      {/* Route 3: Shopping cart at "/cart" */}
      <Route path="/cart"    element={<CartItem />} />

      {/* Fallback: redirect unknown routes to landing page */}
      <Route path="*"        element={<LandingPage />} />
    </Routes>
  )
}

export default App
