import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './router'
import './index.css'

async function enableMocking() {
  if (import.meta.env.PROD)
    return

  const { worker } = await import('@/shared/api/mocks/browser')

  await worker.start()
}

enableMocking().then(() => {
  const root = document.getElementById('root')
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    )
  }
})
