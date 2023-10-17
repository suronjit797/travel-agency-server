import { z } from 'zod'

export const packageCreateValidatorZod = z.object({
  body: z
    .object({
      title: z.string(),
      country: z.string(),
      destination: z.string(),
      duration: z.string(),
      date: z.string(),
      amount: z.number(),
      type: z.enum(['luxury', 'budget']),
      lastBookingDate: z.string(),
      image: z.string(),
    })
    .strict(),
})
export const packageUpdateValidatorZod = z.object({
  body: z
    .object({
      title: z.string().optional(),
      country: z.string().optional(),
      destination: z.string().optional(),
      duration: z.string().optional(),
      date: z.string().optional(),
      amount: z.number().optional(),
      type: z.enum(['luxury', 'budget']).optional(),
      lastBookingDate: z.string().optional(),
      image: z.string().optional(),
    })
    .strict(),
})
