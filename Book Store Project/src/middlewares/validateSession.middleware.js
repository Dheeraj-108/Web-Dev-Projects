import userTable from "../models/user.model.js";
import sessionTable from "../models/session.model.js";
import db from "../db/connection.js";

const validateSession = async (req, _, next) => {
    const sessionId = req.headers["session-id"];

    if (!sessionId) {
        return next();
    }

    const userData = await db
        .select({
            id: sessionTable.id,
            userId: sessionTable.userId,
            username: userTable.username,
            email: userTable.email,
        })
        .from(sessionTable)
        .rightJoin(userTable, eq(userTable.id, sessionTable.userId))
        .where(eq(sessionTable.id, sessionId));

    if (!userData) {
        return next();
    }

    req.user = userData;
    next();
};

export default validateSession;
