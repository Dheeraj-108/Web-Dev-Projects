import "dotenv/config";

import express from "express";
import requestLogger from "./src/middlewares/logger.middleware.js";
import validateSession from "./src/middlewares/validateSession.middleware.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(requestLogger);
// app.use(validateSession); for session authentication

import bookRouter from "./src/routes/books.routes.js";
import authorRouter from "./src/routes/author.routes.js";
import userRouter from "./src/routes/user.routes.js";
import adminRouter from "./src/routes/admin.routes.js";

app.use("/books", bookRouter);
app.use("/author", authorRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
