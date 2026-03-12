// ─────────────────────────────────────────────
// CartItem.jsx
// The Shopping Cart page component.
// Displays all items currently in the cart with:
//   • Thumbnail, name, unit price per item
//   • Quantity +/− controls
//   • Per-item subtotal
//   • Delete button to remove an item entirely
//   • Total item count and total cost summary bar
//   • Continue Shopping button → /plants
//   • Checkout button → shows "Coming Soon" alert
// All cart mutations dispatch Redux actions.
// ─────────────────────────────────────────────

import { useDispatch, useSelector } from 'react-redux'    // Redux hooks
import { Link } from 'react-router-dom'                   // Client-side navigation
import {
  removeItem,           // Remove a plant entirely from cart
  updateQuantity,       // Increment or decrement a plant's quantity
  selectCartItems,      // Selector: array of cart items
  selectTotalItems,     // Selector: sum of all quantities
  selectTotalCost,      // Selector: sum of (price × quantity) for all items
} from '../store/CartSlice'
import Navbar from './Navbar'

function CartItem() {
  const dispatch = useDispatch()

  // Read cart state from Redux store
  const cartItems   = useSelector(selectCartItems)   // Array of item objects
  const totalItems  = useSelector(selectTotalItems)  // e.g. 5
  const totalCost   = useSelector(selectTotalCost)   // e.g. 124.95

  // ── Handlers ──────────────────────────────────

  // Increase a plant's quantity by 1
  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }

  // Decrease a plant's quantity by 1.
  // updateQuantity removes the item automatically if quantity reaches 0.
  const handleDecrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
  }

  // Completely remove a plant from the cart
  const handleDelete = (itemId) => {
    dispatch(removeItem(itemId))
  }

  // Checkout handler — placeholder "Coming Soon" message
  const handleCheckout = () => {
    alert('🌿 Coming Soon! Our checkout is currently under development. Thank you for shopping at Paradise Nursery!')
  }

  // ── Empty Cart State ────────────────────────────
  // If there are no items, show a friendly message and a link back to the shop
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="cart-page-header">
          <h1>Your Cart</h1>
          <p className="cart-summary-counts">0 items</p>
        </div>
        <div className="cart-container cart-empty">
          <h2>Your cart is empty 🌱</h2>
          <p>Browse our beautiful plant collection and add something you love.</p>
          <Link to="/plants" className="btn-continue">
            ← Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  // ── Populated Cart ──────────────────────────────
  return (
    <div className="cart-page">
      {/* Shared sticky navbar with live cart badge */}
      <Navbar />

      {/* Page hero header — shows total item count */}
      <div className="cart-page-header">
        <h1>Your Cart</h1>
        <p className="cart-summary-counts">
          {totalItems} {totalItems === 1 ? 'plant' : 'plants'} in your cart
        </p>
      </div>

      <div className="cart-container">

        {/* ── Totals summary bar ── */}
        <div className="cart-totals-bar">
          <div>
            {/* Total number of plants prominently displayed */}
            <div style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginBottom: '0.2rem', fontFamily: 'Lato' }}>
              Total Plants
            </div>
            <div className="total-label">{totalItems} {totalItems === 1 ? 'item' : 'items'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginBottom: '0.2rem', fontFamily: 'Lato' }}>
              Order Total
            </div>
            {/* Total cost of all items combined */}
            <div className="total-amount">${totalCost.toFixed(2)}</div>
          </div>
        </div>

        {/* ── Cart Item Rows ── */}
        {/* Map over each item in the cart and render a row */}
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">

            {/* Plant thumbnail image */}
            <img src={item.image} alt={item.name} />

            {/* Plant name and unit price */}
            <div className="cart-item-info">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-unit-price">
                ${item.price.toFixed(2)} each
              </div>
            </div>

            {/* Quantity controls: decrease / count display / increase */}
            <div className="qty-controls">
              {/*
                Decrease button: reduces quantity by 1.
                If quantity is 1 and − is clicked, updateQuantity(0)
                removes the item from the cart entirely.
              */}
              <button
                className="qty-btn"
                onClick={() => handleDecrease(item)}
                aria-label={`Decrease ${item.name} quantity`}
              >
                −
              </button>

              {/* Current quantity for this plant type */}
              <span className="qty-display">{item.quantity}</span>

              {/* Increase button: adds 1 more of this plant */}
              <button
                className="qty-btn"
                onClick={() => handleIncrease(item)}
                aria-label={`Increase ${item.name} quantity`}
              >
                +
              </button>
            </div>

            {/* Per-item total cost (price × quantity) */}
            <div className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            {/* Delete button — removes this plant from cart entirely */}
            <button
              className="btn-delete"
              onClick={() => handleDelete(item.id)}
              aria-label={`Remove ${item.name} from cart`}
              title="Remove from cart"
            >
              ✕
            </button>
          </div>
        ))}

        {/* ── Action buttons at bottom of cart ── */}
        <div className="cart-actions">
          {/*
            Continue Shopping button:
            Uses React Router <Link> to navigate back to the product listing page.
          */}
          <Link to="/plants" className="btn-continue">
            ← Continue Shopping
          </Link>

          {/*
            Checkout button:
            Triggers handleCheckout which shows a "Coming Soon" alert.
          */}
          <button className="btn-checkout" onClick={handleCheckout}>
            Checkout →
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
