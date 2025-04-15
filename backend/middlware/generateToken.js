const jwt = require("jsonwebtoken");

// Ensure SECRET_KEY is defined in environment variables
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY environment variable is not set.");
}

const generateToken = (user) => {
  if (!user || !user._id || !user.email) {
    throw new Error("Invalid user data. User must have _id and email.");
  }

  const payload = {
    userId: user._id, // Unique identifier for the user
    email: user.email, // User's email, if needed in the payload
  };

  try {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10d" });
    return token;
  } catch (error) {
    console.error("Error generating token: ", error);
    throw new Error("Error generating token.");
  }
};

module.exports = generateToken;
