import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import { Outlet, RouterProvider } from 'react-router'
import { makeRouter } from './router'
import { withProviders } from './providers'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element "#root" not found')
}

const App = withProviders(() => <Outlet />)

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={makeRouter(<App />)} />
  </StrictMode>,
)
