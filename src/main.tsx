import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'

import './styles/tokens.css'
import './styles/base.css'
import './styles/app.css'

/** Beim Artefakt-Build gesetzt – siehe vite.config.ts. */
declare const __HASH_ROUTER__: boolean

// Ohne Server-Regeln für unbekannte Pfade läuft die Website über die Raute
// (#/lernpfad); sonst über normale Adressen (/lernpfad).
const Router = __HASH_ROUTER__ ? HashRouter : BrowserRouter

const root = document.getElementById('root')
if (!root) throw new Error('Root-Element nicht gefunden')

createRoot(root).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)
