import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Outlet />
      <Toaster position="top-center" richColors />
    </div>
  )
}
