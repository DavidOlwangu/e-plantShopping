import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'          // Provides Redux store to all components
import { BrowserRouter } from 'react-router-dom' // Enables client-side routing
import store from './store/store'                 // Our Redux store
import App from './App'
import './App.css'

// Mount the React app into the #root div
// Provider wraps everything so any component can access Redux state
// BrowserRouter wraps everything so any component can use navigation hooks
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
