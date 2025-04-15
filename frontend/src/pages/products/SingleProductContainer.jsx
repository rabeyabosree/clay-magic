import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleProductPage from "./SingleProductPage";

const SingleProductContainer = () => {
  const { id } = useParams(); // Get product ID from URL
  const product = useSelector((state) =>
    state.products.items.find((item) => item._id === id) // Compare as strings
  );
  
  console.log('Product ID from URL:', id);
  if (!product) {
    return <p className="text-red-500">Product not found.</p>;
  }

  return <SingleProductPage product={product} />;
};

export default SingleProductContainer;
