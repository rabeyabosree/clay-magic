import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

const ProductReviews = ({ product , id }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const navigate = useNavigate();

  // Calculate average rating
  useEffect(() => {
    if (product.reviews && product.reviews.length > 0) {
      const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(totalRating / product.reviews.length);
      setReviewCount(product.reviews.length);
    }
  }, [product.reviews]);


  return (
    <div className="p-6 mt-6 bg-gray-100">
      {/* Reviews Link with Total Count and Rating */}
      <a
        href={`/products/${id}/reviews`}
    
        className="font-semibold text-blue-500"
      >
        Reviews ({reviewCount}){" "}
        <span className="text-yellow-500 flex items-center">
          {/* Display 5-star rating with partial stars based on averageRating */}
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={`${
                index < Math.floor(averageRating)
                  ? "text-yellow-400"
                  : index < Math.ceil(averageRating)
                  ? "text-yellow-300"
                  : "text-gray-300"
              }`}
            />
          ))}
        </span>
      </a>
    </div>
  );
};

export default ProductReviews;

