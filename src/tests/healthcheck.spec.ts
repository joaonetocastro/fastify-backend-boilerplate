import request from "supertest";
import { getServer } from "../server";

const server = getServer();

beforeAll(async () => {
  await server.ready();
});

describe("Status of server", () => {
  it("Should return status 200", async () => {
    const response = await request(server.server)
      .get("/healthcheck")
      .expect(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
