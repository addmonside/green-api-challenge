import type { ComponentType } from 'react'
import { CredentialsProvider } from './credentials-provider'
import { QueryProvider } from './query-provider'

export const withProviders = function withProviders(Component: ComponentType) {
  return function WithProviders() {
    return (
      <CredentialsProvider>
        <QueryProvider>
          <Component />
        </QueryProvider>
      </CredentialsProvider>
    )
  }
}
