import { Router } from "express";
import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    getBooksByAuthorId,
} from "../controllers/author.controller.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/", validateToken, getAllAuthors);
router.get("/:id", validateToken, getAuthorById);
router.post("/", validateToken, createAuthor);
router.get("/:id/books", validateToken, getBooksByAuthorId);

export default router;
