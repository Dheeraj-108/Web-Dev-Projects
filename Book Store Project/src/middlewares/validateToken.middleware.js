import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
    const requestHeader = req.get("Authorization");

    if (!requestHeader.startsWith("Bearer")) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid token provided" });
    }

    const token = requestHeader.split(" ")[1];

    const parsedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!parsedData) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid token recieved" });
    }

    req.user = {
        id: parsedData.id,
        username: parsedData.username,
        email: parsedData.email,
        role: parsedData.role,
    };
    next();
};

export default validateToken;
