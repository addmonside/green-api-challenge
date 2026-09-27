import type { ComponentType } from 'react'
import { CredentialsProvider } from './credentials-provider'
import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

export const withProviders = function withProviders(Component: ComponentType) {
  return function WithProviders() {
    return (
      <ThemeProvider>
        <CredentialsProvider>
          <QueryProvider>
            <Component />
          </QueryProvider>
        </CredentialsProvider>
      </ThemeProvider>
    )
  }
}
