/// <reference types="vite/client" />

declare module '*.svg'
declare module '*.css' {
  const content: Record<string, string>
  export default content
}
