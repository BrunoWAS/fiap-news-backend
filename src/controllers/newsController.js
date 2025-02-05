const News = require("../models/News");

// Criar uma nova notícia
const createNews = async (req, res) => {
  try {
    const { title, description, content, category, imageUrl } = req.body;
    const newNews = new News({ title, description, content, category, imageUrl });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar notícia", error });
  }
};

// Buscar todas as notícias
const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar notícias", error });
  }
};

// Buscar uma notícia por ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "Notícia não encontrada" });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar notícia", error });
  }
};

// Atualizar uma notícia
const updateNews = async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNews) return res.status(404).json({ message: "Notícia não encontrada" });

    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar notícia", error });
  }
};

// Deletar uma notícia
const deleteNews = async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ message: "Notícia não encontrada" });

    res.json({ message: "Notícia deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar notícia", error });
  }
};

// Exportar os controllers
module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews
};
