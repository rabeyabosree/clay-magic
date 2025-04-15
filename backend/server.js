const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http")
const { Server } = require("socket.io")
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL



const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors:
    {
        origin: "http://localhost:5173",
        credentials: true
    }
})

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Very important for sending cookies
}));

app.use(express.json());
app.use(cookieParser());
const mongoConnection = () => {
    mongoose.connect(MONGO_URL)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("MongoDB connection error:", err));
};
mongoConnection();

const userRoute = require("./routes/userRoutes");
const activityRoutes = require('./routes/activityRoute');
const productRoute = require("./routes/productsRoute")
const adminRoute = require("./routes/adminRoute")
const profileRoute = require("./routes/profileRoute")
const orderRoute = require("./routes/orderRoute");
const notificationRoute = require("./routes/notificationRoute");

app.use("/api/users", userRoute);
app.use('/api/activities', activityRoutes);
app.use("/api/products", productRoute);
app.use("/api/admin", adminRoute);
app.use("/api/profile", profileRoute);
app.use("/api/orders", orderRoute)
app.use("/api/notifications", notificationRoute)


const multipleUsers = new Map()

io.on("connection", (socket) => {
    console.log(`user connected`, socket.id)
    socket.on("online-user", (userId) => {
        if (!multipleUsers.has(userId)) {
            multipleUsers.set(userId, new Set([socket.id]))
            console.log(`user ${userId} connected with socket id ${socket.id} `)
        }
        multipleUsers.get(userId).add(socket.id)
        console.log(`user ${userId} added socket ${socket.id}`)
    })

    socket.on("new-notification", ({ receiverId, notifications }) => {
        const soketIds = multipleUsers.get(receiverId);
        if (soketIds) {
            soketIds.forEach(id => {
                io.to(id).emit("new-notification", notifications)
                console.log(`notification sent to ${receiverId}`)
            })
        } else {
            console.log(`user ${receiverId} not online`)
        }
    })

    socket.on("disconnected", () => {
        for (let [userId, socketIds] of multipleUsers.entries()) {
            if (socketIds.has(socket.id)) {
                socketIds.delete(socket.id)
                if (socketIds.size === 0) {
                    multipleUsers.delete(userId);
                    console.log(`all tabs of user ${userId} disconnected`);
                }
                break
            }
        }
        console.log(`user disconnected`, socket.id)
    })
})

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)
})

app.get("/", (req, res) => {
    res.send("hi world")
})