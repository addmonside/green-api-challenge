import { createBrowserRouter } from 'react-router'
import { routes } from '@/shared/model'

export const makeRouter = (app: React.ReactNode) =>
  createBrowserRouter([
    {
      path: '/',
      element: app,
      children: [
        {
          lazy: () => import('@/features/session/session-layout'),
          children: [
            {
              path: routes.CHAT,
              lazy: async () => import('@/features/chat/chat-page'),
            },
          ],
        },
        {
          lazy: async () => import('@/features/auth/auth-layout'),
          children: [
            {
              path: routes.AUTH,
              lazy: async () => import('@/features/auth/login-page'),
            },
          ],
        },
      ],
    },
  ])
