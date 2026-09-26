import { useNavigate } from 'react-router'
import { routes } from '@/shared/model'
import { PageLayout } from '@/shared/ui/page-layout'
import { ChatListForm } from './chat-list-form'
import { ChatListHeader } from './chat-list-header'

function ChatListPage() {
  const navigate = useNavigate()
  const openChat = (chatId: string) => {
    const target = chatId.trim()
    if (!target) return
    navigate(routes.getChat(target))
  }

  return (
    <PageLayout variant="chat">
      <PageLayout.Header>
        <ChatListHeader />
      </PageLayout.Header>
      <PageLayout.Content>
        <ChatListForm onSubmit={openChat} />
      </PageLayout.Content>
    </PageLayout>
  )
}

export const Component = ChatListPage
