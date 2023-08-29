import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import {UserProvider} from './context/UserContext'
import { CookiesProvider } from 'react-cookie'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <CookiesProvider>
        <Router>
          <App />
        </Router>
      </CookiesProvider>
    </UserProvider>
  </React.StrictMode>,
)
