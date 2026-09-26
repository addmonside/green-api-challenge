import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import postmanToOpenApi from 'postman-to-openapi'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const apiDir = path.join(rootDir, 'src/shared/api')
const collectionPath = path.join(apiDir, 'green-api.postman.json')
const envExamplePath = path.join(rootDir, '.env.example')
const outputPath = path.join(apiDir, 'green-api.openapi.json')
const placeholderOrigin = 'http://placeholder.invalid'

const operations = [
  {
    operationId: 'sendMessage',
    path: ['Отправка', 'Отправить текст'],
  },
  {
    operationId: 'receiveNotification',
    path: ['Получение', 'Получение уведомлений', 'Получить уведомление'],
  },
  {
    operationId: 'deleteNotification',
    path: ['Получение', 'Получение уведомлений', 'Удалить уведомление'],
  },
  {
    operationId: 'getChatHistory',
    path: ['Журналы', 'Получить историю сообщений чата'],
  },
  {
    operationId: 'getAccountSettings',
    path: ['Аккаунт', 'Получить информацию об аккаунте'],
  },
  {
    operationId: 'getChats',
    path: ['Сервисные методы', 'Получить список чатов'],
  },
  {
    operationId: 'checkAccount',
    path: ['Сервисные методы', 'Проверить наличие Telegram'],
  },
]

const instanceParam = 'idInstance'
const tokenParam = 'apiTokenInstance'
const receiptParam = 'receiptId'
const receiveTimeoutParam = 'receiveTimeout'

const errorResponse = {
  description: 'Ошибка валидации или выполнения запроса',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ApiError' },
    },
  },
}

const schemas = {
  ApiError: {
    type: 'object',
    properties: {
      statusCode: { type: 'number' },
      timestamp: { type: 'string' },
      path: { type: 'string' },
      message: { type: 'string' },
    },
    required: ['message'],
  },
  SendMessageRequest: {
    type: 'object',
    properties: {
      chatId: { type: 'string' },
      message: { type: 'string' },
      typingTime: { type: 'number' },
      typingType: { type: 'string' },
      quotedMessageId: { type: 'string' },
    },
    required: ['chatId', 'message'],
  },
  SendMessageResponse: {
    type: 'object',
    properties: {
      idMessage: { type: 'string' },
    },
    required: ['idMessage'],
  },
  NotificationTextMessageData: {
    type: 'object',
    properties: {
      textMessage: { type: 'string' },
    },
    required: ['textMessage'],
  },
  NotificationMessageData: {
    type: 'object',
    properties: {
      typeMessage: { type: 'string' },
      textMessageData: { $ref: '#/components/schemas/NotificationTextMessageData' },
    },
    required: ['typeMessage'],
  },
  NotificationSenderData: {
    type: 'object',
    properties: {
      chatId: { type: 'string' },
      sender: { type: 'string' },
      senderName: { type: 'string' },
    },
    required: ['chatId'],
  },
  NotificationInstanceData: {
    type: 'object',
    properties: {
      idInstance: { type: 'number' },
      wid: { type: 'string' },
      typeInstance: { type: 'string' },
    },
    required: ['idInstance', 'wid'],
  },
  NotificationBody: {
    type: 'object',
    properties: {
      typeWebhook: { type: 'string' },
      instanceData: { $ref: '#/components/schemas/NotificationInstanceData' },
      timestamp: { type: 'number' },
      idMessage: { type: 'string' },
      senderData: { $ref: '#/components/schemas/NotificationSenderData' },
      messageData: { $ref: '#/components/schemas/NotificationMessageData' },
    },
    required: ['typeWebhook'],
  },
  ReceiveNotificationResponse: {
    type: 'object',
    properties: {
      receiptId: { type: 'number' },
      body: { $ref: '#/components/schemas/NotificationBody' },
    },
    required: ['receiptId', 'body'],
  },
  DeleteNotificationResponse: {
    type: 'object',
    properties: {
      result: { type: 'boolean' },
      reason: { type: 'string' },
    },
    required: ['result'],
  },
  GetChatHistoryRequest: {
    type: 'object',
    properties: {
      chatId: { type: 'string' },
      count: { type: 'number' },
    },
    required: ['chatId', 'count'],
  },
  ChatHistoryMessage: {
    type: 'object',
    properties: {
      type: { type: 'string' },
      idMessage: { type: 'string' },
      timestamp: { type: 'number' },
      typeMessage: { type: 'string' },
      chatId: { type: 'string' },
      textMessage: { type: 'string' },
      statusMessage: { type: 'string' },
      sendByApi: { type: 'boolean' },
      senderId: { type: 'string' },
      senderName: { type: 'string' },
      senderContactName: { type: 'string' },
      deletedMessageId: { type: 'string' },
      editedMessageId: { type: 'string' },
      isEdited: { type: 'boolean' },
      isDeleted: { type: 'boolean' },
    },
    required: ['type', 'idMessage', 'timestamp', 'chatId'],
  },
  GetAccountSettingsResponse: {
    type: 'object',
    properties: {
      avatar: { type: 'string' },
      phone: { type: 'string' },
      stateInstance: { type: 'string' },
      chatId: { type: 'string' },
      historySyncProgress: { type: 'number' },
    },
    required: ['stateInstance'],
  },
  ChatListItem: {
    type: 'object',
    properties: {
      chatId: { type: 'string' },
      phoneNumber: { type: 'number' },
    },
    required: ['chatId', 'phoneNumber'],
  },
  CheckAccountRequest: {
    type: 'object',
    properties: {
      phoneNumber: { type: 'number' },
    },
    required: ['phoneNumber'],
  },
  CheckAccountResponse: {
    type: 'object',
    properties: {
      exist: { type: 'boolean' },
      chatId: { type: 'string' },
    },
    required: ['exist', 'chatId'],
  },
}

