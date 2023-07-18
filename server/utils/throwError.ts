import type { H3Event } from 'h3';
import { STATUS_CODES } from 'http';

type StatusCode = 100 | 101 | 102 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 509 | 510 | 511;

export function throwError(event: H3Event, response: { statusCode: StatusCode, message?: string }) {
  const url = event.node.req.url ?? '';
  const statusCode = response.statusCode;
  const statusMessage = STATUS_CODES[statusCode] ?? '';

  event.node.res.statusCode = statusCode;
  event.node.res.statusMessage = statusMessage;

  return {
    url,
    statusCode,
    statusMessage,
    message: response.message || statusMessage,
  };
}