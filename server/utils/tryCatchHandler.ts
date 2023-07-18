import type { EventHandler } from 'h3';

export const defineTryCatchHandler = (handler: EventHandler) => defineEventHandler(async event => {
  try {
    const response = await handler(event);
    return response;
  } catch (err) {
    console.log({ err });

    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    }));
  }
})