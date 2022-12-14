import { FastifyReply, FastifyRequest } from "fastify";
import { ExistingUserLoginError } from "../exceptions";
import { signin } from "../services/sessions.services";
import { LoginBodyParams } from "../types/session.controller";

function login(request: FastifyRequest, reply: FastifyReply) {
  const { username, password } = request.body as LoginBodyParams;
  signin({ username, password })
    .then((user) => {
      reply.header("Authorization", `Bearer ${user.access_token}`);
      reply.code(200).send(user);
    })
    .catch((error) => {
      if (error instanceof ExistingUserLoginError) {
        reply.code(403).send(error.existingUser);
      } else {
        reply.send(error);
      }
    });
}

export { login };
