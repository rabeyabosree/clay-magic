import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productsSlice';
import { Link } from 'react-router-dom';


function SalesProduct() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ filter: 'sales' })); // Ensure filter matches backend
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sale Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={item.id || item._id || index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <img src={item.imageUrl} alt="" />
            <p className="text-gray-600 text-sm mt-2">{item.description}</p>
            <p className="text-pink-500 font-bold mt-4">${item.price}</p>
            <Link
              to={`/products/${item._id}`}
              className="mt-4 block text-center bg-ButtonColor text-white py-2 px-4 rounded-3xl hover:bg-blue-600 transition-colors duration-300"
            >
              Order Now
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}

export default SalesProduct;
