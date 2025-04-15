import React from "react";
import { useNavigate } from "react-router-dom";
import luxaryImage from '../../assets/expensove.jpg'

const ExpensiveJewelryBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/expensive"); // Navigate to the expensive jewelry page
  };

  return (
    <div className="relative text-white p-8 rounded-lg shadow-xl overflow-hidden h-72">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    onClick={handleClick}
    style={{
      backgroundImage: `url(${luxaryImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover", // Ensures the background image covers the area appropriately
    }}
  ></div>

 
 
</div>

  );
};

export default ExpensiveJewelryBanner;
