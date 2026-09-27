import { Navigate } from 'react-router'
import { routes, useCredentials } from '@/shared/model'

export function RouterGuard() {
  const { isEmpty } = useCredentials()

  return <Navigate to={isEmpty ? routes.AUTH : routes.CHAT_LIST} replace />
}

export const Component = RouterGuard
