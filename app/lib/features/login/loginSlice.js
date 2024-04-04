"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false,
    loading: false,
    cart: [],
    welcomeMessage:"",  
  },
  reducers: {
    authenticate: (state, { payload }) => {    
      state.isAuthenticated = true;
      state.welcomeMessage = `Welcome ${payload.email}!`;
    },
    signOut: (state) => {
      state.isAuthenticated = false; 
      state.cart = []; // Clear the cart on sign out
      state.welcomeMessage = '';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addToCart: (state, { payload }) => {
      if (state.isAuthenticated) {
        state.cart.push(payload);
      } else {
        alert('You need to log in to add items to the cart.');
      }
    },
    removeFromCart: (state, action) => {
      if (!state.isAuthenticated) {
        console.error('You must be logged in to remove items from the cart');
        return;
      }
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
  },
});

// Thunk functions to simulate async operations
export const logIn = (email, password) => (dispatch) => {
  dispatch(setLoading(true));
  // Simulate an async login operation with a timeout
  setTimeout(() => {
    dispatch(authenticate());
    dispatch(setLoading(false));
  }, 1000);
};

export const signUp = (name, email, password) => (dispatch) => {
  dispatch(setLoading(true));
  // Simulate an async signup operation with a timeout
  setTimeout(() => {
    dispatch(authenticate());
    dispatch(setLoading(false));
  }, 1000);
};

export const { authenticate, signOut, setLoading, addToCart, removeFromCart,welcomeMessage } = loginSlice.actions;

export const selectIsAuthenticated = (state) => state.login.isAuthenticated;
export const selectIsLoading = (state) => state.login.loading;
export const selectCart = (state) => state.login.cart;

export default loginSlice.reducer;
