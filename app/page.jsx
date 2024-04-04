"use client"
import Image from "next/image";       
import Trending from "./components/Trending";
import { fetchBooks } from "./lib/features/book/bookSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Carousel from "./components/Carousel";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import TopButton from "./components/TopButton";
import Footer from "./components/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);


  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);


  return (
    <div className="relative w-full overflow-hidden">    
      <Navbar/>
      <header>
        <div className=" text-white text-center w-full h-full flex justify-center items-center text-[4rem] uppercase max-[426px]:text-[2.2rem]">
          Welcome  to <br /> the <br /> Modern BookShelf
        </div>
      </header>                                                          
      <section className={`trend w-full h-[800px] max-[426px]:h-[1550px] flex justify-center items-center ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <Trending/>
      </section>  
      <section className={` w-full carouselcontainer ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>                         
        <Carousel/>                                                    
      </section>  
      <TopButton/>
      <Footer/>
    </div>                                
  );                                                
}               
                                          

                          


                    