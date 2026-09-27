/// <reference types="vite/client" />

declare module '*.svg'
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ENV?: string
  readonly VITE_RECEIVE_TIMEOUT: string
  readonly VITE_DEVTOOLS_ENABLED?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
