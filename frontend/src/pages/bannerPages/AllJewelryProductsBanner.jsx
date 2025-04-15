import React from "react";
import { useNavigate } from "react-router-dom";
import bannerImage from "../../assets/2025.webp";

const AllJewelryProductsBanner = () => {
  const navigate = useNavigate();  // Fixed typo: 'bavigate' to 'navigate'

  const handleClick = () => {
    navigate("/products");
  };

  return (
    <div className="relative text-white p-8 rounded-lg w-full shadow-xl overflow-hidden h-72">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center "
        onClick={handleClick}
        style={{
          backgroundImage: `url(${bannerImage})`, // Correctly use template literals
        }}
      ></div>
    
     
    </div>
  );
};

export default AllJewelryProductsBanner;

