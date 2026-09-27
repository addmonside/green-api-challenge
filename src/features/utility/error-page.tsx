import { useParams } from 'react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/kit/card'

const ERROR_TITLES: Record<string, string> = {
  '404': 'Страница не найдена',
}

function ErrorPage() {
  const { codeId = '404' } = useParams()
  const title = ERROR_TITLES[codeId] ?? `Ошибка ${codeId}`

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Запрошенная страница не существует или была перемещена.</CardDescription>
      </CardHeader>
      <CardContent>{codeId}</CardContent>
    </Card>
  )
}

export const Component = ErrorPage