const responseSchemas = {
  sendMessage: { 200: 'SendMessageResponse' },
  receiveNotification: { 200: 'ReceiveNotificationResponse' },
  deleteNotification: { 200: 'DeleteNotificationResponse' },
  getChatHistory: {
    200: { type: 'array', items: { $ref: '#/components/schemas/ChatHistoryMessage' } },
  },
  getAccountSettings: { 200: 'GetAccountSettingsResponse' },
  getChats: { 200: { type: 'array', items: { $ref: '#/components/schemas/ChatListItem' } } },
  checkAccount: { 200: 'CheckAccountResponse' },
}

const requestBodySchemas = {
  sendMessage: 'SendMessageRequest',
  getChatHistory: 'GetChatHistoryRequest',
  checkAccount: 'CheckAccountRequest',
}

// Ответы 200 разворачиваются inline (см. applySchemaOverrides), поэтому одноимённые
// компоненты в components.schemas больше не нужны: иначе @kubb/plugin-ts генерирует два
// типа с одним именем (ответ операции и компонент) и падает на KUBB_BARREL_DUPLICATE_EXPORT.
const inlinedResponseSchemas = Object.values(responseSchemas)
  .map((responses) => responses[200])
  .filter((schema) => typeof schema === 'string')

const parameterDescriptions = {
  [instanceParam]: 'Идентификатор инстанса GREEN-API (из личного кабинета)',
  [tokenParam]: 'API-токен инстанса (из личного кабинета)',
  [receiptParam]: 'Идентификатор уведомления (receiptId) из тела уведомления',
  [receiveTimeoutParam]: 'Таймаут ожидания уведомления, от 5 до 60 секунд',
}

const parameterOverrides = {
  [instanceParam]: { in: 'path', schema: { type: 'string' } },
  [tokenParam]: { in: 'path', schema: { type: 'string' } },
  [receiptParam]: { in: 'path', schema: { type: 'string' } },
  [receiveTimeoutParam]: {
    in: 'query',
    schema: { type: 'integer', minimum: 5, maximum: 60 },
  },
}

const readEnvExample = async () => {
  const content = await readFile(envExamplePath, 'utf8')
  const match = content.match(/^\s*VITE_API_URL\s*=\s*(.+)$/m)
  if (!match) throw new Error('VITE_API_URL is not set in .env.example')
  return match[1].trim().replace(/\/+$/, '')
}

const findItem = (items, pathSegments) => {
  for (const item of items) {
    if (item.name !== pathSegments[0]) continue
    const rest = pathSegments.slice(1)
    if (rest.length === 0) return item
    if (item.item) {
      const found = findItem(item.item, rest)
      if (found) return found
    }
  }
  return undefined
}

const stripComments = (raw) => {
  let result = ''
  let inString = false
  let quote = ''
  let inLineComment = false
  let inBlockComment = false
  for (let index = 0; index < raw.length; index += 1) {
    const char = raw[index]
    const next = raw[index + 1]
    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false
        result += char
      }
      continue
    }
    if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false
        index += 1
      }
      continue
    }
    if (inString) {
      result += char
      if (char === '\\') {
        result += raw[index + 1] ?? ''
        index += 1
      } else if (char === quote) {
        inString = false
      }
      continue
    }
    if (char === '"' || char === "'") {
      inString = true
      quote = char
      result += char
      continue
    }
    if (char === '/' && next === '/') {
      inLineComment = true
      index += 1
      continue
    }
    if (char === '/' && next === '*') {
      inBlockComment = true
      index += 1
      continue
    }
    result += char
  }
  return result
}

const parseJsonBody = (raw) => {
  if (typeof raw !== 'string' || raw.trim() === '') return undefined
  try {
    return JSON.parse(stripComments(raw))
  } catch {
    return undefined
  }
}

const formatJsonBody = (raw) => {
  const parsed = parseJsonBody(raw)
  return parsed === undefined ? undefined : JSON.stringify(parsed, null, 2)
}

const normalizePathSegment = (segment) => segment.replace(/\{\{\s*([\w-]+)\s*\}\}/g, '{$1}')

const sanitizeUrl = (url) => {
  const segments = (url.path ?? []).map(normalizePathSegment)
  const query = (url.query ?? [])
    .filter(({ disabled }) => disabled !== true)
    .map(({ key, value, description }) => ({
      key,
      value: value === undefined ? '' : String(value),
      ...(description ? { description } : {}),
    }))
  const search = query
    .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
  return {
    pathTemplate: `/${segments.join('/')}`,
    raw: `${placeholderOrigin}/${segments.join('/')}${search ? `?${search}` : ''}`,
    host: ['placeholder', 'invalid'],
    path: segments,
    ...(query.length > 0 ? { query } : {}),
  }
}

