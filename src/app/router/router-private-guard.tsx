import { Navigate, Outlet } from 'react-router'
import { routes, useCredentials } from '@/shared/model'

export function RouterPrivateGuard() {
  const { isEmpty } = useCredentials()

  if (isEmpty) return <Navigate to={routes.AUTH} replace />

  return <Outlet />
}

export const Component = RouterPrivateGuard
