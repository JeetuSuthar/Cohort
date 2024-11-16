// cartTotalSelector.js
import { selector } from "recoil";
import { cartItemState } from "./cartItemState";

export const cartTotalSelector = selector({ // Ensure the key matches the filename
  key: 'cartTotalSelector', // Key should match the import name
  get: ({ get }) => {
    const cartItems = get(cartItemState);
    return cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
  },
});
