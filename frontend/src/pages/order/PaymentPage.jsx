import React from 'react'

function PaymentPage() {
    const handlePaymentSuccess = () =>{
        window.location.href = "/order-confirmation"
    }
  return (
    <div>
        <h1>paymen page</h1>
        <p>procced with payment details</p>
        <button onClick={handlePaymentSuccess}>pay now</button>
    </div>
  )
}

export default PaymentPage