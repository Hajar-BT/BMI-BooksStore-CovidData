// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import poidsIdealReducer from '../features/poidsIdealSlice';
import booksReducer from '../features/booksSlice';
import covidReducer from '../features/covidSlice'; // Import the new reducer

export const store = configureStore({
  reducer: {
    poidsIdeal: poidsIdealReducer,
    books: booksReducer,
    covid: covidReducer, // Add the covid reducer here
  },
});
