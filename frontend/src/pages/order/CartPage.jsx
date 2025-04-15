import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/reducers/cartslice";

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 0) return; // Prevent negative values
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity: quantity - 1 }));
    }
  };

  const handleIncreaseQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity: quantity + 1 }));
  };

  const handlePaymentProcessed = () => {
    window.location.href = "/payment";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          <ul className="space-y-4">
            {cart.map((product) => (
              <li
                key={`${product._id}-${product.quantity}`} // Use product._id and quantity together for a unique key
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-lg">{product.title}</p>
                    <p className="text-gray-500">Price: ${product.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(product._id, product.quantity)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                    min="0"
                    className="w-12 text-center p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => handleIncreaseQuantity(product._id, product.quantity)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(product._id))}
                    className="text-red-600 hover:text-red-800 font-semibold ml-4"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="flex justify-between text-lg font-semibold">
            <p>Total:</p>
            <p>${cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handlePaymentProcessed}
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
