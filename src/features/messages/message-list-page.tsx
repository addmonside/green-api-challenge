import { useParams } from 'react-router'
import { useCredentials } from '@/shared/model'
import { PageLayout } from '@/shared/ui/page-layout'
import { Text } from '@/shared/ui/text'

function MessageListPage() {
  const { chatId = '' } = useParams()
  const { credentials } = useCredentials()

  return (
    <PageLayout variant="chat">
      <PageLayout.Header>
        <Text as="h1" className="text-lg font-medium">
          Сообщения
        </Text>
      </PageLayout.Header>
      <PageLayout.Content className="gap-4 p-4">
        <p>chatId - {chatId}</p>
        <p>credentials - {credentials?.idInstance}</p>
      </PageLayout.Content>
    </PageLayout>
  )
}

export const Component = MessageListPage
