import { useParams } from 'react-router'
import { useContactInfo } from '@/services/contacts'
import { PageLayout } from '@/shared/ui/page-layout'
import { useMessages } from './model/use-messages'
import { useNotificationPoller } from './model/use-notification-poller'
import { MessageList } from './ui/message-list'
import { MessageListHeader } from './ui/message-list-header'
import { ChatPanel } from './ui/message-list-panel'

function MessageListPage() {
  const { chatId = '' } = useParams()
  const { data } = useContactInfo(chatId)
  const { data: messages = [], isPending } = useMessages(chatId)
  useNotificationPoller(chatId)

  return (
    <PageLayout variant="chat">
      <PageLayout.Header>
        <MessageListHeader
          title={data?.name ?? data?.contactName ?? 'Сообщения'}
          lastSeen={data?.lastSeen}
        />
      </PageLayout.Header>
      <PageLayout.Toolbar>
        <ChatPanel chatId={chatId} />
      </PageLayout.Toolbar>
      <PageLayout.Content>
        {!isPending && messages.length === 0 && (
          <PageLayout.Empty
            title="Нет сообщений"
            description="Напишите первое сообщение в этом чате."
          />
        )}
        {!isPending && messages.length > 0 && (
          <MessageList messages={messages} isPending={isPending} />
        )}
      </PageLayout.Content>
    </PageLayout>
  )
}

export const Component = MessageListPage
