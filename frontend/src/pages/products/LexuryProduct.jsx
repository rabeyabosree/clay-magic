import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productsSlice';
import { Link } from 'react-router-dom';

function LuxuryProduct() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ filter: "expensive" }));
    }, [dispatch]);

    if (status === "loading") return <div className="spinner">Loading...</div>;  // Consider using a spinner or skeleton loader
    if (status === "failed") return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Luxury Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 p-5"
                    >
                        <div className="aspect-w-16 aspect-h-9 mb-4 relative overflow-hidden rounded-lg">
                            <img 
                                src={item.imageUrl} // Fallback image
                                alt={item.title}
                                className="w-full h-60 object-cover"
                            />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
                        <p className="text-sm text-gray-500 truncate">{item.description}</p>
                        <p className="text-xl font-bold text-gray-900 mt-2">${item.price}</p>
                        <Link
                            to={`/products/${item._id}`}
                            className="mt-4 block text-center bg-ButtonColor text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
                        >
                            Order Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LuxuryProduct;

