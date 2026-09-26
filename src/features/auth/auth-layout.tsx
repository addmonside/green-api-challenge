import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <Outlet />
    </div>
  )
}

export const Component = AuthLayout
