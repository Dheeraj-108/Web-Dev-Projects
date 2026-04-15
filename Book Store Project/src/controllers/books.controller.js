import db from "../db/connection.js";
import authorTable from "../models/author.model.js";
import booksTable from "../models/books.model.js";
import { eq, sql } from "drizzle-orm";

const getAllBooks = async (req, res) => {
    try {
        const search = req.query.search;

        if (search) {
            const books = await db
                .select()
                .from(booksTable)
                .where(
                    sql`to_tsvector('english', ${booksTable.title}) @@ plainto_tsquery('english', ${search})`,
                );

            return res.status(200).json({
                success: true,
                message: "Books fetched successfully",
                books,
            });
        }

        const books = await db.select().from(booksTable);
        res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            books,
        });
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch books",
            error: err.message,
        });
    }
};

const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;

        if (!bookId) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid book id" });
        }

        const fetchedData = await db
            .select()
            .from(booksTable)
            .where(eq(booksTable.id, bookId))
            .leftJoin(authorTable, eq(booksTable.author, authorTable.id));

        if (fetchedData.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Book with id ${bookId} not found`,
            });
        }

        return res.status(200).json({
            success: true,
            message: `Book with id ${bookId} fetched successfully`,
            book: fetchedData[0],
        });
    } catch (err) {
        console.error("Error fetching book:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch book",
            error: err.message,
        });
    }
};

const addBook = async (req, res) => {
    try {
        const { title, authorId } = req.body;
        const description = req.body?.description;

        if (!title || !authorId) {
            return res
                .status(400)
                .json({
                    status: false,
                    message: "Title or Author id is required",
                });
        }
        const result = await db
            .insert(booksTable)
            .values({
                title: title,
                description: description,
                author: authorId,
            })
            .returning();
        const newBook = result[0];

        return res.status(201).json({
            success: true,
            message: `Book with id ${newBook.id} created successfully`,
            book: newBook,
        });
    } catch (err) {
        console.error("Error creating book:", err);
        res.status(500).json({
            success: false,
            message: "Failed to create book",
            error: err.message,
        });
    }
};

const deleteBookById = async (req, res) => {
    try {
        const bookId = req.params.id;

        if (!bookId) {
            return res
                .status(400)
                .json({ success: false, message: `Invalid book id` });
        }

        const result = await db
            .delete(booksTable)
            .where(eq(booksTable.id, bookId))
            .returning();

        if (result.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Book not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            deletedBook: result[0],
        });
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete book",
            error: err.message,
        });
    }
};

export { getAllBooks, getBookById, addBook, deleteBookById };
