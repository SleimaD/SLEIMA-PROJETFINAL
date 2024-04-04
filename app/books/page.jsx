"use client"
import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSearchQuery, setSelectedGenres, sortByRating, sortByNumPages, selectAllGenres, clearSort } from '@/app/lib/features/book/bookSlice';
import { addItem, calculatePrice } from '@/app/lib/features/cart/cartSlice';
import { selectIsAuthenticated } from '@/app/lib/features/login/loginSlice';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';

const BooksPage = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const { filteredBooks, loading } = useSelector((state) => state.book);
  const allGenres = useSelector(selectAllGenres);
  const [genreQuery, setGenreQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [sortValue, setSortValue] = useState(""); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {   
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedGenres(genres));
  }, [genres, dispatch]);


  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleGenreChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setGenres((currentGenres) => 
      isChecked
        ? [...currentGenres, value]
        : currentGenres.filter((genre) => genre !== value)
    );
  };


  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortValue(sortValue);
    if (sortValue === 'rating') {
      dispatch(sortByRating());
    } else if (sortValue === 'num_pages') {
      dispatch(sortByNumPages());
    } else if (sortValue === "") {
      dispatch(clearSort())
    }  

  };  

  const filteredGenres = genreQuery
    ? allGenres.filter((genre) =>
        genre.toLowerCase().includes(genreQuery.toLowerCase())
      )
    : allGenres;

  const handleGenreSearchChange = (event) => {
    setGenreQuery(event.target.value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddToCart = (book) => {
    dispatch(addItem(book));
  };


  if (loading) return <div className='w-full h-full flex justify-center items-center'>
  <div class="flex justify-center items-center h-screen">
  <div class="animate-spin ease-linear rounded-full w-10 h-10 border-t-4 border-b-4 border-green-900 ml-3"></div> </div>
  </div>;
  
  return (
    <>        
          <Navbar/>
          <div  className={`books-page relative h-[100vh] overflow-hidden  ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className="search-header mb-5 w-full flex justify-center items-center gap-16 mt-16 max-[426px]:flex-col max-[426px]:gap-4 max-[426px]:mt-8">
            <input className={` shadow-inner p-3 px-5 w-[30%] max-[426px]:w-[70%] rounded-3xl ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`} type="text" placeholder="Search by titles and authors..." onChange={handleSearchChange} />
            <select className={`p-3 shadow-inner rounded-3xl ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`} value={sortValue}  onChange={handleSortChange}>  
              <option value="rating">Sort by Rating</option>
              <option value="num_pages">Sort by Number of Pages</option>
              <option value="">All Books</option>
            </select>
          </div>
          <button onClick={toggleSidebar} className={`absolute top-[7rem] left-9 z-30  text-[1.5rem] max-[426px]:text-[1rem] font-bold ${sidebarOpen ? 'text-red-500' : 'text-white bg-black p-2 px-3 rounded-full shadow-slate-400 shadow-lg'} `}>
            {sidebarOpen ? 'x' : 'Genres'}
          </button>
        <aside className={`genre-filter backdrop-blur-md bg-[#000000cc] top-[6rem] transform left-0 w-64 text-white p-4 transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } absolute rounded-r-2xl h-[27rem] ease-in-out transition-all duration-700 z-20`}>  
          <div className=' w-full flex justify-center items-center p-2 mb-5'>Genres</div>
          <input
              type="text"
              placeholder="Search genres..."     
              value={genreQuery}
              onChange={handleGenreSearchChange}
              className="w-full mb-8 p-1 px-4 rounded-3xl text-black"
            />

            <div className='intergenres overflow-auto h-[18rem]'>
            {filteredGenres.map((genre) => (     
            <label key={genre} className="block p-1">
              <input
                type="checkbox"
                value={genre}
                checked={genres.includes(genre)}
                onChange={handleGenreChange}
                className="mr-2"
              />
              {genre}
            </label>
          ))}

            </div>
          
        </aside>                                                                                               
      <main className="book-list flex justify-center items-center mt-[6rem]   p-2">
        <div className='container bookscontainer  rounded-xl flex flex-wrap justify-center bg-[#dedddd]  gap-[3rem] w-[95%] p-7 overflow-y-auto h-[550px]'>
        {filteredBooks.map((book) => (   
            <div key={book.id}  className={` book-item shadow-[#afaeae] shadow-xl  ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <div className='flex flex-col justify-center items-center gap-3'>
                  <div className=' w-full flex justify-end p-2'>   
                    <p className='p-2'>{` $${calculatePrice(book.rating)}`}</p>
                  </div>
                  <h3 className='text-center p-5 line-clamp-2'>{book.title}</h3>
                  <p>{book.authors}</p> 
                  <div className=' flex gap-2'>
                    {isAuthenticated && (
                      <button 
                        onClick={() => handleAddToCart(book)} 
                        className={`border-2 p-2 px-3 rounded-full ${darkMode ? 'border-black' : 'border-white'}`}
                      >
                        Add
                      </button>
                    )}
                    <button onClick={() => {router.push(`/books/${book.id}`)}} className={`border-2 p-2 px-3 rounded-full ${darkMode ? 'border-black' : 'border-white'} `}>details</button>
                  </div>

              </div>
              <div class="cover">
              <img  src={book.image_url} className=' w-[200px] h-[270px]  ' alt={book.title} />
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default BooksPage;


