import { Button } from '@/shared/ui/kit/button'
import { ShowIf } from '@/shared/ui/show-if'
import { Text } from '@/shared/ui/text'

export function ContactListItem({
  title,
  phone,
  onClick,
}: {
  title: string
  phone?: string
  onClick: () => void
}) {
  return (
    <li>
      <Button variant="secondary" className="w-full" onClick={onClick}>
        <Text className="flex-1">
          <Text as="span" variant="contact-name">
            {title}
          </Text>
          <ShowIf
            condition={!!phone}
            then={
              <Text as="span" variant="contact-phone">
                Телефон не указан
              </Text>
            }
          >
            <Text as="span" variant="contact-phone">
              {phone}
            </Text>
          </ShowIf>
        </Text>
      </Button>
    </li>
  )
}
