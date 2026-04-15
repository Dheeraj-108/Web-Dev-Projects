import { defineConfig } from "drizzle-kit";

const drizzleDBConfig = defineConfig({
    out: "./drizzle",
    schema: "./src/models",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL
    }
})

export default drizzleDBConfig;