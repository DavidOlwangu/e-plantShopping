// This component defines the navigation bar for the application. It includes links to the home page, product listing, and shopping cart. The cart icon displays a badge with the total number of items currently in the cart, which is retrieved from the Redux store using a selector. The navbar is styled with CSS classes for layout and appearance.
// Navbar.jsx
// Shared navigation bar used on both the Product
// Listing page and the Shopping Cart page.
// Displays the brand, nav links, and a live cart
// icon badge using Redux state.
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'           // Client-side navigation links
import { useSelector } from 'react-redux'          // Read Redux state in a component
import { selectTotalItems } from '../store/CartSlice' // Selector for total item count

function Navbar() {
  // Pull the total number of items from the Redux store.
  // This updates automatically whenever the cart changes.
  const totalItems = useSelector(selectTotalItems)

  return (
    <nav className="navbar">
      {/* ── Brand logo/name links back to home ── */}
      <Link to="/" className="navbar-brand">
        <span className="leaf">🌿</span>
        Paradise Nursery
      </Link>

      {/* ── Navigation links ── */}
      <ul className="navbar-links">
        {/* Home link */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Plants / product listing link */}
        <li>
          <Link to="/plants">Plants</Link>
        </li>

        {/* Shopping cart link with dynamic item-count badge */}
        <li>
          <Link to="/cart" className="cart-icon-btn" aria-label="Shopping cart">
            {/* Shopping cart emoji icon */}
            🛒
            {/* Badge showing total items — hidden when cart is empty */}
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
