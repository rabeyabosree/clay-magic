const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../middlware/generateToken")
const verifyToken = require("../middlware/verifyToken")
const crypto = require("crypto");
const isAdmin = require("../middlware/isAdmin");
const Activity = require("../models/activityModel");
const upload = require("../utilize/storage")


const router = express.Router();

const getUserStats = async (userId) => {
    // Example logic to fetch and return user statistics
    return {
        posts: 15, // Example: number of posts
        comments: 30, // Example: number of comments
        likes: 100, // Example: number of likes
    };
};
router.post("/register",  async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        // Validate required fields
        if (!userName || !email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = await User.create({
            userName: userName,
            email: email,
            password: hashPassword,
            role: role || "user", // Default role to 'user' if not provided
        })

        // Respond with success message and user info (excluding password)
        res.status(200).send({
            message: "Registration successful",
            user: {
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "Invalid email or password" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(402).send({ message: "Invalid password" });
        }
        const token = generateToken(user);

        res.cookie("auth-token", token, {
            httpOnly: true,  // Makes the cookie accessible only by the server (not by JavaScript)
            secure: process.env.NODE_ENV === "production",  // Secure cookies in production (use HTTPS)
            sameSite: "Strict",  // Restrict sending cookies in cross-site requests
            maxAge: 86400000,  // Cookie expiration time (e.g., 1 day)
        });



        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.userName,
                email: user.email,
                // Add any other user fields you need here
            },
            token: token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" });
    }
});

router.delete('/delete', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;  // The user ID from the decoded JWT token

        // Delete the user account
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Optional: Delete associated data (e.g., posts, comments)
        // await Post.deleteMany({ userId: userId });
        // await Comment.deleteMany({ userId: userId });

        return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.post("/forget-password", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Instead of sending an email, return the reset token in the response
        return res.status(200).send({
            message: "Password reset token generated successfully",
            resetToken, // Return the raw reset token for testing purposes
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { token, password } = req.body;

        // Check if token and password are provided
        if (!token || !password) {
            return res.status(400).send({ message: "Token and password are required" });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");


        // Find the user with the token and check if it's still valid
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token has not expired
        });

        if (!user) {
            return res.status(400).send({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear the reset token and expiration
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save the updated user to the database
        await user.save();

        return res.status(200).send({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" });
    }
});

router.get("/profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await User.findById( userId ).select("-password")
        if (!profile) return res.status(404).json({ error: "Profile not found" });
        res.json(profile);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
});

router.put("/profile/:userId", verifyToken, upload.single("image"), async (req, res) => {
    try {
      const userId = req.params.userId;
  
      if (req.user.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }
  
      const updates = {
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio,
      };
  
      if (req.file) {
        updates.profileImage = req.file.path;
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updates, {
        new: true,
      }).select("-password");
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user profile" });
    }
  });
  
router.get("/dashboard", verifyToken, isAdmin, async (req, res) => {
    try {
        // Fetch user-specific data, e.g., profile, recent activities, etc.
        const user = await User.findById(req.user.userId).select("-password"); // Exclude the password field

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Example of additional user-specific data you might include
        const recentActivities = await Activity.find({ userId: req.user.userId }).sort({ createdAt: -1 }).limit(10);
        const stats = await getUserStats(req.user.userId); // Assume getUserStats is a function that fetches some statistics

        return res.status(200).send({
            user,
            recentActivities,
            stats,
            message: "Dashboard data fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" });
    }
});

router.get("/auth-check", verifyToken, (req, res) => {
    try {
        // Since the token is verified by the middleware, we can send the user's info
        return res.status(200).send({
            isAuthenticated: true,
            user: req.user, // This contains the decoded token payload, typically including user ID and email
            message: "User is authenticated",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" });
    }
});



module.exports = router;