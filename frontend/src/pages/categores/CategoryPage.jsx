import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get category name from URL
  const { items } = useSelector((state) => state.products);
  
  // Filter products by category
  const categoryProducts = items.filter((product) => product.category === categoryName);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{categoryName} Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div key={product._id} className="p-4 bg-white rounded shadow-md">
              <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-700 mt-2">{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
