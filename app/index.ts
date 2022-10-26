import * as dotenv from "dotenv";
import build from "./application";
dotenv.config({ path: `${__dirname}/../.env` });
const fastify = build();

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
