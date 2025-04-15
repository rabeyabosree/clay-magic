const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
    maintenanceMode: {
        type: Boolean,
        default: false,
    },
    defaultLanguage: {
        type: String,
        default: 'en', // Example: English as the default language
    },
    timezone: {
        type: String,
        default: 'UTC', // Example: UTC as default
    },
    notificationsEnabled: {
        type: Boolean,
        default: true, // Whether notifications are enabled
    },
}, { timestamps: true });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

module.exports = SiteSettings;
