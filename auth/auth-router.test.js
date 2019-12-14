const server = require("../api/server");
const db = require("../database/dbConfig");
const request = require("supertest");

describe('Test endpoint: "/api/auth"', () => {
  afterAll(async () => {
    await db("users").truncate();
  });

  test('POST endpoint: "/register" should give status code 200 on successfull addition of user', async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "user", password: "password" });
    expect(res.status).toBe(200);
  });

  test('POST endpoint: "/register" should give status code 500 when username already exists in db', async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "newUser", password: "password" });
    expect(res.type).toBe("application/json");
  });

  test('POST endpoint: "/login" should give status code 200 on successfull login for user', async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "user", password: "password" });
    expect(res.status).toBe(200);
  });

  test('POST endpoint: "/login" should give token on successful login', async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "user", password: "password" });
    expect(res.body.token).toBeDefined();
  });
});
