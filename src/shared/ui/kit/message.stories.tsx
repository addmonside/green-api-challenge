import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from './message'

const meta = {
  component: Message,
  tags: ['ai-generated'],
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Incoming: Story = {
  render: () => (
    <MessageGroup className="w-full max-w-80">
      <Message>
        <MessageAvatar className="size-8">A</MessageAvatar>
        <MessageContent>
          <MessageHeader>Alex</MessageHeader>
          <p className="rounded-lg bg-secondary px-3 py-2">
            Hi, ready for the green API challenge?
          </p>
          <MessageFooter>14:02</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/ready for the green api challenge/i)).toBeVisible()
  },
}

export const Outgoing: Story = {
  render: () => (
    <MessageGroup className="w-full max-w-80">
      <Message align="end">
        <MessageAvatar className="size-8">Me</MessageAvatar>
        <MessageContent>
          <p className="rounded-lg bg-primary px-3 py-2 text-primary-foreground">
            Absolutely, let's do it.
          </p>
          <MessageFooter>14:05</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}

export const Conversation: Story = {
  render: () => (
    <MessageGroup className="w-full max-w-80">
      <Message>
        <MessageAvatar className="size-8">A</MessageAvatar>
        <MessageContent>
          <MessageHeader>Alex</MessageHeader>
          <p className="rounded-lg bg-secondary px-3 py-2">Hey! Did you get my message?</p>
          <MessageFooter>09:11</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <p className="rounded-lg bg-primary px-3 py-2 text-primary-foreground">
            Yes, replying now.
          </p>
          <MessageFooter>09:12</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}
