import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from './message-scroller'

const messages = Array.from({ length: 8 }, (_, index) => ({
  id: `m${index}`,
  text: `Message ${index + 1}`,
}))
const lastId = messages[messages.length - 1].id

const meta = {
  component: MessageScroller,
  tags: ['ai-generated'],
} satisfies Meta<typeof MessageScroller>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="h-64 w-full max-w-sm rounded-lg border border-border">
      <MessageScrollerProvider defaultScrollPosition="end">
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent>
              {messages.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  scrollAnchor={message.id === lastId}
                >
                  <p className="px-3 py-2">{message.text}</p>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Message 4')).toBeVisible()
  },
}
