// Navbar.jsx
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartTotalSelector } from '../store/cartTotalSelector'; // Import from the correct file

function Navbar() {
  const cartItemCount = useRecoilValue(cartTotalSelector); // Fetch the cart item count dynamically

  return (
    <div className="flex justify-between items-center p-5 bg-gray-800 text-white">
      <div className="text-xl font-bold">
        <Link to="/" className="text-3xl cursor-pointer">amazon.in</Link>
      </div>

      <ul className="flex space-x-4 items-center justify-center">
        <Link to="/" className="cursor-pointer text-xl">Hello User</Link>

        <Link to="/cart" className="relative cursor-pointer text-xl">
          <FaShoppingCart />
          {cartItemCount > 0 && (
            <span className="fixed top-2 right-3 bg-red-600 text-white rounded-full text-xs p-1">
              {cartItemCount}
            </span>
          )}
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
