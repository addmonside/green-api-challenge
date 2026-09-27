import { z } from 'zod'

// GREEN-API MAX принимает номера из 11 или 12 цифр: 7... (Россия) либо 375... (Беларусь).
export const chatRecipientSchema = z.object({
  recipient: z
    .string()
    .trim()
    .min(1, 'Укажите номер получателя')
    .regex(
      /^(7\d{10}|375\d{9})$/,
      'Номер должен начинаться с 7 (Россия) или 375 (Беларусь) и содержать 11–12 цифр',
    ),
})
