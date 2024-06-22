const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const token = authHeader.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
