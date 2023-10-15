import { z } from 'zod'

const userUpdateValidatorZod = z.object({
  address: z.string().optional(),
  budget: z.number().optional(),
  income: z.number().optional(),
  name: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  password: z.string().optional(),
  phoneNumber: z.string().optional(),
  role: z.enum(['seller', 'buyer']).optional(),
})

export default userUpdateValidatorZod
