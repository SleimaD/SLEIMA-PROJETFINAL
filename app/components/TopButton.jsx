import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);


  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className={`fixed bottom-[6rem] right-4 p-3 px-6  rounded-full text-2xl z-50 hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    )
  );}

export default TopButton