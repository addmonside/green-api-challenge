import { createBrowserRouter } from 'react-router'
import { routes } from '@/shared/model'

export const makeRouter = (app: React.ReactNode) =>
  createBrowserRouter([
    {
      path: '/',
      element: app,
      children: [
        {
          index: true,
          lazy: () => import('./router-guard'),
        },
        // авторизация
        {
          lazy: () => import('./router-private-guard'),
          children: [
            {
              lazy: () => import('@/features/session/session-layout'),
              children: [
                {
                  path: routes.CHAT_LIST,
                  lazy: async () => import('@/features/chat/chat-list-page'),
                },
                {
                  path: routes.CHAT,
                  lazy: async () => import('@/features/messages/message-list-page'),
                },
              ],
            },
          ],
        },
        // аутенетификация
        {
          lazy: () => import('./router-auth-guard'),
          children: [
            {
              lazy: async () => import('@/features/utility/centered-layout'),
              children: [
                {
                  path: routes.AUTH,
                  lazy: async () => import('@/features/auth/login-page'),
                },
              ],
            },
          ],
        },
        // общие страницы
        {
          lazy: async () => import('@/features/utility/centered-layout'),
          children: [
            {
              path: routes.getError(':codeId'),
              lazy: async () => import('@/features/utility/error-page'),
            },
            {
              path: '*',
              lazy: async () => import('@/features/utility/error-page'),
            },
          ],
        },
      ],
    },
  ])
