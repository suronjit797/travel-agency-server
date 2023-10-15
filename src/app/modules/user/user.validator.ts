import { z } from 'zod'
import { userRoleArr } from '../../../shared/globalConstant'

export const userCreateValidatorZod = z.object({
  body: z
    .object({
      name: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
      email: z.string().email(),
      password: z.string().min(6).max(18),
      address: z.string(),
      phoneNumber: z.string(),
    })
    .strict(),
})

export const userLoginValidatorZod = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z.string().min(6).max(18),
    })
    .strict(),
})

export const userUpdateValidatorZod = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(18).optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    role: z.enum([...(userRoleArr as [string, ...string[]])]).optional(),
  }),
})
