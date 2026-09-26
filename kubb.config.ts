import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { defineConfig } from 'kubb'

export default defineConfig({
  input: './src/shared/api/green-api.openapi.json',
  output: {
    path: './src/shared/api/generated',
    clean: true,
    extension: { '.js': '.ts' },
  },
  plugins: [
    pluginTs(),
    pluginZod(),
    pluginFetch({ validator: 'zod' }),
    pluginReactQuery({
      client: 'fetch',
      hooks: true,
      // getChatHistory — POST, но это запрос: без override он попал бы в мутации.
      override: [
        {
          type: 'operationId',
          pattern: 'getChatHistory',
          options: {
            mutation: false,
            query: { methods: ['POST'], importPath: '@tanstack/react-query' },
          },
        },
        {
          type: 'operationId',
          pattern: 'getContactInfo',
          options: {
            mutation: false,
            query: { methods: ['POST'], importPath: '@tanstack/react-query' },
          },
        },
      ],
      // Long-poll и подтверждение receiptId вызываются вручную (use-notification-poller).
      exclude: [
        { type: 'operationId', pattern: 'receiveNotification' },
        { type: 'operationId', pattern: 'deleteNotification' },
      ],
    }),
  ],
})
