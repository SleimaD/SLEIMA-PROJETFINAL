"use client"
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from "@/app/lib/features/book/bookSlice"
import Navbar from '@/app/components/Navbar'
import Link from 'next/link'

const Page = ({params:{id}}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);



    const book = useSelector(state =>
        state.book.books.find(book => book.id === parseInt(id))
    );

    useEffect(() => { 
        if(id) {
          dispatch(fetchBooks());
        } 
      }, [id,dispatch]);
    

    
    if (!book) {
    return <div>Loading...</div>;
    }
    


  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <Navbar/>
        <div className={`p-5 relative w-full h-[100vh] ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <Link href="/books" className='absolute top-[10%] bg-black text-white px-4 p-2 rounded-full shadow-[#666] shadow-lg'>Go Back</Link>
            <div className='w-full flex justify-evenly mt-[5rem] gap-5'>
                <div className=' '>
                    <img src={book.image_url} className='w-[400px] h-[450px] shadow-[#717070] shadow-lg' alt={book.title} />
                </div>
                <div className='flex flex-col gap-5'>
                    <div>
                        <h1 className='text-[2.4rem] text-center'>{book.title}</h1>
                        <p className='text-[1.5rem] text-center'>{book.authors}</p>
                    </div>
                    <div className={`backdrop-blur-lg  w-[40rem] h-[20rem] rounded-2xl p-5 overflow-auto border-[#8f8f8f] border-4 ${darkMode ? 'bg-white text-black' : 'bg-[#000000ec] text-white'}`}>
                        <p className=''>{book.description}</p>
                    </div>
                    <div>
                        <div>Genres: <br /> <p className='text-[01rem]'>{book.genres}</p></div>
                    </div>
                </div> 
            </div>
            <div className={`w-[100vw]  ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className=' w-full flex justify-center items-center text-[1.5rem] mt-[6rem] mb-4 underline underline-offset-2'>Some Quotes</div>
                <div className='p-5'>
                    <div className=' flex justify-start items-center p-5'>
                        <div className={`border-2  w-[20rem] h-[5rem] flex justify-center items-center p-5 mx-[10rem] ${darkMode ? 'border-white' : 'border-black'}`} >
                            {book.Quote1}
                        </div>
                    </div>
                    <div className=' flex justify-center items-center p-5'>
                        <div className={`border-2 border-black w-[20rem] h-[5rem] flex justify-center items-center p-5 mr-[3rem] ${darkMode ? 'border-white' : 'border-black'}`} >
                            {book.Quote2}
                        </div>
                    </div>
                    <div className=' flex justify-end items-end p-5'>
                        <div className={`border-2 border-black w-[20rem] h-[5rem] flex justify-center items-center p-5 mr-[11rem] mt-[-1rem] ${darkMode ? 'border-white' : 'border-black'}`} >
                            {book.Quote3}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Page 