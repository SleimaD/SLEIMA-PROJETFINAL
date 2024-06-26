"use client"
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/app/lib/store'

const StoreProvider = ({ children }) => (
  <Provider store={store}>
    {children}  
  </Provider>
);          
 
export default StoreProvider;
