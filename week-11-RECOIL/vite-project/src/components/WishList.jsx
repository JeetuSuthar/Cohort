import React from 'react';
import { useRecoilState } from 'recoil';
import { cartItemState } from '../store/cartItemState'; // Importing the cart state atom

function WishList() {
  const [cartItems, setCartItems] = useRecoilState(cartItemState); // Recoil state for the cart
  const items = [
    {
      id: 1,
      name: "product1",
      price: "199",
      img: "https://m.media-amazon.com/images/I/61-r9zOKBCL._AC_UY327_FMwebp_QL65_.jpg"
    },
    {
      id: 2,
      name: "product2",
      price: "120000",
      img: "https://m.media-amazon.com/images/I/51ZZ0agGobL._SY675_.jpg"
    },
    {
      id: 3,
      name: "product3",
      price: "36000",
      img: "https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg"
    },
    {
      id: 4,
      name: "product4",
      price: "36000",
      img: "https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg"
    },
  ];

  // Function to handle adding items to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // If it exists, increment the quantity
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If not, add the item to the cart with a quantity of 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <div className='min-h-screen flex bg-gray-100 text-white'>
      <div className='bg-gray-800 w-1/6 p-5'>
        <h1 className='text-xl'>WishList</h1>
      </div>
      <div className='w-3/4 p-8'>
        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-8'>Your WishList</h1>
        <div className='grid grid-cols-3 gap-8 justify-center items-center text-center'>
          {items.map((item) => (
            <div key={item.id} className='bg-white flex-col rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200 items-center justify-center text-center'>
              <img src={item.img} alt={item.name} className='h-64 mx-auto' />
              <div className='p-2'>
                <h2 className='text-xl font-semibold text-gray-700'>{item.name}</h2>
                <p className='text-lg text-gray-500'>Price: {item.price} Rs</p>
                <button
                  onClick={() => addToCart(item)} // Add item to cart when clicked
                  className='bg-yellow-500 hover:bg-yellow-600 text-white px-20 py-1 rounded-lg'
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishList;
