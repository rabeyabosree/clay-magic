import React from "react";
import { useNavigate } from "react-router-dom"; 


const SaleBanner = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate("/sale"); // Redirect to the sale page
  };

  return (
    <div className="relative text-white p-8 rounded-lg shadow-xl overflow-hidden h-72">
      {/* Background Image */}
      <div className="absolute inset-0 banner-background " onClick={handleClick}></div>
    

    
    </div>
  );
};

export default SaleBanner;





