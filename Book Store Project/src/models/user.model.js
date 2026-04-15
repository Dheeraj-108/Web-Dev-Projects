import { uuid, varchar, text, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ADMIN", "USER"]);

const userTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar().notNull(),
    email: varchar().notNull().unique(),
    role: roleEnum().notNull().default("USER"),
    password: text().notNull(),
});

export default userTable;
