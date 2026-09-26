import { createContext, use } from 'react'
import { z } from 'zod'

export const credentialsSchema = z.object({
  idInstance: z
    .string()
    .trim()
    .min(1, 'Укажите idInstance')
    .regex(/^\d+$/, 'idInstance состоит только из цифр')
    .length(12, 'idInstance состоит из 12 цифр'),
  apiTokenInstance: z
    .string()
    .trim()
    .min(1, 'Укажите apiTokenInstance')
    .regex(/^[A-Za-z0-9]+$/, 'apiTokenInstance состоит из букв и цифр')
    .length(50, 'apiTokenInstance состоит из 50 символов'),
})

export type Credentials = z.infer<typeof credentialsSchema>

export const credentialsStorageKey = 'green-api:credentials'

export const readCredentials = (): Credentials | null => {
  const stored = localStorage.getItem(credentialsStorageKey)
  if (!stored) return null
  try {
    const parsed = credentialsSchema.safeParse(JSON.parse(stored))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export const writeCredentials = (credentials: Credentials) => {
  localStorage.setItem(credentialsStorageKey, JSON.stringify(credentials))
}

export const clearCredentials = () => {
  localStorage.removeItem(credentialsStorageKey)
}

export type CredentialsContextValue = {
  credentials: Credentials | null
  signIn: (credentials: Credentials) => void
  signOut: () => void
}

export const CredentialsContext = createContext<CredentialsContextValue | null>(null)

export const useCredentials = () => {
  const value = use(CredentialsContext)
  if (!value) throw new Error('useCredentials must be used within CredentialsProvider')
  return value
}
