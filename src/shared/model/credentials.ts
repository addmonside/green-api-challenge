import { createContext, use } from 'react'
import { z } from 'zod'
import { appConfig } from './app-config'

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
export const emptyCredentials = {
  credentials: {
    idInstance: '',
    apiTokenInstance: '',
  },
  signIn: () => {},
  signOut: () => {},
}

export const readCredentials = (): Credentials => {
  const stored = localStorage.getItem(appConfig.credentialsStorageKey)
  if (!stored) return emptyCredentials.credentials
  try {
    const parsed = credentialsSchema.safeParse(JSON.parse(stored))
    return parsed.success ? parsed.data : emptyCredentials.credentials
  } catch {
    return emptyCredentials.credentials
  }
}

export const writeCredentials = (credentials: Credentials) => {
  localStorage.setItem(appConfig.credentialsStorageKey, JSON.stringify(credentials))
}

export const clearCredentials = () => {
  localStorage.removeItem(appConfig.credentialsStorageKey)
}

export type CredentialsContextValue = {
  credentials: Credentials
  signIn: (credentials: Credentials) => void
  signOut: () => void
}

export const CredentialsContext = createContext<CredentialsContextValue>(emptyCredentials)

export const useCredentials = () => {
  const value = use(CredentialsContext)
  // isEmpty вычисляется, а не хранится в провайдере, поэтому не может
  // разойтись с credentials. Вне провайдера сработает credentialsNull.
  const isEmpty = value.credentials.idInstance === '' && value.credentials.apiTokenInstance === ''
  return { ...emptyCredentials, ...value, isEmpty }
}
