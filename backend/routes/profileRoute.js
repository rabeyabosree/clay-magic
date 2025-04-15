// routes/profileRoutes.js
const express = require("express");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const verifyToken = require("../middlware/verifyToken")
const upload = require('./../utilize/storage');

const router = express.Router();

// Create user Profile
router.put("/",verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { userId, name, email, about } = req.body;
    // Find the user by ID from the verified token
    const user = await User.findById(req.user.userId).select("-password"); // Exclude the password field
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // If image is uploaded, Cloudinary's URL will be in req.file.path
    const image = req.file.path;
    console.log('Image URL:', imageUrl);
    
    let profile = await Profile.findOne({ userId });
    if (profile) {
      // Update existing profile
      profile.name = name || user.name;
      profile.email = email || user.email;
      profile.image = image || profile.image;
      profile.about = about || profile.about;
    } else {
      // Create new profile
      profile = new Profile({ userId, name, email, image, about });
    }

    const savedProfile = await profile.save();
    res.json(savedProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Profile by UserId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await User.findById( userId ).select("-password")
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
