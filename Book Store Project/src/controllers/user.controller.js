import db from "../db/connection.js";
import userTable from "../models/user.model.js";
import sessionTable from "../models/session.model.js";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const getLoggedUser = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res
            .status(400)
            .json({ success: false, message: "User is not logged in" });
    }

    res.status(200).json({
        success: true,
        message: "User verified successfully",
        loggedUser: user,
    });
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const [existingUser] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));

    if (existingUser) {
        return res
            .status(400)
            .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db
        .insert(userTable)
        .values({
            username: username,
            email: email,
            password: hashedPassword,
        })
        .returning({ id: userTable.id, username: userTable.username });

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        newUser,
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const [existingUser] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));

    if (!existingUser) {
        return res
            .status(404)
            .json({ success: false, message: "User doesn't exists" });
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password,
    );
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid user credentials" });
    }

    // const session = await db
    //     .insert(sessionTable)
    //     .values({ userId: existingUser.id })
    //     .returning({ id: sessionTable.id });

    // const sessionId = session[0].id;
    // req.headers["session-id"] = sessionId;

    const token = jwt.sign(
        {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1hr" },
    );

    req.headers["authorization"] = `Bearer ${token}`;

    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
    });
};

export { getLoggedUser, registerUser, loginUser };
