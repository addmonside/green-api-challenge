import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search, SendHorizontal } from 'lucide-react'
import { expect } from 'storybook/test'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group'

const meta = {
  component: InputGroup,
  tags: ['ai-generated'],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const WithIcon: Story = {
  render: () => (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput aria-label="Search chats" placeholder="Search chats" />
    </InputGroup>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: /search chats/i })
    const icon = canvasElement.querySelector('[data-slot="input-group-addon"] svg') as Element
    await userEvent.click(icon)
    await expect(input).toHaveFocus()
  },
}

export const WithPrefixText: Story = {
  render: () => (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon>
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput aria-label="Amount" placeholder="Amount" type="number" />
    </InputGroup>
  ),
}

export const WithSendButton: Story = {
  render: () => (
    <InputGroup className="w-full max-w-sm">
      <InputGroupInput aria-label="Message" placeholder="Message" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="Send">
          <SendHorizontal />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <InputGroup className="w-full max-w-md">
      <InputGroupTextarea aria-label="Reply" placeholder="Reply…" />
      <InputGroupAddon align="block-end">
        <InputGroupButton aria-label="Reply">
          <SendHorizontal />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
