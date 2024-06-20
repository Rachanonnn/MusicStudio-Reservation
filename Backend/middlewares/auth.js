exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();

    } catch (error) {
        res.Status(500).json({ success: false, message: error.message });
    }
}