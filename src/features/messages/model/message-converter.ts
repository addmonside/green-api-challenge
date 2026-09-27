import type { ChatHistoryMessage } from '@/shared/api/generated/types/ChatHistoryMessage'
import type { NotificationBody } from '@/shared/api/generated/types/NotificationBody'

export type MessageDirection = 'incoming' | 'outgoing'

export type ChatMessage = {
  id: string
  chatId: string
  text: string
  direction: MessageDirection
  timestamp: number
  authorName?: string
}

const textMessageWebhook = 'incomingMessageReceived'
const textMessageType = 'textMessage'
// Текст со ссылкой GREEN-API присылает отдельным типом messageData.
const extendedTextMessageType = 'extendedTextMessage'

// Текст лежит в разных полях в зависимости от typeMessage, поэтому тип проверяем явно:
// иначе не-text сообщения проходили бы валидацию схемы и молча терялись бы в чате.
const getNotificationText = (body: NotificationBody) => {
  const { typeMessage, textMessageData, extendedTextMessageData } = body.messageData ?? {}
  if (typeMessage === textMessageType) return textMessageData?.textMessage
  if (typeMessage === extendedTextMessageType) return extendedTextMessageData?.textMessage
  return undefined
}

export const toMessageFromNotification = (body: NotificationBody): ChatMessage | undefined => {
  if (body.typeWebhook !== textMessageWebhook) return undefined
  const chatId = body.senderData?.chatId
  const text = getNotificationText(body)
  if (!chatId || !text || !body.idMessage) return undefined
  return {
    id: body.idMessage,
    chatId,
    text,
    direction: 'incoming',
    timestamp: body.timestamp ?? 0,
    ...(body.senderData?.senderName ? { authorName: body.senderData.senderName } : {}),
  }
}

export const toMessageFromHistory = (item: ChatHistoryMessage): ChatMessage | undefined => {
  if (item.typeMessage !== textMessageType || !item.textMessage) return undefined
  return {
    id: item.idMessage,
    chatId: item.chatId,
    text: item.textMessage,
    direction: item.type === 'incoming' ? 'incoming' : 'outgoing',
    timestamp: item.timestamp,
    ...(item.senderName ? { authorName: item.senderName } : {}),
  }
}

export const toMessagesFromHistory = (items: ChatHistoryMessage[]) =>
  items.flatMap((item) => {
    const message = toMessageFromHistory(item)
    return message ? [message] : []
  })

export const toOutgoingMessage = (
  chatId: string,
  idMessage: string,
  text: string,
): ChatMessage => ({
  id: idMessage,
  chatId,
  text,
  direction: 'outgoing',
  timestamp: Math.floor(Date.now() / 1000),
})

export const mergeMessages = (current: ChatMessage[], incoming: ChatMessage[]): ChatMessage[] => {
  if (incoming.length === 0) return current
  const merged = new Map(current.map((message) => [message.id, message]))
  for (const message of incoming) merged.set(message.id, message)
  return Array.from(merged.values()).sort(
    (left, right) => left.timestamp - right.timestamp || left.id.localeCompare(right.id),
  )
}
