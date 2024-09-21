import "fastify";
import { User } from "./user";

declare module "fastify" {
  interface FastifyRequest {
    requestId: string;
  }

  interface FastifyReply {
    requestId: string;  
  }
}
