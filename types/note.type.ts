import { z } from 'zod';

export const NoteSchema = z.object({
  id: z.number(),
  title: z.string().nonempty(),
  content: z.string().nonempty(),
  teaser: z.string(),
  views: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type Note = z.infer<typeof NoteSchema>;