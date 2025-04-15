const isAdmin = (req, res, next) => {
   
    const user = req.user;

    if (!user) {
        return res.status(401).send({ message: "Access denied, user not authenticated" });
    }

    if (user.role !== "admin") {
        return res.status(403).send({ message: "Access denied, admin role required" });
    }

    next();
};

module.exports = isAdmin;
