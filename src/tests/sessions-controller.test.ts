import request from "supertest";
import { app } from "@/app.js";
import { afterAll, describe, expect, it } from "@jest/globals";
import { prisma } from "@/database/prisma.js";

describe("SessionsController", () => {
  const testUserSessionEmail = "test@session.com";

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUserSessionEmail } });
  });

  it("should authenticate and get access token", async () => {
    // cria o usuário e depois testa a session
    await request(app).post("/users").send({
      name: "Test session user",
      email: "test@session.com",
      password: "password123",
    });

    const response = await request(app).post("/sessions").send({
      email: "test@session.com",
      password: "password123",
    });
    // espera status 200
    expect(response.status).toBe(200);
    // espera um token e que esse token seja uma string
    expect(response.body.token).toEqual(expect.any(String));
  });
});
