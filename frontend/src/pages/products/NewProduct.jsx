import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/reducers/productsSlice";
import { Link } from "react-router-dom";

function NewProduct() {
  const dispatch = useDispatch();
  const { items, status, error, totalCount } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Adjust the number of products per page

  useEffect(() => {
    dispatch(fetchProducts({ filter: "new", page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage]);

  if (status === "loading") return <p className="text-center text-gray-500">Loading...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  const totalPages = Math.ceil(totalCount / productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-2 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">New Arrivals</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white border w-44 border-gray-200 rounded-lg shadow-lg p-1 hover:shadow-2xl transform transition duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-1"
              />
              {/* Badge for New */}
              <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                New
              </div>
            </div>

            <h2 className="text-[16px] font-semibold text-gray-900 ">{item.title}</h2>
            <p className="text-pink-600 font-bold text-x ">${item.price}</p>
            
            {/* Order Button */}
            <Link
              to={`/products/${item._id}`}
              className="block text-center bg-ButtonColor text-white py-1 px-1 mb-2 rounded-lg hover:bg-blue-700 transform transition duration-300"
            >
              Order Now
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Previous
        </button>
        <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NewProduct;


