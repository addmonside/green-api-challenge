import { useCallback, useMemo, useState } from 'react'
import {
  type Credentials,
  CredentialsContext,
  clearCredentials,
  emptyCredentials,
  readCredentials,
  writeCredentials,
} from '@/shared/model'

export function CredentialsProvider({ children }: { children: React.ReactNode }) {
  const [credentials, setCredentials] = useState<Credentials>(readCredentials)

  const signIn = useCallback((nextCredentials: Credentials) => {
    writeCredentials(nextCredentials)
    setCredentials(nextCredentials)
  }, [])

  const signOut = useCallback(() => {
    clearCredentials()
    setCredentials(emptyCredentials.credentials)
  }, [])

  const value = useMemo(() => ({ credentials, signIn, signOut }), [credentials, signIn, signOut])

  return <CredentialsContext value={value}>{children}</CredentialsContext>
}
