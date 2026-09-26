import { Outlet } from 'react-router'
import { Layout } from '@/shared/ui/layout'

export function SessionLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export const Component = SessionLayout
