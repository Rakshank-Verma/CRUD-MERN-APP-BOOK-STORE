import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).send(books);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.findById(id);
    return res.status(200).send(books);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all these field: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all these field: title, author, publishYear",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    } else
      return res.status(200).send({ message: "Book updated", Result: result });
  } catch (error) {
    console.log(error.message);
    res.status(401).send({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    } else
      return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
