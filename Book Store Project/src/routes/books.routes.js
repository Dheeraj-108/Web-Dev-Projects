import { Router } from "express";
import {
    getAllBooks,
    getBookById,
    addBook,
    deleteBookById,
} from "../controllers/books.controller.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/", validateToken, getAllBooks);

router.get("/:id", validateToken, getBookById);

router.post("/", validateToken, addBook);

router.delete("/:id", validateToken, deleteBookById);

export default router;
