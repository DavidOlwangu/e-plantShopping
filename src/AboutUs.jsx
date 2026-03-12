// ─────────────────────────────────────────────
// AboutUs.jsx
// Renders the company description paragraph shown
// on the landing page.  Separated into its own
// component so it can be reused or updated easily.
// ─────────────────────────────────────────────

function AboutUs() {
  return (
    /* Wrapper paragraph styled via App.css .landing-tagline */
    <p className="landing-tagline">
      Welcome to <strong>Paradise Nursery</strong> — where every home becomes a
      sanctuary. We curate the finest indoor plants, from air-purifying tropicals
      to rare succulents, sourced from sustainable growers around the world.
      Whether you're a seasoned plant parent or just beginning your green
      journey, we have the perfect companion for your space.
    </p>
  )
}

export default AboutUs
