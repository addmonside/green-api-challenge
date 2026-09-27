import { Navigate, Outlet } from 'react-router'
import { routes, useCredentials } from '@/shared/model'

export function RouterAuthGuard() {
  const { isEmpty } = useCredentials()

  if (!isEmpty) return <Navigate to={routes.CHAT_LIST} replace />

  return <Outlet />
}

export const Component = RouterAuthGuard
