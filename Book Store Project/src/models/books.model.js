import { varchar, pgTable, text, uuid, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import authorTable from "./author.model.js";

const booksTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text(),
    author: uuid().references(() => authorTable.id).notNull()
},  (booksTable) => [
    index('title_search_index').using('gin', sql`to_tsvector('english', ${booksTable.title})`),
  ]
)

export default booksTable;