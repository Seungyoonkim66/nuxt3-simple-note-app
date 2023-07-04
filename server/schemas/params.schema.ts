import { z } from 'zod';

export const IdSchema = z.string().transform((val, ctx) => {
  // REF: number type이 아닌 아이디를 받았을 때 400 에러로 보낼 수 있도록 함 
  const parsed = Number(val);

  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid ID'
    });

    return z.NEVER;
  }

  return parsed;
});

