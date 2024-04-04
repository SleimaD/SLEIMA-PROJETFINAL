"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false, // state to check if the user is authenticated.
    loading: false, // state to show loading state, for async operations.
    cart: [],   //  array to store items.
    welcomeMessage:"",  
  },
  reducers: {
    // Action to set the user as authenticated and set a welcome message.
    authenticate: (state, { payload }) => {    
      state.isAuthenticated = true;
      state.welcomeMessage = `Welcome ${payload.email}!`;
    },
    // Action to reset the state to initial values when the user signs out.
    signOut: (state) => {
      state.isAuthenticated = false; 
      state.cart = []; // Clear the cart on sign out
      state.welcomeMessage = '';
    },
     // Action to toggle the loading state, useful for showing a loader during async operations.
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
     // Action to add an item to the cart if the user is authenticated.
    addToCart: (state, { payload }) => {
      if (state.isAuthenticated) {
        state.cart.push(payload);
      } else {
        alert('You need to log in to add items to the cart.');
      }
    },
     // Action to remove an item from the cart by filtering out the item by its id.
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
    //dispatch actions to manipulate the global state.
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


// Exporting the action creators to be used throughout the application.
export const { authenticate, signOut, setLoading, addToCart, removeFromCart,welcomeMessage } = loginSlice.actions;

// Selector functions to get specific parts of the state.
export const selectIsAuthenticated = (state) => state.login.isAuthenticated;
export const selectIsLoading = (state) => state.login.loading;
export const selectCart = (state) => state.login.cart;

export default loginSlice.reducer;
