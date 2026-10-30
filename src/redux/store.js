import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './moviesSlice';
import bookingReducer from './bookingSlice'
export const store = configureStore({
  reducer: {
    movies:moviesReducer,
    booking:bookingReducer,
  },
});
