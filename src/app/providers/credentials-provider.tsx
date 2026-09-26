import { useCallback, useMemo, useState } from 'react'
import {
  type Credentials,
  CredentialsContext,
  clearCredentials,
  readCredentials,
  writeCredentials,
} from '@/shared/model'

export function CredentialsProvider({ children }: { children: React.ReactNode }) {
  const [credentials, setCredentials] = useState<Credentials | null>(readCredentials)

  const signIn = useCallback((nextCredentials: Credentials) => {
    writeCredentials(nextCredentials)
    setCredentials(nextCredentials)
  }, [])

  const signOut = useCallback(() => {
    clearCredentials()
    setCredentials(null)
  }, [])

  const value = useMemo(() => ({ credentials, signIn, signOut }), [credentials, signIn, signOut])

  return <CredentialsContext value={value}>{children}</CredentialsContext>
}
