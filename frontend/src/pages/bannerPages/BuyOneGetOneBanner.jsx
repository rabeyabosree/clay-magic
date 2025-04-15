import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import newBanner from "../../assets/bogo 2.webp"

const BuyOneGetOneBanner = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    navigate("/bogo"); // Navigate to the BOGO page
  };

  return (
    <div className="relative text-white p-8 rounded-lg shadow-xl overflow-hidden h-72">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover object-cover bg-center "
      style={{
        backgroundImage: `url(${newBanner})`, // Correctly use template literals
      }}
    ></div>
    

  
  </div>
  );
};

export default BuyOneGetOneBanner;
