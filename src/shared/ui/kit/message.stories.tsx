import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Time } from '@/shared/ui/time'
import { Bubble, BubbleContent, BubbleTail } from './bubble'
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from './message'

const at = (hours: number, minutes: number) =>
  new Date(2025, 0, 15, hours, minutes).getTime() / 1000

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
    <MessageGroup className="w-full max-w-80 gap-3">
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent className="flex flex-wrap items-end justify-end gap-x-1.5 rounded-bl-none">
              <span className="min-w-0 grow">Hey! Did you get my message?</span>
              <Time timestamp={at(9, 11)} className="text-muted-foreground" />
            </BubbleContent>
            <BubbleTail />
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent className="flex flex-wrap items-end justify-end gap-x-1.5">
              <span className="min-w-0 grow">Long message to check the tail position and time</span>
              <Time timestamp={at(9, 12)} className="text-muted-foreground" />
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent className="flex flex-wrap items-end justify-end gap-x-1.5">
              <span className="min-w-0 grow">Yes, replying now.</span>
              <Time timestamp={at(9, 12)} className="text-primary-foreground/70" />
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent className="flex flex-wrap items-end justify-end gap-x-1.5 rounded-br-none">
              <span className="min-w-0 grow">And one more</span>
              <Time timestamp={at(9, 13)} className="text-primary-foreground/70" />
            </BubbleContent>
            <BubbleTail align="end" />
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('09:13')).toBeVisible()
  },
}
