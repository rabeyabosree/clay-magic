import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { items, status, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Logic to paginate items
  const paginateItems = (items, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (status === "loading") return <p className="text-center text-gray-600">Loading products...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  const paginatedItems = paginateItems(items, currentPage, itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-4 my-2">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        {paginatedItems.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          paginatedItems.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 border"
            >
              <div className="p-1">
                <img className="rounded-lg h-[180px] w-full object-cover" src={product.imageUrl} alt={product.title} />
                <div className="place-items-center">
                  <h3 className="text-[18px] font-semibold text-gray-800 capitalize mt-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-800 text-[15px] font-semibold mt-1">Price: ${product.price}</p>
                  <Link
                    to={`/products/${product._id}`}
                    className="mt-2 my-1 block text-center bg-ButtonColor text-white py-1 px-3 rounded-3xl hover:bg-blue-600 transition-colors duration-300"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        {/* Display page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1
                ? "bg-ButtonColor text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;






