const adminMiddleware = async (req, res, next) => {
    const userRole = req.user.role;
    if (!userRole) {
        return res
            .status(400)
            .json({ success: false, message: "User must be logged in" });
    }

    if (userRole !== "ADMIN") {
        return res
            .status(400)
            .json({ success: false, message: "User must be an admin" });
    }

    next();
};

export default adminMiddleware;
