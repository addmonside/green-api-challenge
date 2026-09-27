// import { ContactList } from '@/services/contacts'
import { PageLayout } from '@/shared/ui/page-layout'
import { ChatListForm } from './chat-list-form'
import { ChatListHeader } from './chat-list-header'

function ChatListPage() {
  return (
    <PageLayout variant="chat">
      <PageLayout.Header>
        <ChatListHeader />
      </PageLayout.Header>
      <PageLayout.Content>
        <ChatListForm />
      </PageLayout.Content>
      {/*<PageLayout.Content>
        <ContactList />
      </PageLayout.Content>*/}
    </PageLayout>
  )
}

export const Component = ChatListPage
