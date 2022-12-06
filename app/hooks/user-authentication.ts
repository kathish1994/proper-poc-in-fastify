import logger from "../config/logger";
import { User } from "../models";
import { verify as jwtVerify } from "jsonwebtoken";
import { JwtTokenUserAttributes } from "../types/session.controller";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
const { JWT_SECRET_KEY = "" } = process.env;

function getHeaderToken(headers: any) {
  const bearerHeader = headers.authorization;
  const bearer = bearerHeader ? bearerHeader.split(" ") : [];
  const bearerToken = bearer[1];
  return bearerToken;
}

function verifyToken(
  token: string,
  secretKey: string
): Promise<JwtTokenUserAttributes> {
  return new Promise((resolve, reject) =>
    jwtVerify(
      token,
      secretKey,
      (err: string, decoded: JwtTokenUserAttributes) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    )
  );
}

const userAuthenticate = (fastify: FastifyInstance) => {
  fastify.decorateRequest("currentUser", null);
  fastify.addHook(
    "preHandler",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = getHeaderToken(req.headers);
      if (!token) {
        const error = {
          errors: ["session.no_access"],
        };
        reply.code(401).send(error);
      } else {
        try {
          const userAttrs = await verifyToken(token, JWT_SECRET_KEY);
          const user = await User.findOne({
            where: { id: userAttrs.id },
          });
          if (user && user.access_token === token) {
            reply.header("Authorization", `Bearer ${token}`);
          } else {
            const error = {
              errors: ["session.expired"],
            };
            reply.code(401).send(error);
          }
        } catch (error: any) {
          logger.error({ err: error }, error.toString());
          reply.code(401).send({ errors: ["session.expired"] });
        }
      }
    }
  );
};

export default userAuthenticate;
