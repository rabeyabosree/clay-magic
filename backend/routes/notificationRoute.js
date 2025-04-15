const express = require("express");
const Notification = require("../models/notificationModel");
const verifyToken = require('../middlware/verifyToken');

const router = express.Router();

// Get notifications for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Mark a notification as read
router.put("/:id/read",  async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { read: true });
    res.json({ message: "Notification marked as read" });
  } catch (err) {
    console.error("Error updating notification:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
