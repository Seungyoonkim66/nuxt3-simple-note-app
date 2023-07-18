import type { EventHandler } from 'h3';
import { ZodError } from 'zod';

export const defineTryCatchHandler = (handler: EventHandler) => defineEventHandler(async event => {
  try {

    const response = await handler(event);
    return response;
    
  } catch (err) {

    console.log({ err });

    if (err instanceof ZodError) {
      return throwError(event, {
        statusCode: 400,
        message: err.message,
      });
    }

    return throwError(event, {
      statusCode: 500,
    });
  }
})