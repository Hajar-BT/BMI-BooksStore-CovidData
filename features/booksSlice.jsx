import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await fetch('http://localhost:3000/books'); // Replace with your API endpoint
  return response.json();
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleLike(state, action) {
      const book = state.books.find((b) => b.id === action.payload);
      if (book) {
        book.liked = !book.liked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload.map(book => ({
          ...book,
          liked: false, // Add a liked property
        }));
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleLike } = booksSlice.actions;
export default booksSlice.reducer;
