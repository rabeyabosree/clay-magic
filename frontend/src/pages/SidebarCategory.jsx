import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/reducers/productsSlice";
import { Link } from "react-router-dom"; // Import Link from React Router

const SidebarCategory = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch all products to extract categories
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (items) {
      // Extract unique categories from products
      const uniqueCategories = Array.from(
        new Set(items.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    }
  }, [items]);

  if (status === "loading") return <p>Loading categories...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="md:mr-4">
     <h2 className="text-[16px] font-bold mb-4 hidden md:block ">Categories</h2>
      {/* Responsive Categories List */}
      <ul className="md:space-y-2 flex md:flex-col flex-row gap-2 overflow-x-auto whitespace-nowrap">
        {categories.map((category) => (
          <li key={category} className="bg-white p-1 text-[14px] rounded border min-w-[95px] text-center md:text-[18px] md:p-4 ">
            <Link
              to={`/category/${category}`} // Link to category page
              className="text-gray-700 font-medium hover:text-blue-500"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarCategory;
