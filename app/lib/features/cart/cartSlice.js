import { createSlice } from '@reduxjs/toolkit';

// function to calculate price based on rating
export const calculatePrice = (rating) => {
  return rating * 2;   
};

const initialState = {
  items: [], //empty array for cart items
  totalPrice: 0, // total price initially at 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer for adding an item to the cart. If the item already exists, increase its quantity.
    addItem: (state, action) => {
        const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      
        if (existingIndex >= 0) {
          // If the item already exists in the cart, increase its quantity and update the total price.
          state.items[existingIndex].quantity += 1;
          state.totalPrice += state.items[existingIndex].price;
        } else {
          // If the item does not exist in the cart, add it with a quantity of 1 and calculate its price.
          const book = { ...action.payload, quantity: 1 };
          book.price = calculatePrice(book.rating);
          state.items.push(book);
          state.totalPrice += book.price;
        }
      },
    // Reducer for removing an item from the cart. This action is based on the item's ID.
    removeItem: (state, action) => {
      const bookId = action.payload;
      const bookIndex = state.items.findIndex((item) => item.id === bookId);
      if (bookIndex !== -1) {
        // If the item exists in the cart, subtract its price from the total and remove it from the cart.
        state.totalPrice -= state.items[bookIndex].price;
        state.items.splice(bookIndex, 1);
      } 
    },
     // Reducer for clearing all items from the cart, resetting the state to its initial values.
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearCart,  } = cartSlice.actions;

export default cartSlice.reducer;
