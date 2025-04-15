import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/reducers/productsSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PopularJewelryPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ filter: "popular" }));
  }, [dispatch]);

  if (status === "loading") return <p className="text-center text-gray-500">Loading...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-300 p-6">
      {/* Header Section */}
      <header className="p-12 text-center bg-gradient-to-r from-pink-500 to-red-500 shadow-xl rounded-b-lg">
        <h1 className="text-5xl font-extrabold text-white">Popular Jewelry</h1>
        <p className="text-lg text-white mt-2">Discover our most loved and best-selling jewelry pieces.</p>
      </header>

      {/* Popular Jewelry Grid Section */}
      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <motion.div
            key={item._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              {/* Badge for Popular */}
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Popular
              </div>
            </div>

            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <p className="font-bold text-lg text-red-500 mb-4">${item.price}</p>
              <Link
                to={`/products/${item._id}`}
                className="inline-block bg-red-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-red-600 transition-transform duration-300"
              >
                Order Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularJewelryPage;



