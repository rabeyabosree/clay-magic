// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const Activity = require('../models/activityModel');
const verifyToken = require('../middlware/verifyToken');

// Get all activities for a user
router.get('/', verifyToken, async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).send(activities);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Add a new activity
router.post('/', verifyToken, async (req, res) => {
    try {
        const { action, details } = req.body;
        const newActivity = new Activity({ userId: req.user.userId, action, details });
        await newActivity.save();
        res.status(201).send({ message: 'Activity created successfully', activity: newActivity });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Additional routes for updating and deleting activities can be added here

module.exports = router;
