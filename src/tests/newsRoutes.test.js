const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../server");
const News = require("../models/News");

let mongoServer;

beforeAll(async () => {
  // Fechar conexão com o banco real (se estiver aberta)
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }

  // Criar um banco temporário em memória
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Criar uma notícia antes de cada teste
  await News.create({
    title: "Notícia Teste",
    description: "Descrição Teste",
    content: "Conteúdo Teste",
    category: "Tecnologia",
    imageUrl: "http://example.com/image.jpg",
  });
});

afterEach(async () => {
  // Limpar as notícias após cada teste
  await News.deleteMany();
});

describe("Testes das Rotas de Notícias", () => {
  it("Deve criar uma nova notícia", async () => {
    const res = await request(app).post("/news").send({
      title: "Nova Notícia",
      description: "Nova Descrição",
      content: "Novo Conteúdo",
      category: "Ciência",
      imageUrl: "http://example.com/new.jpg",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Nova Notícia");
  });

  it("Não deve criar uma notícia sem título", async () => {
    const res = await request(app).post("/news").send({
      description: "Descrição sem título",
      content: "Conteúdo sem título",
      category: "Erro",
    });

    expect(res.statusCode).toBe(500);
  });

  it("Deve buscar todas as notícias", async () => {
    const res = await request(app).get("/news");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve buscar uma notícia pelo ID", async () => {
    const noticia = await News.findOne();
    const res = await request(app).get(`/news/${noticia._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(noticia._id.toString());
  });

  it("Não deve encontrar uma notícia com ID inválido", async () => {
    const res = await request(app).get("/news/invalidID");
    expect(res.statusCode).toBe(500);
  });

  it("Deve atualizar uma notícia", async () => {
    const noticia = await News.findOne();
    const res = await request(app).put(`/news/${noticia._id}`).send({
      title: "Título Atualizado",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Título Atualizado");
  });

  it("Não deve atualizar uma notícia que não existe", async () => {
    const res = await request(app).put("/news/65f4a9c70fa3d91234567890").send({
      title: "Teste",
    });

    expect(res.statusCode).toBe(404);
  });

  it("Deve deletar uma notícia", async () => {
    const noticia = await News.findOne();
    const res = await request(app).delete(`/news/${noticia._id}`);
    expect(res.statusCode).toBe(200);
  });

  it("Não deve deletar uma notícia inexistente", async () => {
    const res = await request(app).delete("/news/65f4a9c70fa3d91234567890");
    expect(res.statusCode).toBe(404);
  });
});
