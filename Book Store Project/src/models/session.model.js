import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import userTable from "./user.model.js";
import { primaryKey } from "drizzle-orm/pg-core";

const sessionTable = pgTable("sessions", {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
        .references(() => userTable.id)
        .notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});

export default sessionTable;
