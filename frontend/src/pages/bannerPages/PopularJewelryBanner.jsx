import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../../assets/bestproduct.webp"; // Your background image

function PopularJewelryBanner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/bestsale"); // Navigate to the best sale page
  };

  return (
    <div className="relative text-white p-8 rounded-lg shadow-xl overflow-hidden h-72">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: `url(${bgImage})`, // Correctly use template literals
        }}
      ></div>
    
     

    </div>
  );
}

export default PopularJewelryBanner;

