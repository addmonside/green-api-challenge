import { useParams } from 'react-router'
import { PageLayout } from '@/shared/ui/page-layout'
import { ScrollDown } from '@/shared/ui/scroll-down'
import { ShowIf } from '@/shared/ui/show-if'
import { useMessageList } from './model/use-message-list'
import { useMessageNotificationPoller } from './model/use-message-notification-poller'
import { useSendMessage } from './model/use-send-message'
import { MessageList } from './ui/message-list'
import { MessageListHeader } from './ui/message-list-header'
import { MessageListPanel } from './ui/message-list-panel'

function MessageListPage() {
  const { chatId = '' } = useParams()
  const { data: messages = [], isPending, error: messageListError } = useMessageList(chatId)
  const { sendMessage, error } = useSendMessage(chatId)
  useMessageNotificationPoller(chatId)

  return (
    <PageLayout variant="chat">
      <PageLayout.Header>
        <MessageListHeader chatId={chatId} />
      </PageLayout.Header>
      <PageLayout.Toolbar>
        <ShowIf condition={!!error || !!messageListError}>
          <PageLayout.Error
            title={
              messageListError
                ? 'Проблема при получении сообщений'
                : 'Проблема при отправке сообщения'
            }
            error={messageListError ?? error}
          />
        </ShowIf>
        <MessageListPanel onSend={sendMessage} />
      </PageLayout.Toolbar>
      <PageLayout.Content>
        <ShowIf condition={!isPending && messages.length === 0}>
          <PageLayout.Empty
            title="Нет сообщений"
            description="Напишите первое сообщение в этом чате."
          />
        </ShowIf>
        <ShowIf condition={!isPending && messages.length > 0}>
          <ScrollDown scrollingOnFirstRender scrollingOnChange dependencies={messages}>
            <MessageList messages={messages} />
          </ScrollDown>
        </ShowIf>
      </PageLayout.Content>
    </PageLayout>
  )
}

export const Component = MessageListPage
