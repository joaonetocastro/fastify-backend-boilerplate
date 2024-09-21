import { handleError } from "@/adapters/handle-error";
import { CreateAccountDTO } from "@/modules/account/dtos/create-account-dto";
import { CreateAccountUseCase } from "@/modules/account/usecases/create-account";
import { FastifyPluginCallback } from "fastify";
import { container } from "tsyringe";

const schema = {
  tags: ["Account"],
  body: {
    type: 'object',
    properties: {
      accountNumber: { type: 'string' },
      balance: { type: 'integer' },
      currency: { type: 'string', enum: ['BRL'] },
      userId: {type: 'integer'}
    }
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: 'string' },
        accountNumber: { type: 'string' },
        balance: { type: 'integer' },
        currency: { type: 'number' },
        userId: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  },
}

interface CreateAccountRequest {
  Body: {
    accountNumber: string
    balance: number
    currency: 'BRL'
    userId: number
  };
}

export const createAccountRoute: FastifyPluginCallback = (server, _opts, done) => {
  server.post<CreateAccountRequest>(
    "/",
    {
      schema,
      // preHandler: middlewares.auth(),
    },
    async (request, reply) => {
      try {
        const usecase = new CreateAccountUseCase(
          container.resolve('IAccountRepository')
        )
        const response = await usecase.execute(new CreateAccountDTO(request.body))
        reply.status(201).send(response);
      } catch (error: any) {
        handleError(reply, error);
      }
    }
  );

  done();
}