import { Outlet } from 'react-router'

export function SessionLayout() {
  return (
    <div className="min-h-svh flex flex-col">
      <Outlet />
    </div>
  )
}

export const Component = SessionLayout
