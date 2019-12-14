const server = require("../api/server");
const db = require("../database/dbConfig");
const request = require("supertest");

describe('Test endpoint: "/api/auth"', () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  test('POST endpoint: "/register" should give status code 200 on successfull addition of user', async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "user", password: "password" });
    expect(res.status).toBe(200);
  });
});
