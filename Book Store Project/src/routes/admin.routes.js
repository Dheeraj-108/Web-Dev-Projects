import { Router } from "express";
const router = Router();

import db from "../db/connection.js";
import userTable from "../models/user.model.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

router.get("/users", validateToken, adminMiddleware, async (req, res) => {
    const allUsers = await db.select().from(userTable);

    return res.status(200).json({
        success: true,
        message: "All users fetched successfully",
        users: allUsers,
    });
});

export default router;
