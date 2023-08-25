import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import {UserProvider} from './context/UserContext'
import { CookieProvider } from './context/CookieContext.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <CookieProvider>
        <Router>
          <App />
        </Router>
      </CookieProvider>
    </UserProvider>
  </React.StrictMode>,
)
