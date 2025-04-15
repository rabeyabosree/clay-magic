import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../redux/reducers/userSlice";


const AccountDeletion = () => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {  loading, error } = useSelector((state) => state.user);

 
    const handleDelete = async () => {
      
        try {
            const resultAction = await dispatch(deleteAccount());
            if (resultAction) {
                alert("Account deleted successfully.");
                navigate("/login"); // Redirect user after deletion
            }
        } catch (err) {
            console.error("Error deleting account:", err);
            // Optional: Show user-friendly error message here
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Delete Account</h1>
            <p className="text-gray-600 mb-6">This action is permanent and cannot be undone.</p>

            <button
                onClick={() => setConfirmDelete(true)}
                disabled={loading}
                className={`w-full py-3 bg-red-600 text-white rounded-md shadow-md ${loading ? "opacity-50" : "hover:bg-red-700"}`}
            >
                {loading ? "Deleting..." : "Delete Account"}
            </button>

            {confirmDelete && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                    <p className="text-lg text-gray-700 mb-4">Are you sure you want to delete your account? This action is irreversible.</p>
                    <div className="flex gap-4">
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className={`py-2 px-6 bg-red-600 text-white rounded-md ${loading ? "opacity-50" : "hover:bg-red-700"}`}
                        >
                            {loading ? "Deleting..." : "Yes, delete my account"}
                        </button>
                        <button
                            onClick={() => setConfirmDelete(false)}
                            className="py-2 px-6 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {error && <p className="mt-4 text-red-600 text-center">{error.message || "An error occurred. Please try again later."}</p>}
        </div>
    );
};

export default AccountDeletion;




