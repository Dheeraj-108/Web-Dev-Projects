import authorTable from "../models/author.model.js";
import booksTable from "../models/books.model.js";
import db from "../db/connection.js";
import { eq } from "drizzle-orm";

const getAllAuthors = async(_, res) => {
    const authors = await db.select().from(authorTable);

    return res.status(200).json({success: true, message: "Authors fetched successfully", authors});
}

const getAuthorById = async(req, res) => {
    const authorId = req.params.id;

    const author = await db.select().from(authorTable).where(eq(authorTable.id, authorId));

    return res.status(200).json({success: true, message: "Author fetched successfully", author});
}

const createAuthor = async(req, res) => {
    const {firstName, lastName, email} = req.body;

    if(!firstName || !email) {
        return res.status(400).json({success: false, message: "firstName or email is mandatory"});
    }

    const newAuthor = await db.insert(authorTable).values({firstName: firstName, lastName: lastName, email: email}).returning();

    return res.status(201).json({success: true, message: "Author created successfully", newAuthor});
}

const getBooksByAuthorId = async(req, res) => {
    const authorId = req.params.id;

    const authorBooks = await db.select().from(booksTable).where(eq(booksTable.author, authorId));

    return res.status(200).json({success: true, message: "Retrieved all books with author", authorBooks});
}

export {getAllAuthors, getAuthorById, getBooksByAuthorId, createAuthor}
