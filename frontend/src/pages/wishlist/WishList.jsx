import React from "react";
import { useSelector } from "react-redux";

function WishList() {
    const products = useSelector((state) => state.products?.items || []); // ✅ Ensure products is an array
    const user = useSelector((state) => state.user?.user) || JSON.parse(localStorage.getItem("user"));
console.log(user.id)
    if (!user) return <p className="text-gray-500">Please log in to see your wishlist.</p>;

    // ✅ Ensure products is defined before using filter
    const lovedProducts = products.length > 0
        ? products.filter((product) => product.lovedUsers?.includes(user.id))
        : [];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Wishlist ❤️</h1>

            {lovedProducts.length === 0 ? (
                <p className="text-gray-500">No loved products yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lovedProducts.map((product) => (
                        <div key={product._id} className="p-4 border rounded shadow-lg">
                            <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover rounded-md" />
                            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                            <p className="text-gray-600">Price: ${product.price}</p>
                            <p className="text-gray-600">Loved by {product.loveCount} users</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WishList;


