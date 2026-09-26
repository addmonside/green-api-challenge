import { Navigate } from 'react-router'
import { routes, useCredentials } from '@/shared/model'

export function RouterGuard() {
  const { credentials } = useCredentials()

  return <Navigate to={credentials ? routes.CHAT_LIST : routes.AUTH} replace />
}

export const Component = RouterGuard
