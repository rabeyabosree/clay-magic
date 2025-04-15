// models/ProfileModel.js
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, default: "" }, // URL for profile image
    about: { type: String, default: "" },
  },
  { timestamps: true } // Automatically handle createdAt and updatedAt fields
);

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile
