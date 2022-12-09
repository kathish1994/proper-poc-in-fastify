import logger from "../config/logger";
import { map } from "lodash";

import {
  SessionError,
  BulkUserUploadError,
  InternalServerError,
} from "../exceptions";
import { FastifyReply, FastifyError, FastifyRequest } from "fastify";

import {
  DatabaseError,
  ValidationError,
  EmptyResultError,
  UniqueConstraintError,
} from "sequelize";

function renderError(
  req: FastifyRequest,
  reply: FastifyReply,
  errObj: FastifyError
) {
  logger.error({ err: errObj }, errObj.toString());
  if (errObj.validation) {
    const messages = map(errObj.validation, (err: any) => err.message);
    reply.code(400).send({ errors: messages });
  } else if (errObj instanceof DatabaseError) {
    const message = errObj.message || errObj.original;
    reply.code(400).send({ errors: [message] });
  } else if (errObj instanceof SessionError) {
    reply.code(401).send({ errors: [errObj.message] });
  } else if (errObj instanceof EmptyResultError) {
    reply.code(404).send({ errors: [errObj.message] });
  } else if (
    errObj instanceof ValidationError ||
    errObj instanceof UniqueConstraintError ||
    errObj instanceof BulkUserUploadError
  ) {
    const messages = map(errObj.errors, (error: any) => error.message);
    reply.code(422).send({ errors: messages });
  } else if (
    errObj.statusCode &&
    errObj.statusCode >= 400 &&
    errObj.statusCode <= 499
  ) {
    reply.code(errObj.statusCode).send({ errors: [errObj.message] });
  } else {
    const internalServerError = new InternalServerError(
      errObj,
      req.url.toString()
    );
    logger.error({ err: internalServerError }, internalServerError.toString());
    reply.code(500).send({
      errors: ["exception.internal_server_error"],
    });
  }
}
export default renderError;
