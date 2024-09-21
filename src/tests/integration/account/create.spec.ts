import request from "supertest";
import { server } from "../main"

beforeAll(async () => {
    await server.ready();
  });

describe('Create Account', () => {
    it('should create', async () => {
        const payload = {
            "accountNumber": "string",
            "balance": 0,
            "currency": "BRL",
            "userId": 0
          }
        const response = await request(server.server)
        .post("/accounts")
        .send(payload)
        .expect(201);
        expect(response.body).toHaveProperty('id')
        expect(response.body).toEqual(expect.objectContaining(payload));
    })
})