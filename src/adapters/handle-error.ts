import { FastifyReply } from "fastify";
import { ValidationError } from "yup";
import { logger } from "./logger";
import { Sentry } from "./sentry";
interface ErrorResponse {
  message: string;
  errors: Record<string, string>;
}

export const handleError = (reply: FastifyReply, error: any) => {
  let status: number = 400;
  let message: string = "Unexpected Error";
  const errors: Record<string, string> = {};

  if (error instanceof ValidationError) {
    if (error.errors.length) {
      message = error.errors[0]!;
    }
    for (const currentError of error.inner) {
      if (currentError.path) {
        errors[currentError.path] = currentError.message;
      }
    }
  } else {
    Sentry.captureException(error);
    logger.log({
      logCode: 'unexpected-error',
      requestId: reply.requestId,
      message: '',
      errorMessage: error.message,
      stack: error.stack,
      level: 'error'
    })
    console.error(error)
    status = 500;
  }
  const response: ErrorResponse = {
    message,
    errors,
  };
  reply.status(status).send(response);
};
