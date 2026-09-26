export const routes = {
  CHAT_LIST: '/chats',
  CHAT: '/chats/:chatId',
  getChat: (chatId: string) => `/chats/${chatId}`,
  AUTH: '/auth',
} as const
