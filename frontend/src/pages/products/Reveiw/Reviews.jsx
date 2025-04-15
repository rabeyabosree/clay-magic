import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm'; // Assuming you have this component for the review form.
import { deleteReview } from '../../../redux/reducers/productsSlice';
import { toast } from 'react-toastify';

function Reviews() {
  const { id } = useParams();  // Get the product ID from the URL
  const { items } = useSelector((state) => state.products);  // Assuming items contain the product data
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the product by its ID from Redux store
    const foundProduct = items.find((item) => item._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id, items]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found!</p>;
  }
const dispatch = useDispatch()
  const handleDelete = (reviewId) => {
    dispatch(deleteReview({ id, reviewId }))
      .unwrap()
      .then(() => {
        toast.success("Review deleted successfully!");
      })
      .catch((err) => {
        toast.error(err || "Failed to delete review");
      });
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews for {product.title}</h2>

      {/* Check if reviews exist */}
      {product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg mb-6 transition transform hover:scale-105 hover:shadow-xl">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{/* User Icon */}</span>
              </div>
              <p className="font-semibold text-lg text-gray-800">{review.user}</p>
            </div>

            {/* Rating */}
            <div className="flex mb-2 text-yellow-500">
              {Array.from({ length: review.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-gray-700">{review.comment}</p>

            {/* Delete Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDelete(review._id)}
                className="text-red-500 font-semibold hover:text-red-700 transition duration-300"
              >
                Delete Review
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
      )}

      {/* Review Form */}
      {/* Assuming `product._id` is the correct id of the product */}
      <ReviewForm id={product._id} />
    </div>
  );
}

export default Reviews;


