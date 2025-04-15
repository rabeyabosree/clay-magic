import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addShare, toggleLove } from "../../redux/reducers/productsSlice";
import { toast } from "react-toastify";
import { addToCart, updateQuantity } from "../../redux/reducers/cartslice";
import { Heart, SquareArrowUpRight, User } from "lucide-react";

import ProductReviews from "./Reveiw/ProductReviews";
import QuantityControl from "../order/QuantityControl";

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.items.find((item) => item._id === id));
  const user = useSelector((state) => state.user?.user) || JSON.parse(localStorage.getItem("user"));

  if (!product) {
    return <div>Product not found!</div>;
  }

  // Memoize the love status check to avoid unnecessary recalculations
  const isLoved = useMemo(() => product.lovedUsers.includes(user?.id), [product, user]);

  const handleLoveClick = () => {
    dispatch(toggleLove({ id: product._id, userId: user.id }));
  };

  const handleShareClick = () => {
    const productUrl = window.location.href;

    // Check if Clipboard API is supported
    if (navigator.clipboard) {
      navigator.clipboard.writeText(productUrl)
        .then(() => {
          toast.success("Link copied to clipboard!");
          dispatch(addShare(product._id))
            .unwrap()
            .then(() => toast.success("Share count updated!"))
            .catch((error) => toast.error(`Failed to update share count: ${error.message}`));
        })
        .catch((err) => {
          toast.error("Failed to copy the link to clipboard!");
          console.error(err);
        });
    } else {
      toast.error("Clipboard API is not supported in this browser. Please copy the URL manually.");
      console.warn("Clipboard API not supported.");
    }
  };

  const addToCartHandle = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 0) return; // Prevent negative values
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleUpdateQuantity = (productId, change) => {
    dispatch(updateQuantity({ productId, quantity: change }));
  };
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 border my-2 relative">
      <div className="flex flex-col md:flex-row items-center justify-between border gap-4 group p-4">
        <div className="p-6 md:p-8 w-full md: flex flex-col items-center md:items-start border">
          <img src={product.imageUrl} alt={product.title} className="rounded-lg w-full h-60 object-cover" />
        </div>

        <div className="p-6 md:p-8 w-full md: flex flex-col items-center md:items-start border">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">{product.title}</h1>
          <p>{product.category}</p>
          <p className="text-xl md:text-2xl font-semibold text-blue-700 mt-2 text-center md:text-left">{product.price}</p>
          <ProductReviews product={product} id={id} />
          <p className="text-gray-600 mt-4 text-base md:text-[15px] leading-relaxed text-center md:text-left">{product.description}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start">
          <QuantityControl
                  productId={product._id}
                  quantity={product.quantity}
                  onIncrease={handleUpdateQuantity}
                  onDecrease={handleUpdateQuantity}
                  onChange={handleQuantityChange}
                />
            <button
              onClick={addToCartHandle}
              className="bg-gray-700 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Add to Cart
            </button>

            <button
              onClick={handleLoveClick}
              aria-label={isLoved ? "Unfavorite" : "Favorite"}
              className={`absolute top-4 right-4 text-3xl ${isLoved ? "text-red-600" : "text-gray-400"} transition duration-300 ease-in-out`}
            >
              <Heart />
            </button>

            <button
              onClick={handleShareClick}
              className="bg-gray-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-110 w-full sm:w-auto"
            >
              <SquareArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;



{/** */}


