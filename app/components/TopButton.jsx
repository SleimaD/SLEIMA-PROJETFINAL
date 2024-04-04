import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false); // State to manage the visibility of the button. Initially, the button is not visible.
  const darkMode = useSelector((state) => state.theme.darkMode);


  // Function to toggle the visibility of the scroll-to-top button based on the page's vertical scroll position.
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll the window to the top of the page smoothly when the button is clicked.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // Effect hook to add and clean up the scroll event listener.
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