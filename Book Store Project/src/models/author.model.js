import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const authorTable = pgTable("authors", {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar({length: 255}).notNull(),
    lastName: varchar({length: 255}).notNull(),
    email: varchar({length: 255}).notNull().unique()
})

export default authorTable 