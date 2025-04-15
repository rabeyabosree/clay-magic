
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FilteredProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load filtered products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('filteredProducts')) || [];
    setProducts(storedProducts);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Filtered Products</h2>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="p-4 border rounded-lg shadow">
              <img src={product.imageUrl} alt="" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-blue-500 font-bold">${product.price}</p>
              <button>Add To Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found</p>
      )}

      {/* ✅ Button to go back to search */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        Go Back
      </button>
    </div>
  );
}

export default FilteredProducts;

/**
 * import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilteredProducts() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // ✅ Extract search query and category from URL
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search') || '';
    const category = params.get('category') || '';

    // ✅ Get filtered products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('filteredProducts')) || [];
    setProducts(storedProducts);
  }, [location.search]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">{products.category}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="p-4 border rounded-lg shadow">
              <img src={product.imageUrl} alt="" />
              <h3 className="font-semibold">{product.title}</h3>
              <p>{product.description}</p>
              <p className="text-gray-600">Price: {product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
  export default FilteredProducts;

 */





