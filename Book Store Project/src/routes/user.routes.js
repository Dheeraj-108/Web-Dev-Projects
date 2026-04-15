import Router from "express";
import {
    getLoggedUser,
    registerUser,
    loginUser,
} from "../controllers/user.controller.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/", validateToken, getLoggedUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