/**
 * <div className="flex items-center justify-between gap-2">

        <div className="relative w-full">
        <img src={product.imageUrl} alt={product.title} className="rounded-lg w-full h-80 object-cover" />
        <button
          onClick={handleLoveClick}
          className={`absolute top-4 right-4 text-3xl ${isLoved ? "text-red-600" : "text-gray-400"} transition duration-300 ease-in-out`}
        >
          <Heart />
        </button>
      </div>
<div className="p-6 w-full flex flex-col items-start">
  <h1 className="text-3xl font-semibold text-gray-800">{product.title}</h1>
  <p className="text-2xl font-bold text-blue-600 mt-2">{product.price}</p>
  <p className="text-gray-700 mt-4">{product.description}</p>


  <div className="mt-6 flex space-x-4">
    <button
      onClick={addToCartHandle}
      className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Add to Cart
    </button>

    <button
      onClick={handleShareClick}
      className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition duration-300"
    >
      <FaShareAlt />
    </button>
  </div>
</div>

</div>


  <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Customer Reviews</h3>
        {user.reviews && user.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          user.reviews.map((review) => (
            <div key={review._id} className="flex items-start mb-6 border-b pb-4">
    
              <div className="flex items-center space-x-3">
                <FaUserAlt className="text-gray-600" />
                <span className="font-medium text-gray-800">{review.user}</span>
              </div>

              <div className="flex space-x-1 mt-1 ml-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <FaStar
                    key={num}
                    className={`text-yellow-500 ${num <= review.rating ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mt-2">{review.comment}</p>

              {user.id === review.userId && (
                <button
                  className="text-red-500 mt-2 ml-4"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
// 
// import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReviewForm from "./Reveiw/ReviewForm";
import { addShare, deleteReview, toggleLove } from "../../redux/reducers/productsSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/reducers/cartslice";
import Reviews from './Reveiw/Reviews';
import QuantityControl from './../order/QuantityControl';


const SingleProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const product = useSelector((state) =>
    state.products.items.find((item) => item._id === id) // Ensure ID matches
  );
  const user = useSelector((state) => state.user?.user) || JSON.parse(localStorage.getItem("user"));

  if (!product) {
    return <div>Product not found!</div>;
  }

  const isLoved = product.lovedUsers.includes(user.id); // Check if user already loved
  console.log(user.id)
  const handleLoveClick = () => {
    dispatch(toggleLove({ id: product._id, userId: user.id }));
  };
  const handleDelete = (reviewId) => {
    dispatch(deleteReview({ id, reviewId }))
      .unwrap()
      .then(() => {
        toast.success('Review deleted successfully!');
      })
      .catch((err) => {
        toast.error(err || 'Failed to delete review');
      });
  };

  const handleShareClick = async () => {
    try {
      const productUrl = window.location.href; // Get product URL
      const shareText = `Check out this amazing product: ${product.title}`;

      if (!product || !product._id) {
        throw new Error("Product ID is missing!");
      }

      if (navigator.share) {
        // ✅ Web Share API (For Mobile & Modern Browsers)
        await navigator
          .share({
            title: product.title,
            text: shareText,
            url: productUrl,
          })
          .then(() => {
            console.log("Shared successfully");
            dispatch(addShare(product._id)); // ✅ Dispatch only if share is successful
          })
          .catch((err) => console.error("Error sharing:", err));
      } else {
        // ✅ Open share options in a new tab
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareText)}`;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + productUrl)}`;

        // ✅ Copy Link Function
        const copyLink = () => {
          navigator.clipboard.writeText(productUrl);
          alert("Link copied to clipboard!");
          dispatch(addShare(product._id)); // ✅ Dispatch when user copies link
        };

        // ✅ Show Custom Share Options
        const options = [
          { name: "Facebook", url: facebookUrl, icon: "📘" },
          { name: "Twitter", url: twitterUrl, icon: "🐦" },
          { name: "WhatsApp", url: whatsappUrl, icon: "📲" },
          { name: "Copy Link", action: copyLink, icon: "🔗" },
        ];

        const selectedOption = prompt("Where do you want to share?\n1. Facebook\n2. Twitter\n3. WhatsApp\n4. Copy Link", "1");
        const option = options[selectedOption - 1];

        if (option?.url) {
          window.open(option.url, "_blank");
          dispatch(addShare(product._id)); // ✅ Dispatch when user opens a share link
        }
        if (option?.action) option.action();
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert(error.message || "Something went wrong while sharing.");
    }
  };
  const addToCartHandle = () => {
    dispatch(addToCart(product))
   navigate("/cart")
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <img src={product.imageUrl} alt="" />
      <p className="text-xl font-semibold text-blue-600 mb-4">${product.price}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <button onClick={addToCartHandle} className="text-black bg-blue-600 p-5 ">add to cart</button>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleLoveClick}
          className={`py-2 px-4 rounded-lg ${isLoved ? "bg-red-600" : "bg-gray-400"}`}
        >
          {isLoved ? "💖 Loved" : "💔 Unloved"} {product.loveCount}
        </button>

        <button
          onClick={handleShareClick}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          🔄 {product.shareCount}
        </button>


      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border p-3 rounded mt-3">
              <p className="font-bold">{review.user}</p>
              <p className="text-yellow-500 flex">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </p>
              <p>{review.comment}</p>
              <button onClick={() => handleDelete(review._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>


      <ReviewForm id={id} />
    </div>
  );
};




   <div className="p-6 mt-6 bg-gray-100">
   <a href="">reviews</a>
   <div>
     <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews</h2>

    
     {product.reviews.length > 0 ? (
       product.reviews.map((review, index) => (
         <div key={index} className="bg-white p-6 rounded-lg shadow-lg mb-6 transition transform hover:scale-105 hover:shadow-xl">
           
           <div className="flex items-center space-x-3 mb-4">
             <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
               <User className="text-white text-xl" />
             </div>
             <p className="font-semibold text-lg text-gray-800">{review.user}</p>
           </div>

       
           <div className="flex mb-2 text-yellow-500">
             {Array.from({ length: review.rating }).map((_, i) => (
               <FaStar key={i} className="text-yellow-400" />
             ))}
           </div>

        
           <p className="text-gray-700">{review.comment}</p>

        
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
   </div>


   <ReviewForm id={id} />
 </div>


export default SingleProductPage; */

