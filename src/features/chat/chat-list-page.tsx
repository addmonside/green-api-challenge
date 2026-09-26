import { PageLayout } from '@/shared/ui/page-layout'
import { ChatList } from './chat-list'
import { ChatListForm } from './chat-list-form'
import { ChatListHeader } from './chat-list-header'

function ChatListPage() {
  return (
    <PageLayout variant="chat">
      <PageLayout.Header>
        <ChatListHeader />
      </PageLayout.Header>
      <PageLayout.Content>
        <ChatListForm onSubmit={openChat} />
        <ChatListForm />
      </PageLayout.Content>
    </PageLayout>
  )
}

export const Component = ChatListPage
