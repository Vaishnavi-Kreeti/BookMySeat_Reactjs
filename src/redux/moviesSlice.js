import {createSlice} from "@reduxjs/toolkit"

const initialState={movies:JSON.parse(localStorage.getItem("movies"))||[],};

const moviesSlice = createSlice({
  name: "movies",initialState,
  reducers: {
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },
    updateMovie: (state, action) => {
      const updatedMovie = action.payload;
      const index = state.movies.findIndex(
        (movie) => movie.id === updatedMovie.id
      );
      if (index !== -1) {
        state.movies[index] = updatedMovie;
      }
    },
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { addMovie, updateMovie, deleteMovie } = moviesSlice.actions;
export default moviesSlice.reducer;