import React from 'react';
import { useSelector } from 'react-redux';
import { selectTopRatedBooks } from '@/app/lib/features/book/bookSlice';
import Link from 'next/link';

const Trending = () => {
  const topRatedBooks = useSelector(selectTopRatedBooks);

  return (
    <div className='w-full ' data-aos="fade-right" data-aos-duration="1500">
      <div className=' w-full flex justify-center items-center p-5'>
        <h2 className=' mt-10 text-[2.5rem] uppercase font-bold'>Trending Books</h2>
      </div>
      <div className=' w-full  flex justify-center items-center gap-[15rem] max-[1025px]:flex max-[1025px]:gap-[7rem] max-[769px]:gap-[3rem] max-[426px]:flex-col max-[426px]:gap-[1rem] '>
        {topRatedBooks.map((book) => (
            <div key={book.id} className='mb-[6rem] max-[426px]:mb-0'>
            {/* <h3>{book.title}</h3>
            <p>Rating: {book.rating}</p> */}
            <img src={book.image_url} className='w-[250px] h-[350px] mt-[7rem] max-[426px]:mt-0 mb-5  shadow-lg shadow-[#4d4c4c] max-[1025px]:w-[230px] max-[1025px]:h-[300px] max-[769px]:w-[200px] max-[769px]:h-[290px] max-[426px]:w-[190px] max-[426px]:h-[210px] ' alt="" />
            <p className=' flex justify-center items-center font-bold'><span className='text-yellow-300 text-[1.2rem]'>&#9733;</span> {book.rating}</p>
            </div> 
        ))}                                                                                            
      </div>                                                          
      <div className=' w-full flex justify-center items-center '>
        <Link href="/books"><button className='text-[1.3rem] mb-[7rem] font-bold hover:text-[#804d9f]'>Discover All our Books &rarr;</button></Link>
      </div>
    </div>
  );
};

export default Trending;
