import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  date: z.string().min(1),
  time: z.string().min(1).max(50),
  location: z.string().min(3).max(200),
  imageUrl: z.string().url().optional().or(z.literal("")),
  capacity: z.number().int().min(1).optional().or(z.literal(null)),
  lumaUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["UPCOMING", "PAST", "CANCELLED"]),
});

export const registrationSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  major: z.string().max(100).optional(),
  year: z
    .enum(["Freshman", "Sophomore", "Junior", "Senior", "Graduate"])
    .optional(),
  message: z.string().max(1000).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
});

export type EventInput = z.infer<typeof eventSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
