
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productsSlice';
import { Link } from 'react-router-dom';

function BogoProducts() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ filter: "bogo" }));
    }, [dispatch]);

    if (status === "loading") return <p className="text-center text-xl text-gray-600">Loading...</p>;
    if (status === "failed") return <p className="text-center text-xl text-red-500">Error: {error}</p>;

    return (
        <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200  min-h-screen py-12 px-6 sm:px-12">
            {/* Title Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Buy One, Get One Free!</h1>
                <p className="text-lg sm:text-xl text-gray-700">Exclusive offers on your favorite products</p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.map((item) => (
                    <div
                        key={item.id} // Unique key for each item
                        className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="relative">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-60 object-cover rounded-md "
                            />
                            {/* Badge for BOGO offer */}
                            <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                BOGO
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                            <p className="text-xl font-semibold text-gray-900 mt-4">{item.price}</p>
                            <Link
                                to={`/products/${item._id}`}
                                className="my-6 block w-full text-center bg-ButtonColor text-white py-2 px-4 rounded-3xl shadow-md hover:bg-blue-700 transition duration-300"
                            >
                                Order Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BogoProducts;

/**
 * import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productsSlice';
import { Link } from 'react-router-dom';

function BogoProducts() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ filter: "bogo" }));
    }, [dispatch]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;


    return (
        <div>
            <h1>Bogo Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id} // Add a unique key for each item
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transform transition hover:scale-105"
                    >
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <img src={item.imageUrl} alt="" />
                        <p>{item.description}</p>
                        <p className="text-gray-600 mt-2">{item.price}</p>
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

export default BogoProducts;
 */

