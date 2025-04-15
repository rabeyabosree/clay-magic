const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/settingModel');
const verifyToken = require('../middlware/verifyToken');
const verifyAdmin = require('../middlware/isAdmin');

// Get site settings (Admin-only)
router.get('/settings', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const settings = await SiteSettings.findOne();
        if (!settings) {
            return res.status(404).send({ message: 'Site settings not found' });
        }
        res.status(200).send({ settings, message: 'Site settings fetched successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Update site settings (Admin-only)
router.put('/settings', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { maintenanceMode, defaultLanguage, timezone, notificationsEnabled } = req.body;

        // Find the settings document and update it
        const updatedSettings = await SiteSettings.findOneAndUpdate(
            {},
            { maintenanceMode, defaultLanguage, timezone, notificationsEnabled },
            { new: true } // Return the updated document
        );

        if (!updatedSettings) {
            return res.status(404).send({ message: 'Site settings not found' });
        }

        res.status(200).send({
            updatedSettings,
            message: 'Site settings updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
