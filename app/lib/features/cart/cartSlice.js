import { createSlice } from '@reduxjs/toolkit';

// function to calculate price based on rating
export const calculatePrice = (rating) => {
  return rating * 2;   
};

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      
        if (existingIndex >= 0) {
          state.items[existingIndex].quantity += 1;
          state.totalPrice += state.items[existingIndex].price;
        } else {
          const book = { ...action.payload, quantity: 1 };
          book.price = calculatePrice(book.rating);
          state.items.push(book);
          state.totalPrice += book.price;
        }
      },
    removeItem: (state, action) => {
      const bookId = action.payload;
      const bookIndex = state.items.findIndex((item) => item.id === bookId);
      if (bookIndex !== -1) {
        state.totalPrice -= state.items[bookIndex].price;
        state.items.splice(bookIndex, 1);
      } 
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearCart,  } = cartSlice.actions;

export default cartSlice.reducer;
