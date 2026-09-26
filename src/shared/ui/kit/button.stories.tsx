import type { Meta, StoryObj } from '@storybook/react-vite'
import { Send } from 'lucide-react'
import { expect } from 'storybook/test'

import { Button } from './button'

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Order now' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /order now/i })).toBeVisible()
  },
}

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost' },
}

export const GhostPrimary: Story = {
  args: { children: 'Ghost primary', variant: 'ghost-primary' },
}

export const Success: Story = {
  args: { children: 'Saved', variant: 'success' },
}

export const GhostIcon: Story = {
  args: { children: <Send aria-hidden />, 'aria-label': 'Send message', variant: 'ghost-icon' },
}

export const ChatSend: Story = {
  args: { children: <Send aria-hidden />, 'aria-label': 'Send message', variant: 'chat-send' },
}

export const Small: Story = {
  args: { children: 'Small', className: 'h-8 px-3 text-xs' },
}

export const Large: Story = {
  args: { children: 'Large', className: 'h-12 px-6 text-base' },
}

export const Disabled: Story = {
  args: { children: 'Unavailable', disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /unavailable/i })).toBeDisabled()
  },
}

export const CssCheck: Story = {
  args: { children: 'Submit' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    const background = getComputedStyle(button).backgroundColor
    await expect(['rgb(45, 126, 213)', 'oklch(0.589 0.154 253.336)']).toContain(background)
  },
}
