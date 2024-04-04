"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import {signOut,selectIsAuthenticated} from "@/app/lib/features/login/loginSlice"
import { addItem, removeItem, clearCart } from '@/app/lib/features/cart/cartSlice';
import { toggleDarkMode } from '@/app/lib/features/theme/themeSlice'


const Navbar = () => {   
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const darkMode = useSelector((state) => state.theme.darkMode);


  // Handlersfor dark mode toggle
  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  // Handler for authentication
  const handleLogOut = () => {
    dispatch(signOut());
    router.push('/'); 
  };

  // Handlers for cart
  const toggleCartSidebar = () => {
    if (!isAuthenticated) {
      router.push('/login'); 
    } else {
      setCartSidebarOpen(!cartSidebarOpen); // Toggle cart sidebar
    }
  };

  const handleAddToCart = (book) => {
    dispatch(addItem(book)); //add
  };
  
  const handleRemoveFromCart = (bookId) => {
    dispatch(removeItem(bookId)); //remove
  };
  
  const handleClearCart = () => {
    dispatch(clearCart()); //clear
  };

   
  return (
    <>

    <nav className={` w-full backdrop-blur-lg z-50 p-5 flex justify-between items-center border-b-2   ${darkMode ? 'bg-black text-white border-[#b8b7b7]' : 'bg-white text-black border-[#666666]'}`} >
        <Link href="/" className=' text-[1.2rem] italic font-bold tracking-wide'>E-BookShelf</Link>
        <div className='flex justify-center items-center gap-8 text-[1.1rem]'>    
          <button  className='mode-button'>
            <label  class="switch">
              <input onClick={() => dispatch(toggleDarkMode())} type="checkbox"/>
              <span class="slider"></span>
            </label>
          </button>    
          <Link className='font-bold hover:scale-105 duration-300' href="/categories">Categories</Link>
          <Link className='font-bold hover:scale-105 duration-300' href="/books">Books</Link> 
          <div>
             {/* Cart Button and Sidebar */}
            <button onClick={toggleCartSidebar} data-quantity="0" class="btn-cart">
              {/* Cart UI */}
              <svg className="icon-cart" viewBox="0 0 24.38 30.52" height="30.52" width="24.38" xmlns="http://www.w3.org/2000/svg">
                <title>icon-cart</title>
                <path transform="translate(-3.62 -0.85)" d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"></path>
              </svg>
              <span class="quantity"></span> 
            </button>
          </div>  
          {/* Login/Logout */}
          <Link href="/login">
            <Image width={22} height={50} src="/login.svg" alt="login" className='w-[22px] hover:scale-105 transition-transform duration-150 ' />
          </Link>
            {isAuthenticated && (
              <button onClick={handleLogOut}>Log Out</button>
            )}
        </div>
        <button className="burger-menu hidden md:hidden" onClick={() => setIsBurgerMenuOpen(true)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
              {/* Burger Menu Logic */}
        {isBurgerMenuOpen && (
          <div className="absolute bg-white w-[100vw] h-[500px] z-50 top-5 left-0 burger-menu-content">
            <button className='p-5 text-red-500 font-bold' onClick={() => setIsBurgerMenuOpen(false)}>X</button>
            <ul className="text-center flex flex-col gap-5">
              <li><Link className='font-bold' href="/categories">Categories</Link></li>
              <li><Link className='font-bold' href="/books">Books</Link></li>
              <li>
                <div>
                  <button onClick={toggleCartSidebar} data-quantity="0" class="btn-cart">
                    <svg className="icon-cart" viewBox="0 0 24.38 30.52" height="30.52" width="24.38" xmlns="http://www.w3.org/2000/svg">
                      <title>icon-cart</title>
                      <path transform="translate(-3.62 -0.85)" d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"></path>
                    </svg> 
                    <span class="quantity"></span>
                  </button>
                </div> 
              </li>
              <li className='flex justify-center items-center'>
                <Link href="/login">
                  <Image width={22} height={50} src="/login.svg" alt="login" className='w-[22px] text-center hover:scale-105 transition-transform duration-150 ' />
                </Link>
              </li>
              <li>
                {isAuthenticated && (
                  <button onClick={handleLogOut}>Log Out</button>
                )}   

              </li>
            </ul>
          </div>
        )}
    </nav> 
                  
      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 transform transition-transform duration-700 ease-in-out overflow-auto ${cartSidebarOpen ? 'translate-x-0' : 'translate-x-full'} bg-white shadow-xl h-full w-[450px] max-[426px]:w-[100vw] z-40`}>
          <button className=' p-5 text-red-500 font-bold' onClick={() => setCartSidebarOpen(false)}>Close</button>
          <div className='p-5 h-[35rem] overflow-auto'>
            {cartItems.length === 0 && <div>Your cart is empty.</div>}
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item bg-[#000] text-white flex items-center gap-5 mb-1 p-2">
                <img src={item.image_url} alt={item.title} className="w-16 h-24" />
                <div className='flex flex-col'>
                  <div className=' line-clamp-2'>{item.title}</div>
                  <div>x <span className='text-[1.2rem] font-mono'>{item.quantity} </span></div>
                </div>
                <div className='flex w-full flex-col-reverse justify-end items-end gap-5'>
                <div>Price: ${item.price.toFixed(2)}</div>
                <button onClick={() => handleRemoveFromCart(item.id)} className="bin-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" className="bin-top"> <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                      <line stroke-width="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line> </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" className="bin-bottom">
                      <mask fill="white" id="path-1-inside-1_8_19"> <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path></mask> <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
                      <path stroke-width="4" stroke="white" d="M12 6L12 29"></path> 
                      <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 89 80" className="garbage">
                      <path fill="white" d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L8 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 5Z"></path>
                    </svg>
                </button>
                </div>

              </div>
            ))}
        </div>
      </div> 

    </>
  )       
}

export default Navbar




