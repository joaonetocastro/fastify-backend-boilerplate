import { FastifyPluginCallback } from "fastify";
import { createAccountRoute } from "./create";

export const accountRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
    fastify.register(createAccountRoute)
    done()
}