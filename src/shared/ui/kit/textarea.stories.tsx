import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Textarea } from './textarea'

const meta = {
  component: Textarea,
  tags: ['ai-generated'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Write something…' },
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole('textbox')
    await userEvent.type(textarea, 'Typed text')
    await expect(textarea).toHaveValue('Typed text')
  },
}

export const WithValue: Story = {
  args: { defaultValue: 'Hello world' },
}

export const Disabled: Story = {
  args: { defaultValue: 'Read only', disabled: true },
}
