import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRandomBooks } from '@/app/lib/features/book/bookSlice';

const Carousel = () => {
  const randomBooks = useSelector(selectRandomBooks);
  const [items, setItems] = useState(randomBooks, randomBooks)
  const carouselRef = useRef(null);

  // Function to duplicate carousel items for a smooth infinite effect
  const duplicateCarouselItems = () => {
    const carousel = carouselRef.current;
    carousel.innerHTML += carousel.innerHTML; // Duplicate the inner HTML
  };

  useEffect(() => {
    duplicateCarouselItems();
  }, []);

  return (
    <div className="carousel-container">
      <div ref={carouselRef} className="carousel-track">
        {items.map((book) => ( 
          <div key={book.id} className="carousel-item" >
            <img src={book.image_url} className='w-[280px] h-[370px] max-[426px]:w-[50px] max-[426px]:h-[80px] shadow-md shadow-[#919090] ' alt={`Cover of the book ${book.title}`} />
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
