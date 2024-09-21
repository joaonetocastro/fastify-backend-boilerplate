import { FastifyPluginCallback } from "fastify";
import { accountRoutes } from "./account";

export const routes: FastifyPluginCallback = (fastify, _opts, done) => {
    fastify.register(accountRoutes, {
        prefix: '/accounts'
    })
    done()
}