import "dotenv/config";
import "./config";
import swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import websocket from "@fastify/websocket";
import Fastify from "fastify";
import cors from "@fastify/cors";
import metricsPlugin from 'fastify-metrics';
import { logger } from "./adapters/logger";
import { randomUUID } from "crypto";
import { Sentry } from "./adapters/sentry";
import { routes } from "./routes";

function getServer() {
  const server = Fastify({
    logger: false,
  });
  Sentry.setupFastifyErrorHandler(server);
  server.register(cors, {
    origin: process.env["ORIGIN_ALLOWED"] || "*",
  });

  server.addHook('onRequest', (request, reply, next) => {
    const requestId = randomUUID()
    request.requestId = requestId
    reply.requestId = requestId
    next()
  })

  server.register(metricsPlugin, {endpoint: '/metrics/api' }).then(() => {
    server.register(websocket);
  
    server.register(swagger, {
      swagger: {
        info: {
          title: "core-bank-api",
          description: "API",
          version: "0.1.0",
        },
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        securityDefinitions: {
          Authorization: {
            type: "apiKey",
            name: "authorization",
            in: "header",
            description: "Authentication token",
          },
        },
        security: [
          {
            Authorization: [],
          },
        ],
      },
    });
  
    server.register(routes)
    
    if (process.env["ENVIRONMENT"] === "development") {
      server.register(fastifySwaggerUi, {
        routePrefix: "/api-docs",
      });
    }
  
  server.addHook('onResponse', (request, reply, done) => {
    const status = reply.statusCode;
    const method = request.method;
    const url = request.url;
    const time = Number(Math.floor(reply.elapsedTime*100)/100);
    const log = {status, method, url, time}
    
    if(url.includes('/metrics') || url.includes('/healthcheck')) {
      done()
      return
    }

    if (status >= 500) {
      logger.log({...log, message: '', logCode: 'request-time', requestId: request.requestId, level: 'error',});
    } else if (status >= 400) {
      logger.log({...log, message: '', logCode: 'request-time', requestId: request.requestId, level: 'warn'});
    } else if (status >= 200) {
      logger.log({...log, message: '', logCode: 'request-time', requestId: request.requestId, level: 'info'});
    }
  
    done();
  });

  })

  return server;
}

export { getServer };
