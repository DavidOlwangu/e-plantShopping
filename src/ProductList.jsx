// ─────────────────────────────────────────────
// ProductList.jsx
// The main product browsing page.
// Shows 18 houseplants grouped into 3 categories:
//   • Tropical Beauties
//   • Succulents & Cacti
//   • Air-Purifying Plants
//
// Each plant card has: thumbnail, name, price, and
// an "Add to Cart" button that:
//   1. Dispatches addItem to Redux store
//   2. Disables itself after clicking (item already in cart)
//   3. Updates the cart badge count in the Navbar
// ─────────────────────────────────────────────

import { useDispatch, useSelector } from 'react-redux' // Redux hooks
import { addItem, selectCartItems } from '../store/CartSlice'
import Navbar from './Navbar'

// ── Plant Data ───────────────────────────────────
// Organised into category objects. Each plant has a
// unique id, name, price, and an Unsplash image URL.
const categories = [
  {
    id: 'tropical',
    name: '🌺 Tropical Beauties',
    plants: [
      {
        id: 't1',
        name: 'Monstera Deliciosa',
        price: 34.99,
        category: 'Tropical Beauties',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop',
      },
      {
        id: 't2',
        name: 'Bird of Paradise',
        price: 49.99,
        category: 'Tropical Beauties',
        image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&auto=format&fit=crop',
      },
      {
        id: 't3',
        name: 'Peace Lily',
        price: 22.99,
        category: 'Tropical Beauties',
        image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2bbb?w=400&auto=format&fit=crop',
      },
      {
        id: 't4',
        name: 'Calathea Orbifolia',
        price: 28.99,
        category: 'Tropical Beauties',
        image: 'https://images.unsplash.com/photo-1616680214084-22671f27c4e3?w=400&auto=format&fit=crop',
      },
      {
        id: 't5',
        name: 'Fiddle Leaf Fig',
        price: 39.99,
        category: 'Tropical Beauties',
        image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=400&auto=format&fit=crop',
      },
      {
        id: 't6',
        name: 'Philodendron Brasil',
        price: 19.99,
        category: 'Tropical Beauties',
        image: 'https://images.unsplash.com/photo-1602923668409-f4cdd4849c98?w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'succulent',
    name: '🌵 Succulents & Cacti',
    plants: [
      {
        id: 's1',
        name: 'Echeveria Elegans',
        price: 9.99,
        category: 'Succulents & Cacti',
        image: 'https://images.unsplash.com/photo-1550411294-5c3c5e9abf93?w=400&auto=format&fit=crop',
      },
      {
        id: 's2',
        name: 'Golden Barrel Cactus',
        price: 14.99,
        category: 'Succulents & Cacti',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop',
      },
      {
        id: 's3',
        name: 'Jade Plant',
        price: 12.99,
        category: 'Succulents & Cacti',
        image: 'https://images.unsplash.com/photo-1629111243453-7e7e1f0a08f5?w=400&auto=format&fit=crop',
      },
      {
        id: 's4',
        name: 'Aloe Vera',
        price: 11.99,
        category: 'Succulents & Cacti',
        image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c76ea2?w=400&auto=format&fit=crop',
      },
      {
        id: 's5',
        name: 'Haworthia Fasciata',
        price: 8.99,
        category: 'Succulents & Cacti',
        image: 'https://images.unsplash.com/photo-1540420828642-fca2c5c18abe?w=400&auto=format&fit=crop',
      },
      {
        id: 's6',
        name: 'String of Pearls',
        price: 16.99,
        category: 'Succulents & Cacti',
        image: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'airpure',
    name: '💨 Air-Purifying Plants',
    plants: [
      {
        id: 'a1',
        name: 'Snake Plant',
        price: 17.99,
        category: 'Air-Purifying Plants',
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&auto=format&fit=crop',
      },
      {
        id: 'a2',
        name: 'Pothos Golden',
        price: 12.99,
        category: 'Air-Purifying Plants',
        image: 'https://images.unsplash.com/photo-1601985705806-5b9a291f2e7b?w=400&auto=format&fit=crop',
      },
      {
        id: 'a3',
        name: 'Spider Plant',
        price: 10.99,
        category: 'Air-Purifying Plants',
        image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&auto=format&fit=crop',
      },
      {
        id: 'a4',
        name: 'Boston Fern',
        price: 15.99,
        category: 'Air-Purifying Plants',
        image: 'https://images.unsplash.com/photo-1566975340636-14236ae5b546?w=400&auto=format&fit=crop',
      },
      {
        id: 'a5',
        name: 'Rubber Plant',
        price: 24.99,
        category: 'Air-Purifying Plants',
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&auto=format&fit=crop',
      },
      {
        id: 'a6',
        name: 'ZZ Plant',
        price: 21.99,
        category: 'Air-Purifying Plants',
        image: 'https://images.unsplash.com/photo-1622673038699-f71b09fde7c2?w=400&auto=format&fit=crop',
      },
    ],
  },
]

// ── Component ────────────────────────────────────
function ProductList() {
  // dispatch sends actions to the Redux store
  const dispatch = useDispatch()

  // selectCartItems returns the array of items currently in the cart
  const cartItems = useSelector(selectCartItems)

  // Helper: check if a specific plant id is already in the cart
  // Used to disable the "Add to Cart" button after it's been clicked
  const isInCart = (plantId) => cartItems.some(item => item.id === plantId)

  // Called when user clicks "Add to Cart" on a plant card
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant)) // Dispatch addItem action with plant data as payload
  }

  return (
    <div className="product-page">
      {/* Shared sticky navbar with live cart badge */}
      <Navbar />

      {/* Page hero header */}
      <div className="product-page-header">
        <h1>Our Plants</h1>
        <p>Curated houseplants for every space and skill level</p>
      </div>

      {/* ── Render each category section ── */}
      {categories.map((category) => (
        <section key={category.id} className="category-section">

          {/* Category heading (e.g. "🌺 Tropical Beauties") */}
          <h2 className="category-title">{category.name}</h2>

          {/* Grid of plant cards */}
          <div className="plant-grid">
            {category.plants.map((plant) => (
              <div key={plant.id} className="plant-card">

                {/* Plant thumbnail image */}
                <img src={plant.image} alt={plant.name} />

                {/* Card body with name, price, and button */}
                <div className="plant-card-body">
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-price">${plant.price.toFixed(2)}</p>

                  {/*
                    Add to Cart button:
                    - Disabled if this plant is already in the cart
                    - Clicking dispatches addItem to Redux
                  */}
                  <button
                    className="btn-add-cart"
                    onClick={() => handleAddToCart(plant)}
                    disabled={isInCart(plant.id)}
                    aria-label={`Add ${plant.name} to cart`}
                  >
                    {isInCart(plant.id) ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default ProductList
