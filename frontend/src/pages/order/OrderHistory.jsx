import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/reducers/orderSlice';
import { Link, useParams } from 'react-router-dom';

function OrderHistory() {

  const {userId} = useParams()
  const dispatch = useDispatch();

  // Select orders, status, and error from the Redux store
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId));  // Dispatch the fetchOrders action
    }
  }, [dispatch, userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Order History</h1>

      {status === 'loading' && <p className="text-gray-500">Loading...</p>}
      {status === 'failed' && <p className='text-red-600'>Error: {error}</p>}
      {status === 'succeeded' && orders.length === 0 && <p className="text-gray-500">You have no previous orders.</p>}

      {status === 'succeeded' && orders.length > 0 && (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="font-medium text-xl">Order ID: {order._id}</h2>
              <p className="text-gray-600">Status:
                <span className={order.status === 'pending' ? 'text-yellow-500' : order.status === 'canceled' ? 'text-red-500' : 'text-green-500'}>
                  {order.status}
                </span>
              </p>
              <p className="text-gray-600">Order Date: {formatDate(order.createdAt)}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Products</h3>
                <ul className="space-y-4">
                  {order.products.map((product) => (
                    <li key={product.productId._id} className="flex justify-between items-center">
                      <p>{product.productId.name}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>${product.productId.price * product.quantity}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-medium">Total Price: ${order.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/home" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
        Back to Home
      </Link>
    </div>
  );
}

export default OrderHistory;
