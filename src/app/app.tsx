import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import { Outlet, RouterProvider } from 'react-router'
import { withProviders } from './providers'
import { makeRouter } from './router'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element "#root" not found')
}

const App = withProviders(() => (
  <>
    <div className="bg"></div>
    <Outlet />
  </>
))

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={makeRouter(<App />)} />
  </StrictMode>,
)