const sanitizeResponses = (item) =>
  (item.response ?? [])
    .map((response) => {
      const body = formatJsonBody(response.body)
      if (body === undefined || response.code === undefined) return undefined
      return {
        name: response.name ?? '',
        code: response.code,
        status: response.status ?? '',
        header: [],
        body,
        _postman_previewlanguage: 'json',
        originalRequest: item.request,
      }
    })
    .filter((response) => response !== undefined)

const sanitizeItem = (item) => {
  const body = formatJsonBody(item.request.body?.raw)
  const hasBody = item.request.body?.mode === 'raw' && body !== undefined
  return {
    name: item.name,
    request: {
      method: item.request.method,
      header: [],
      ...(hasBody
        ? {
            body: {
              mode: 'raw',
              raw: body,
              options: { raw: { language: 'json' } },
            },
          }
        : {}),
      url: sanitizeUrl(item.request.url),
      description: item.request.description?.content ?? item.description?.content ?? '',
    },
    response: sanitizeResponses(item),
  }
}

const normalizeParameters = (parameters = []) => {
  const byName = new Map(parameters.map((parameter) => [parameter.name, parameter]))
  for (const [name, override] of Object.entries(parameterOverrides)) {
    if (!byName.has(name)) continue
    byName.set(name, {
      name,
      required: true,
      description: parameterDescriptions[name],
      ...override,
    })
  }
  return Array.from(byName.values())
}

const applySchemaOverrides = (spec, converted) => {
  for (const { operationId, specPath, method } of converted) {
    const pathItem = spec.paths[specPath]
    if (!pathItem) throw new Error(`Path ${specPath} is missing in the generated spec`)
    const operation = pathItem[method.toLowerCase()]
    if (!operation) throw new Error(`Method ${method} is missing for ${operationId}`)
    operation.operationId = operationId
    delete operation.tags
    operation.parameters = normalizeParameters(operation.parameters)
    const requestSchema = requestBodySchemas[operationId]
    if (requestSchema && operation.requestBody) {
      operation.requestBody = {
        required: true,
        content: {
          'application/json': { schema: { $ref: `#/components/schemas/${requestSchema}` } },
        },
      }
    }
    const successSchema = responseSchemas[operationId]?.[200]
    if (successSchema && operation.responses?.['200']) {
      // Ответ 200 разворачивается inline: @kubb/plugin-fetch ссылается на схему ответа по
      // имени операции (sendMessageResponseSchema), а @kubb/plugin-zod экспортирует такое
      // имя только для inline-схем — с $ref имя не совпадает и сборка падает.
      const success =
        typeof successSchema === 'string' ? structuredClone(schemas[successSchema]) : successSchema
      operation.responses['200'] = {
        description: 'Успешный ответ',
        content: { 'application/json': { schema: success } },
      }
    }
    for (const code of Object.keys(operation.responses ?? {})) {
      if (code === '200') continue
      operation.responses[code] = errorResponse
    }
  }
  spec.components = {
    ...spec.components,
    schemas: Object.fromEntries(
      Object.entries(schemas).filter(([name]) => !inlinedResponseSchemas.includes(name)),
    ),
  }
  spec.tags = [{ name: 'green-api', description: 'GREEN-API HTTP API' }]
}

const buildCollection = (collection) => {
  const converted = operations.map(({ operationId, path: pathSegments }) => {
    const source = findItem(collection.item, pathSegments)
    if (!source) throw new Error(`Request ${pathSegments.join('/')} is not found in the collection`)
    const item = sanitizeItem(source)
    const { pathTemplate, ...url } = item.request.url
    item.request.url = url
    return { operationId, specPath: pathTemplate, method: item.request.method, item }
  })
  return {
    converted,
    collection: {
      info: {
        name: 'GREEN-API',
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
      },
      item: converted.map(({ item }) => item),
    },
  }
}

const main = async () => {
  const apiUrl = await readEnvExample()
  const collection = JSON.parse(await readFile(collectionPath, 'utf8'))
  const { converted, collection: generatedCollection } = buildCollection(collection)
  const generated = await postmanToOpenApi(JSON.stringify(generatedCollection), null, {
    info: {
      title: 'GREEN-API HTTP API',
      version: '1.0.0',
      description: 'Сгенерировано из Postman-коллекции GREEN-API: scripts/postman-to-openapi.mjs',
    },
    servers: [{ url: apiUrl, description: 'Базовый URL GREEN-API (VITE_API_URL)' }],
    outputFormat: 'json',
    responseHeaders: false,
  })
  const spec = JSON.parse(generated)
  applySchemaOverrides(spec, converted)
  await writeFile(outputPath, `${JSON.stringify(spec, null, 2)}\n`, 'utf8')
  process.stdout.write(`OpenAPI spec written to ${path.relative(rootDir, outputPath)}\n`)
}

await main()
