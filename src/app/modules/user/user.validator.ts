import { z } from 'zod'
import { userRoleArr } from '../../../shared/globalConstant'

export const userCreateValidatorZod = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    email: z.string(),
    password: z.string(),
    address: z.string(),
    phoneNumber: z.string(),
    role: z.enum([...(userRoleArr as [string, ...string[]])]),
  }),
})

export const userUpdateValidatorZod = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    role: z.enum([...(userRoleArr as [string, ...string[]])]).optional(),
  }),
})
