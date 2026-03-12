import { createSlice } from '@reduxjs/toolkit'

// ─────────────────────────────────────────────
// CartSlice.jsx
// Redux Toolkit slice for the shopping cart.
// Manages all cart state: items, quantities, totals.
// ─────────────────────────────────────────────

const cartSlice = createSlice({
  name: 'cart', // Namespace for this slice in the Redux store

  // Initial state: an empty items array
  initialState: {
    items: [], // Each item: { id, name, price, image, category, quantity }
  },

  reducers: {
    // ── addItem ──────────────────────────────
    // Adds a plant to the cart.
    // If the plant already exists (matched by id), increments its quantity.
    // If it's new, pushes it with quantity: 1.
    addItem(state, action) {
      const incoming = action.payload
      const existing = state.items.find(item => item.id === incoming.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...incoming, quantity: 1 })
      }
    },

    // ── removeItem ───────────────────────────
    // Completely removes a plant from the cart by id.
    // Used by the "Delete" button on the cart page.
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    // ── updateQuantity ───────────────────────
    // Sets the quantity of a specific cart item.
    // If the new quantity drops to 0 or below, the item is removed entirely.
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        // Remove item when quantity reaches zero
        state.items = state.items.filter(item => item.id !== id)
      } else {
        const item = state.items.find(item => item.id === id)
        if (item) item.quantity = quantity
      }
    },
  },
})

// Export individual action creators for use in components
export const { addItem, removeItem, updateQuantity } = cartSlice.actions

// ── Selectors ─────────────────────────────────
// Reusable selector: total number of individual plants (sum of all quantities)
export const selectTotalItems = state =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

// Reusable selector: total dollar cost of all items in the cart
export const selectTotalCost = state =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

// Reusable selector: all cart items array
export const selectCartItems = state => state.cart.items

export default cartSlice.reducer
