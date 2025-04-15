
  import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addReview, fetchProductDetails } from "../../../redux/reducers/productsSlice";
import { FaStar } from "react-icons/fa";


const ReviewForm = ({id}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5); // Default rating
  const [showFullForm, setShowFullForm] = useState(false); // For toggling the form visibility
  const { status } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    setShowFullForm(false); // Reset the form visibility on component mount
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      console.log("Product ID is missing!");
      return;
    }

    if (!comment.trim()) {
      toast.error("Review cannot be empty!");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }

    const reviewData = { user: user.name, comment, rating, userId: user.id };

    dispatch(addReview({ id, ...reviewData }))
      .unwrap()
      .then(() => {
        dispatch(fetchProductDetails(id)); // Refresh product after review
        toast.success("Review added successfully!");
        setComment(""); // Clear input field
        setRating(5); // Reset rating
        setShowFullForm(false); // Hide the form after submission
      })
      .catch((err) => {
        const errorMessage = err?.message || "Failed to submit review";
        toast.error(errorMessage);
      });
  };

  return (
    <div className="mt-6 p-6 bg-white border">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add a Review</h2>

      {!showFullForm ? (
        <textarea
          className="w-full p-3 border rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          rows="1"
          placeholder="Click here to write your review..."
          value={comment}
          onClick={() => setShowFullForm(true)} // Show full form when clicked
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      ) : (
        <form onSubmit={handleReviewSubmit}>
          <textarea
            className="w-full p-3 border rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <div className="flex items-center space-x-4 mb-4">
            <label className="text-gray-700 font-medium">Rating:</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <FaStar
                  key={num}
                  className={`cursor-pointer ${num <= rating ? "text-yellow-500" : "text-gray-300"}`}
                  onClick={() => setRating(num)} // Update rating when star is clicked
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;








