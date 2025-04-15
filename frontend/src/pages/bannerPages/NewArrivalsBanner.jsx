import React from "react";
import { useNavigate } from "react-router-dom";
import newBanner from "../../assets/new arrivals.avif";

const NewArrivalsBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/new-products");
  };

  return (
    <div className="relative text-white p-8 rounded-lg shadow-xl overflow-hidden h-72">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 "
        onClick={handleClick}
        style={{
          backgroundImage: `url(${newBanner})`, // Correctly use template literals
        }}
      ></div>
    

     
    </div>
  );
};

export default NewArrivalsBanner;

