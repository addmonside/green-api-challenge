import { Outlet } from 'react-router'
import { Layout } from '@/shared/ui/layout'

export function AuthLayout() {
  return (
    <Layout variant="centered">
      <Outlet />
    </Layout>
  )
}

export const Component = AuthLayout
