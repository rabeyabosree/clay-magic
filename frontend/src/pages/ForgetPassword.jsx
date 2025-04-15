import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword} from "../redux/reducers/userSlice";

const ForgotPassword = ({ setShowForgotPassword }) => {
  const [resetEmail, setResetEmail] = useState("");
  const [message, setMessage] = useState(""); // For showing messages
  const dispatch = useDispatch();

  // Handle forgot password submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ email: resetEmail }));
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setMessage("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">reset Password</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleForgotPassword}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-3 text-center text-sm">{message}</p>}
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowForgotPassword(false)}
            className="text-red-500 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
