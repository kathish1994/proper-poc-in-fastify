import fastify, { FastifyInstance } from "fastify";
import cors from "fastify-cors";
import { IncomingMessage, Server, ServerResponse } from "http";
import corsOptions from "./config/cors-option";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: true });

function build() {
  server.register(cors, corsOptions);
  //server.register(routes);

  return server;
}

export default build;
