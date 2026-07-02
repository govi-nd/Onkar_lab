import { z } from "zod";

export type TestOptionType = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  category?: string;
  turnaround?: string;
};

export type Details = {
  name: string;
  phone: string;
  email: string;
  date: string;
  slot: string;
  notes: string;
};

export const detailsSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  date: z.string().min(1, "Pick a date"),
  slot: z.string().min(1, "Pick a time slot"),
  notes: z.string().max(500).optional(),
});

export type Errors = Partial<Record<keyof Details, string>>;
