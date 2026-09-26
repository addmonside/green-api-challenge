import { PageLayout } from '@/shared/ui/page-layout'
import { ChatHeader } from './chat-header'
import { ChatMessageList } from './chat-message-list'
import { ChatPanel } from './chat-panel'

function ChatPage() {
  return (
    <PageLayout variant="chat" className="chat-background">
      <PageLayout.Header>
        <ChatHeader />
      </PageLayout.Header>
      <PageLayout.Toolbar>
        <ChatPanel />
      </PageLayout.Toolbar>
      <PageLayout.Content>
        <ChatMessageList />
      </PageLayout.Content>
    </PageLayout>
  )
}

export const Component = ChatPage
