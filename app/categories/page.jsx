"use client"
import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {fetchBooks, selectBooksByGenre } from '@/app/lib/features/book/bookSlice';
import TopButton from '../components/TopButton';
import Footer from '../components/Footer';



const page = () => {
  const dispatch = useDispatch();
  const booksByGenre = useSelector(selectBooksByGenre); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGenres, setFilteredGenres] = useState({});
  const darkMode = useSelector((state) => state.theme.darkMode);



  useEffect(() => {
    dispatch(fetchBooks()); 
  }, [dispatch]);


  useEffect(() => {
    if (searchTerm) {
      // Filter genres based on the search 
      const filtered = Object.keys(booksByGenre)
        .filter((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase()))
        .reduce((obj, key) => {
          obj[key] = booksByGenre[key];
          return obj;
        }, {});

      setFilteredGenres(filtered);
    } else {
      // If  search empty, show all genres
      setFilteredGenres(booksByGenre);
    }
  }, [searchTerm, booksByGenre]);



  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />

      <div className={`w-full flex justify-center items-center mt-14 mb-5 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} `}>
        <input
          type="text"
          placeholder="Search by genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`p-2 px-3 shadow-inner rounded-full w-[45%] ${darkMode ? 'bg-white text-black' : 'bg-black text-white'} `}
        />
      </div>   
         
      <div className="categories-container mt-5">
        {Object.entries(filteredGenres).map(([genre, books]) => (
          <section key={genre}>
            <h2 className="genre-title mt-[4rem] text-[2rem] font-bold">{genre}</h2>
            <div className= {` scroll-container  backdrop-blur-md mt-3 `} data-aos="flip-up" data-aos-duration="1000" data-aos-easing="ease-in-sine">
              {books.map((book) => (
                <Link key={book.id} href={`/books/${book.id}`} passHref>
                  <div className="book-card ">
                    <img src={book.image_url} className='w-[270px] h-[280px] hover:scale-105 duration-700 max-[769px]:w-[200px] max-[769px]:h-[250px] max-[426px]:w-[150px] max-[426px]:h-[180px] ' alt={book.title} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      <TopButton/>
      <Footer/>
    </div>
  );}

export default page