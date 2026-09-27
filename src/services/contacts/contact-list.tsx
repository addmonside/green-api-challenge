import { useNavigate } from 'react-router'
import type { ContactListItem as ContactListItemType } from '@/shared/api/generated/types'
import { routes } from '@/shared/model'
import { PageLayout } from '@/shared/ui/page-layout'
import { ContactListItem } from './contact-list-item'
import { useContacts } from './use-contacts'

export function ContactList() {
  const { data: contacts, isPending, error } = useContacts()
  const navigate = useNavigate()
  const openChat = (chatId: string) => {
    const target = chatId.trim()
    if (!target) return
    navigate(routes.getChat(target))
  }
  return error ? (
    <PageLayout.Error title="При получении контактов возникла проблема" error={error} />
  ) : !isPending && contacts?.length === 0 ? (
    <PageLayout.Empty title="Список контактов пуст" description="Откройте чат по номеру телефона" />
  ) : (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-1">
      {contacts?.map((contact) => (
        <ContactListItem
          key={contact.chatId}
          title={getTitle(contact)}
          phone={toPhone(contact.phoneNumber)}
          onClick={() => openChat(contact.chatId)}
        />
      ))}
    </ul>
  )
}

function toPhone(phoneNumber?: number) {
  return phoneNumber ? `+${phoneNumber}` : undefined
}

function getTitle(contact: ContactListItemType) {
  return (
    contact.contactName?.trim() ||
    contact.name?.trim() ||
    toPhone(contact.phoneNumber) ||
    contact.chatId
  )
}
