import { z } from 'zod';

export const NoteSchema = z.object({
  title: z.string(),
  content: z.string(),
});

// .strict() : title, content 이외의 추가적인 데이터가 들어와도 error

