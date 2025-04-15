const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // User being notified
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },  // geting product detaile by cliked notific
  message: String,  // The notification message
  read: { type: Boolean, default: false },  // Whether the notification is read or not
  createdAt: { type: Date, default: Date.now },  // Time when the notification was created
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
