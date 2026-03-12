# 🌿 Paradise Nursery

> **Your green sanctuary, delivered.**  
> A full-featured React + Redux e-commerce application for browsing and purchasing beautiful houseplants.

## 🌱 About the Project

**Paradise Nursery** is a single-page e-commerce application built with React 18 and Redux Toolkit. It allows users to browse a curated catalogue of 18+ indoor houseplants, add them to a shopping cart, adjust quantities, and review their order before checkout.

This project was built as a capstone front-end development exercise, demonstrating:

- Component-based UI architecture with React
- Global state management using Redux Toolkit slices
- Client-side routing with React Router v6
- Responsive CSS design using custom properties (CSS variables)
- Clean separation of concerns across files and components

---

## ✨ Features

### Landing Page
- Full-viewport botanical background image with gradient overlay
- Animated company name and tagline
- `AboutUs` component with company description
- **Get Started** call-to-action button linking to the product catalogue

### Product Listing Page
- **18 unique houseplants** organised into **3 categories**:
  - 🌺 Tropical Beauties (6 plants)
  - 🌵 Succulents & Cacti (6 plants)
  - 💨 Air-Purifying Plants (6 plants)
- Each plant card displays: thumbnail image, name, and price
- **Add to Cart** button that:
  - Adds the plant to the Redux store
  - Disables itself after being clicked (prevents duplicates)
  - Shows `✓ Added` confirmation text
- Sticky navbar with live cart item count badge

### Shopping Cart Page
- Displays all items currently in the cart
- Shows **total number of plants** and **total order cost**
- Per-item row includes: thumbnail, name, unit price, quantity controls, subtotal, and delete button
- **Increase / Decrease** buttons update quantities in real time
- **Delete** button removes an item entirely from the cart
- **Continue Shopping** button navigates back to the product listing
- **Checkout** button displays a "Coming Soon" message

### Shared Navbar
- Sticky header present on both the Product Listing and Cart pages
- Navigation links: Home · Plants · Cart
- Live cart icon badge showing the total number of items dynamically

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 18.2.0 | UI component library |
| [Redux Toolkit](https://redux-toolkit.js.org/) | 2.0.1 | Global state management |
| [React Redux](https://react-redux.js.org/) | 9.0.4 | React bindings for Redux |
| [React Router DOM](https://reactrouter.com/) | 6.21.0 | Client-side routing |
| [Vite](https://vitejs.dev/) | 5.0.8 | Build tool and dev server |

---

## 📁 Project Structure

```
paradise-nursery/
├── public/
├── src/
│   ├── components/
│   │   ├── AboutUs.jsx       # Company description paragraph component
│   │   ├── CartItem.jsx      # Shopping cart page with all cart functionality
│   │   ├── Navbar.jsx        # Shared sticky navigation bar with cart badge
│   │   └── ProductList.jsx   # Product browsing page with plant grid
│   ├── store/
│   │   ├── CartSlice.jsx     # Redux slice: actions, reducers, selectors
│   │   └── store.js          # Redux store configuration
│   ├── App.css               # Global styles + landing page background image
│   ├── App.jsx               # Root component: landing page + route definitions
│   └── main.jsx              # Entry point: Redux Provider + BrowserRouter
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

1. Clone the repository:

```bash
git clone https://github.com/DavidOlwangu/e-plantShopping.git
cd e-plantShopping
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Navigate to the your browser using generated link

---

## 🖥 Pages & Components

### `App.jsx`
The root component. Defines all three client-side routes using React Router v6:
- `/` → Landing Page
- `/plants` → Product Listing Page
- `/cart` → Shopping Cart Page

Also contains the inline `LandingPage` component with the company name, `AboutUs` component, and the **Get Started** button.

### `AboutUs.jsx`
A focused component rendering the company's description paragraph. Kept separate for easy content updates without touching the routing layer.

### `Navbar.jsx`
Shared navigation bar rendered on the Product Listing and Cart pages. Reads `selectTotalItems` from the Redux store to display a live-updating badge on the cart icon.

### `ProductList.jsx`
The main shopping page. Contains all plant data organised by category. Uses `useDispatch` to dispatch `addItem` and `useSelector` with `selectCartItems` to determine whether each plant's Add to Cart button should be disabled.

### `CartItem.jsx`
The shopping cart page. Uses `useSelector` to read cart items, total item count, and total cost. Dispatches `updateQuantity` for +/− controls and `removeItem` for the delete button.

---

## 🗃 Redux State Management

All cart state is managed in a single Redux Toolkit slice.

### `CartSlice.jsx` — Actions

| Action | Payload | Description |
|---|---|---|
| `addItem` | Plant object | Adds a plant; increments quantity if already in cart |
| `removeItem` | Plant `id` (string) | Removes a plant from the cart entirely |
| `updateQuantity` | `{ id, quantity }` | Sets quantity; removes item if quantity ≤ 0 |

### `CartSlice.jsx` — Selectors

| Selector | Returns | Description |
|---|---|---|
| `selectCartItems` | `Item[]` | Full array of cart items |
| `selectTotalItems` | `number` | Sum of all item quantities |
| `selectTotalCost` | `number` | Sum of `price × quantity` for all items |

---

## 🌐 Deployment

This app is deployed via **GitHub Pages**.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the Apache 2.0 License.

---

## 👤 Author
**David Olwangu**
*Software Development Student*


> *"A room without plants is like a sentence without words."*
```