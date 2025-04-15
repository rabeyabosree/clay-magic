const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js")
const SECRET_KEY = process.env.SECRET_KEY
/*

const verifyToken = async (req, res, next) => {
    const token = req.cookies["auth-token"] || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        req.user = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        next();
    } catch (error) {
        console.error("Token verification failed:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ message: "Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).send({ message: "Invalid token" });
        }

        return res.status(500).send({ message: "Server error" });
    }
};
*/

const verifyToken = async (req, res, next) => {
    console.log("Cookies:", req.cookies); // Log all cookies
    const token = req.cookies["auth-token"];
    if (!token) {
        return res.status(401).send({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        req.user = { userId: user.id, email: user.email, role: user.role };
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).send({ message: error.name === "TokenExpiredError" ? "Token expired" : "Invalid token" });
    }
};




module.exports =  verifyToken

