// models/Activity.js
const mongoose = require('mongoose');

// Define the Activity schema
const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Activity model
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
