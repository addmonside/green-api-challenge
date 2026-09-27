import type { Meta, StoryObj } from '@storybook/react-vite'
import { Inbox } from 'lucide-react'
import { expect } from 'storybook/test'

import { Button } from './button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty'

const meta = {
  component: Empty,
  tags: ['ai-generated'],
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty className="border border-border">
      <EmptyHeader>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>Messages you exchange in this chat will appear here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/no messages yet/i)).toBeVisible()
  },
}

export const Icon: Story = {
  render: () => (
    <Empty className="border border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>No chats</EmptyTitle>
        <EmptyDescription>Start a new conversation to send a message.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Empty className="border border-border">
      <EmptyHeader>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Try a different search query.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Clear filters</Button>
      </EmptyContent>
    </Empty>
  ),
}
