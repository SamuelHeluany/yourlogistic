import { app } from "@/app.js";
import { prisma } from "@/database/prisma.js";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";

describe("UsersController", () => {
  const testEmail = "testuser@teste.com";
  // caso exista o teste de um teste anterior, deleta por email
  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } });
  });

  // depois do teste, deleta o user criado
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } });
  });

  it("should create a new user sucessfully", async () => {
    const response = await request(app).post("/users").send({
      name: "Test user",
      email: "testuser@teste.com",
      password: "testpassword123",
    });
    // expera o status da resposta sendo 201 que é o status passado quando cria usuário com sucesso
    expect(response.status).toBe(201);
    // Valida se tem a propriedade id
    expect(response.body).toHaveProperty("id");
    //verifica se realmente o nome do usuario criado é o que foi pre definido na response
    expect(response.body.name).toBe("Test user");
  });

  it("should throw an error if user with same email already exists", async () => {
    const response = await request(app).post("/users").send({
      name: "Duplicate users",
      email: "testuser@teste.com",
      password: "testpassword123",
    });
    // expera o status 400
    expect(response.status).toBe(400);
    // espera a mensagem de erro: "User email already exists, please provide a valid one."
    expect(response.body.message).toBe("User email already exists, please provide a valid one.");
  });
});
