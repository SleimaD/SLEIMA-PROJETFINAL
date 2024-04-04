import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  books: [],
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
    const data = await response.json();
    return data;
  }              
);
           

export const selectTopRatedBooks = (state) => {
  return state.book.books
    .slice() // Make a copy of the books array
    .sort((a, b) => b.rating - a.rating) // Sort the books by rating
    .slice(0, 3); // Take the top 3 books
};  



export const selectRandomBooks = (state) => {
  // Clone the books array before sorting   
  const allBooks = [...state.book.books];
  // Shuffle the array and slice the first 5 books
  return allBooks.sort(() => 0.5 - Math.random()).slice(0, 5);
};


const filterBooksBySearch = (books, i) => {
  if (!i) return books;
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(i.toLowerCase()) ||
      book.authors.toLowerCase().includes(i.toLowerCase())
  );
};

// function to filter books by selected genres 
const filterBooksByGenres = (books, selectedGenres) => {
  if (selectedGenres.length === 0) return books;
  return books.filter((book) =>
    selectedGenres.some((genre) => book.genre_list.includes(genre))
  );
};

const filterBooksBySearchAndGenres = (books, search, selectedGenres) => {
  return books.filter((book) => {
    const match = search
      ? book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.authors.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchGenres = selectedGenres.length
      ? book.genre_list.split(',').some((genre) => selectedGenres.includes(genre))
      : true;
    return match && matchGenres;
  });
};
    
export const selectAllGenres = (state) => {
  const genres = new Set();
  state.book.books.forEach((book) => {
    book.genre_list.split(',').forEach((genre) => {
      genres.add(genre.trim());
    });
  });
  return Array.from(genres);
};

export const selectBooksByGenre = (state) => {
  const booksByGenre = {};
  state.book.books.forEach((book) => {
    const genres = book.genre_list.split(','); 
    genres.forEach((genre) => {
      genre = genre.trim();
      if (!booksByGenre[genre]) {
        booksByGenre[genre] = [];
      }
      booksByGenre[genre].push(book);
    });
  });
  return booksByGenre;
};

 
const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilteredBooks: (state, action) => {
      state.filteredBooks = filterBooksBySearchAndGenres(
        state.books,
        state.search,
        state.selectedGenres
      );
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.filteredBooks = filterBooksBySearchAndGenres(
        state.books,
        action.payload,
        state.selectedGenres
      );
    },
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      }) 
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        state.filteredBooks = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;     
      });
  },
});


export const { setSearch, setSelectedGenres, setFilteredBooks, sortByRating, sortByNumPages, clearSort } = bookSlice.actions;
export default bookSlice.reducer;