import { z } from 'zod'

export const chatRecipientSchema = z.object({
  recipient: z
    .string()
    .trim()
    .min(1, 'Укажите номер получателя')
    .regex(/^\d+$/, 'Номер состоит только из цифр')
    .length(11, 'Номер состоит из 11 цифр')
    .regex(/^7/, 'Номер начинается с 7'),
})
