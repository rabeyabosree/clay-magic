import React from 'react'
import { useSelector } from 'react-redux'

function OrderConfirmation() {
    const cart = useSelector((state) => state.cart);
    const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0)

    return (
        <div>
            <div>
                <h1>Order Confirmation</h1>
                <p>Your order has been successfully placed!</p>
                <h2>Order Details</h2>
                <ul>
                    {cart.map((product) => (
                        <li key={product._id}>
                            <p>Name: {product.name}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: ${product.price}</p>
                        </li>
                    ))}
                </ul>
                <h3>Total Amount: ${totalAmount}</h3>

                <button onClick={() => window.location.href = '/'}>Back to Products</button>  {/* Back to products */}
            </div>
        </div>
    )
}

export default OrderConfirmation