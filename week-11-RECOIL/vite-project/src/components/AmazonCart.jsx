import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartItemState } from '../store/cartItemState';

function AmazonCart() {
  const [cartItems, setCartItems] = useRecoilState(cartItemState);
  const [showReceipt, setShowReceipt] = useState(false);  // State to toggle receipt view

  // Function to increase the quantity of an item
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to handle purchase and show the receipt
  const handlePurchase = () => {
    setShowReceipt(true);  // Show receipt after purchase
  };

  // Calculate the total price dynamically
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="bg-gray-800 w-1/6 p-5">
        <h1 className="text-xl text-white">Amazon Cart</h1>
      </div>
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 gap-8">
          {cartItems.length === 0 ? (
            <p className="text-center text-xl">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white flex items-center justify-between rounded-lg shadow-lg p-4"
              >
                <img src={item.img} alt={item.name} className="h-32" />
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold text-gray-700">{item.name}</h2>
                  <p className="text-lg text-gray-500">Price: ₹{item.price}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-500 text-white px-4 py-1 rounded-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-500 text-white px-4 py-1 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Displaying Total Price */}
        {cartItems.length > 0 && (
          <div className="mt-8 text-right">
            <p className="text-xl font-semibold text-gray-800">Total Amount: ₹{totalPrice}</p>
          </div>
        )}

        {/* Purchase Button */}
        {cartItems.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handlePurchase}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Purchase
            </button>
          </div>
        )}

        {/* Receipt Section - Displayed after purchase */}
        {showReceipt && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Purchase Successful!</h2>
            <div className="mb-4">
              <p className="text-xl font-semibold text-gray-700">Order Summary</p>
              <table className="w-full mt-4 border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 border-b">Product</th>
                    <th className="text-left py-2 px-4 border-b">Quantity</th>
                    <th className="text-left py-2 px-4 border-b">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b">{item.quantity}</td>
                      <td className="py-2 px-4 border-b">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Display Total Price on the Receipt */}
            <div className="mt-4 text-right">
              <p className="text-xl font-semibold text-gray-800">
                Total Amount: ₹{totalPrice}
              </p>
            </div>

            <div className="mt-8 text-center">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => window.location.href = '/'}
              >
                Go to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AmazonCart;
