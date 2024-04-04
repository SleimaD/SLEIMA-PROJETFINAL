"use client"
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Navbar from "./components/Navbar";
import {Cormorant_Garamond} from "next/font/google"
import 'aos/dist/aos.css'
import Aos from "aos";
import React, { useEffect, useLayoutEffect } from 'react';
import { metadata } from "./metadata";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"]}) 



export default function RootLayout({ children }) {
  useLayoutEffect(() => {
    Aos.init(); // Initialisation d'AOS
  }, []);

  return (
    <html lang="en">
      <body className={cormorant.className}>   
      <StoreProvider>
        {children}
      </StoreProvider>
    
      </body>
    </html>
  );
}