# 💼 FIAP News - Backend

Este é o backend do **FIAP News**, uma API REST desenvolvida em **Node.js** e **MongoDB** para gerenciar notícias de tecnologia.

## 🚀 Funcionalidades

- Criar, buscar, atualizar e deletar notícias.
- Banco de dados NoSQL utilizando **MongoDB**.
- API estruturada com **Express** e separação de responsabilidades (**Controllers, Models, Routes**).
- **Testes automatizados** com Jest e Supertest.
- **Banco de dados em memória** para testes isolados.

---

## 📌 Requisitos

Antes de rodar o projeto, instale:

- **Node.js** (Versão 18+)
- **MongoDB** (Local ou MongoDB Atlas)
- **Git** (Para clonar o repositório)

---

## 🔧 Instalação

Clone o repositório e instale as dependências:

```sh
git clone https://github.com/BrunoWAS/fiap-news-backend.git
cd fiap-news-backend
npm install
```

---

## ⚙️ Configuração

Crie um arquivo **`.env`** na raiz do projeto e adicione:

```sh
PORT=5000
MONGO_URI=mongodb://localhost:27017/fiapnews
```

Se estiver usando **MongoDB Atlas**, substitua `MONGO_URI` pela sua string de conexão.

---

## ▶️ Rodando o Projeto

Para rodar o backend em modo de desenvolvimento:

```sh
npm run dev
```

A API estará disponível em **http://localhost:5000**.

---

## 🧪 Testes

O projeto possui testes automatizados utilizando **Jest** e **Supertest**.

Para rodar os testes:

```sh
npm test
```

---

## 📌 Rotas da API

### 🔹 Criar uma notícia
```http
POST /news
```
**Body (JSON):**
```json
{
  "title": "Nova tecnologia",
  "description": "Descrição breve",
  "content": "Conteúdo completo",
  "category": "Tech",
  "imageUrl": "https://example.com/image.jpg"
}
```

---

### 🔹 Listar todas as notícias
```http
GET /news
```

---

### 🔹 Buscar uma notícia pelo ID
```http
GET /news/:id
```

---

### 🔹 Atualizar uma notícia
```http
PUT /news/:id
```
**Body (JSON):**
```json
{
  "title": "Título atualizado"
}
```

---

### 🔹 Deletar uma notícia
```http
DELETE /news/:id
```

---

## 🛠 Tecnologias Utilizadas

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Jest** + **Supertest** (Testes)
- **Docker** (Opcional, para rodar MongoDB)

