import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Input } from './input'

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Type a message…' },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox')
    await userEvent.type(input, 'Hello there')
    await expect(input).toHaveValue('Hello there')
  },
}

export const WithValue: Story = {
  args: { defaultValue: 'Hello' },
}

export const Password: Story = {
  args: { type: 'password', placeholder: 'Password' },
}

export const Disabled: Story = {
  args: { placeholder: 'Unavailable', disabled: true },
}

export const Invalid: Story = {
  args: { placeholder: 'Required', 'aria-invalid': true },
}
