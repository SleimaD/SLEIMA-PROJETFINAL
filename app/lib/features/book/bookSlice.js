import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  books: [],  // All books fetched from the API
  loading: false,
  filteredBooks: [],
  search: '',
  selectedGenres: [],           
}; 

// Create an async thunk for fetching the API data
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const response = await fetch('https://example-data.draftbit.com/books');
    const data = await response.json(); // Parsing the JSON response
    return data;  // Returning fetched data as the payload
  }              
);
           
// Selector function to get the top rated books.
export const selectTopRatedBooks = (state) => {
  return state.book.books
    .slice() // Make a copy of the books array
    .sort((a, b) => b.rating - a.rating) // Sort the books by rating
    .slice(0, 3); // Take the top 3 books
};  


// Selector function to get a random set of books.
export const selectRandomBooks = (state) => {
  // Clone the books array before sorting   
  const allBooks = [...state.book.books];
  // Shuffle the array and slice the first 5 books
  return allBooks.sort(() => 0.5 - Math.random()).slice(0, 5);
};

// Helper function to filter books based on the search input.
const filterBooksBySearch = (books, i) => {
  if (!i) return books; // Return all books if search query is empty
  // Filter books that match the search query in title or authors
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(i.toLowerCase()) ||
      book.authors.toLowerCase().includes(i.toLowerCase())
  );
};

// function to filter books by selected genres 
const filterBooksByGenres = (books, selectedGenres) => {
  if (selectedGenres.length === 0) return books; // Return all books if no genre is selected
  // Filter books that have any of the selected genres
  return books.filter((book) =>
    selectedGenres.some((genre) => book.genre_list.includes(genre))
  );
};


// Helper function to filter books by both search and genres.
const filterBooksBySearchAndGenres = (books, search, selectedGenres) => {
  return books.filter((book) => {
    const match = search
      ? book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.authors.toLowerCase().includes(search.toLowerCase())
      : true;  // Check if book matches the search query
    const matchGenres = selectedGenres.length
      ? book.genre_list.split(',').some((genre) => selectedGenres.includes(genre))
      : true; // Check if book matches any of the selected genres
    return match && matchGenres;
  });
};
    

// Selector function to get all  genres from the books.
export const selectAllGenres = (state) => {
  const genres = new Set(); // Use a Set to ensure uniqueness
  state.book.books.forEach((book) => {
    book.genre_list.split(',').forEach((genre) => {
      genres.add(genre.trim()); // Add each genre to the Set
    });
  });
  return Array.from(genres); // Convert Set to Array
};


// Selector function to categorize books by genre.
export const selectBooksByGenre = (state) => {
  const booksByGenre = {};
  state.book.books.forEach((book) => {
    const genres = book.genre_list.split(','); 
    genres.forEach((genre) => {
      genre = genre.trim();
      if (!booksByGenre[genre]) {
        booksByGenre[genre] = []; // Initialize genre array if not exist
      }
      booksByGenre[genre].push(book); // Add book to the genre category
    });
  });
  return booksByGenre;
};

 
const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Reducers for setting filtered books, search query, selected genres, and sorting.
    setFilteredBooks: (state, action) => {
      state.filteredBooks = filterBooksBySearchAndGenres(
        state.books,
        state.search,
        state.selectedGenres
      );
    },
    setSearch: (state, action) => {
      state.search = action.payload; // Set search query
      // Update filtered books based on the new search query
      state.filteredBooks = filterBooksBySearchAndGenres(
        state.books,
        action.payload,
        state.selectedGenres
      );
    },
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload; // Set selected genres
      // Update filtered books based on the new selected genres
      state.filteredBooks = filterBooksBySearchAndGenres(
        state.books,  
        state.search,
        action.payload 
      );
    },     // Reducer to sort books by rating
     sortByRating: (state) => {
      state.filteredBooks.sort((e, i) => i.rating - e.rating);
    },
    
    // Reducer to sort books by number of pages
    sortByNumPages: (state) => {
      state.filteredBooks.sort((e, i) => i.num_pages - e.num_pages);
    },
    
    // Reducer to clear sort 
    clearSort: (state) => {
      state.filteredBooks = [...state.books];
    },
  },
  // Handlers for the fetchBooks async thunk to manage loading state and update books data.
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true; // Set loading to true when fetch starts
      }) 
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload; // Update books with fetched data
        state.filteredBooks = action.payload; // Initially, filteredBooks mirrors the fetched books
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;      // Set loading to false if fetch fails
      });
  },
});


export const { setSearch, setSelectedGenres, setFilteredBooks, sortByRating, sortByNumPages, clearSort } = bookSlice.actions;
export default bookSlice.reducer;