import { z } from "zod";

export const packageCreateValidatorZod = z.object({
  body: z
    .object({
      title: z.string(),
      destination: z.string(),
      country: z.string(),
      continent: z.string(),
      duration: z.string(),
      date: z.string(),
      amount: z.string(),
      lastBookingDate: z.string(),
      image: z.string(),
      ratings: z.string(),
      type: z.enum(["LUXURY", "BUDGET"]),
      status: z.enum(["AVAILABLE", "UPCOMING"]),
    })
    .strict(),
});

export const packageUpdateValidatorZod = z.object({
  body: z.object({
    title: z.string().optional(),
    destination: z.string().optional(),
    country: z.string().optional(),
    continent: z.string().optional(),
    duration: z.string().optional(),
    date: z.string().optional(),
    amount: z.string().optional(),
    lastBookingDate: z.string().optional(),
    image: z.string().optional(),
    ratings: z.string().optional(),
    type: z.enum(["LUXURY", "BUDGET"]).optional(),
    status: z.enum(["AVAILABLE", "UPCOMING"]).optional(),
  }),
});
