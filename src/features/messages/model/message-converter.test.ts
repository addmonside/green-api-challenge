import { describe, expect, it } from 'vitest'
import type { ChatHistoryMessage } from '../../../shared/api/generated/types/ChatHistoryMessage'
import type { NotificationBody } from '../../../shared/api/generated/types/NotificationBody'
import {
  type ChatMessage,
  mergeMessages,
  toMessageFromNotification,
  toMessagesFromHistory,
  toOutgoingMessage,
} from './message-converter'

const notification = (body: Partial<NotificationBody>): NotificationBody =>
  ({
    typeWebhook: 'incomingMessageReceived',
    instanceData: { idInstance: '1', wid: '1@c.us', typeInstance: 'whatsapp' },
    timestamp: 1_700_000_000,
    idMessage: 'BAE5367236',
    senderData: { chatId: '11001234567@c.us', sender: '11001234567', senderName: 'Анна' },
    messageData: { typeMessage: 'textMessage', textMessageData: { textMessage: 'Привет' } },
    ...body,
  }) as NotificationBody

const history = (item: Partial<ChatHistoryMessage>): ChatHistoryMessage =>
  ({
    type: 'incoming',
    idMessage: 'BAE1',
    timestamp: 1_700_000_000,
    typeMessage: 'textMessage',
    chatId: '11001234567@c.us',
    textMessage: 'Привет',
    ...item,
  }) as ChatHistoryMessage

const message = (
  id: string,
  timestamp: number,
  overrides: Partial<ChatMessage> = {},
): ChatMessage => ({
  id,
  chatId: '11001234567@c.us',
  text: id,
  direction: 'incoming',
  timestamp,
  ...overrides,
})

describe('toMessageFromNotification', () => {
  it('maps an incoming text message', () => {
    expect(toMessageFromNotification(notification({}))).toEqual({
      id: 'BAE5367236',
      chatId: '11001234567@c.us',
      text: 'Привет',
      direction: 'incoming',
      timestamp: 1_700_000_000,
      authorName: 'Анна',
    })
  })

  it('ignores other webhook types', () => {
    expect(
      toMessageFromNotification(notification({ typeWebhook: 'outgoingMessageStatus' })),
    ).toBeUndefined()
  })

  it('ignores non-text messages', () => {
    expect(
      toMessageFromNotification(notification({ messageData: { typeMessage: 'imageMessage' } })),
    ).toBeUndefined()
  })

  it('ignores notifications without idMessage', () => {
    expect(toMessageFromNotification(notification({ idMessage: undefined }))).toBeUndefined()
  })
})

describe('toMessagesFromHistory', () => {
  it('keeps only text messages and maps direction', () => {
    const items = [
      history({}),
      history({ idMessage: 'BAE2', type: 'outgoing', textMessage: 'Ответ' }),
      history({ idMessage: 'BAE3', typeMessage: 'imageMessage', textMessage: undefined }),
    ]

    expect(toMessagesFromHistory(items)).toEqual([
      {
        id: 'BAE1',
        chatId: '11001234567@c.us',
        text: 'Привет',
        direction: 'incoming',
        timestamp: 1_700_000_000,
      },
      {
        id: 'BAE2',
        chatId: '11001234567@c.us',
        text: 'Ответ',
        direction: 'outgoing',
        timestamp: 1_700_000_000,
      },
    ])
  })
})

describe('toOutgoingMessage', () => {
  it('builds an outgoing message with the id returned by the API', () => {
    expect(toOutgoingMessage('11001234567@c.us', 'BAE9', 'Пока')).toMatchObject({
      id: 'BAE9',
      chatId: '11001234567@c.us',
      text: 'Пока',
      direction: 'outgoing',
    })
  })
})

describe('mergeMessages', () => {
  it('sorts by timestamp', () => {
    const merged = mergeMessages([message('a', 2)], [message('b', 1)])

    expect(merged.map(({ id }) => id)).toEqual(['b', 'a'])
  })

  it('deduplicates by id and keeps the latest version', () => {
    const merged = mergeMessages(
      [message('a', 1, { text: 'старое' })],
      [message('a', 1, { text: 'новое' })],
    )

    expect(merged).toEqual([message('a', 1, { text: 'новое' })])
  })

  it('keeps the current list untouched when nothing is appended', () => {
    const current = [message('a', 1)]

    expect(mergeMessages(current, [])).toBe(current)
  })
})
