import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import bookingReducer from "./bookingSlice";
import authReducer, { normalizeAuthUser } from "./authSlice";
import usersReducer from "./usersSlice";

function loadMoviesState() {
  try {
    const storedMovies = JSON.parse(localStorage.getItem("movies") || "[]");
    return { movies: Array.isArray(storedMovies) ? storedMovies : [] };
  } catch (error) {
    console.error("Unable to restore movie state:", error);
    return { movies: [] };
  }
}

function loadBookingState() {
  try {
    const savedBooking = localStorage.getItem("booking");
    if (!savedBooking) return undefined;

    const parsedBooking = JSON.parse(savedBooking);
    const hasValidCurrentBooking =
      parsedBooking?.currentBooking === null ||
      (parsedBooking?.currentBooking &&
        typeof parsedBooking.currentBooking === "object" &&
        !Array.isArray(parsedBooking.currentBooking));
    const hasValidBookedSeats =
      parsedBooking?.bookedSeatsByShow &&
      typeof parsedBooking.bookedSeatsByShow === "object" &&
      !Array.isArray(parsedBooking.bookedSeatsByShow) &&
      Object.values(parsedBooking.bookedSeatsByShow).every(Array.isArray);

    if (!hasValidCurrentBooking || !hasValidBookedSeats) {
      throw new Error("Saved booking data has an invalid format");
    }

    return parsedBooking;
  } catch (error) {
    console.error("Unable to restore saved booking state:", error);
    return undefined;
  }
}

function loadAuthState() {
  try {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    return { loggedInUser: normalizeAuthUser(storedUser) };
  } catch (error) {
    console.error("Unable to restore auth state:", error);
    return { loggedInUser: null };
  }
}

function loadUsersState() {
  try {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    return { users: Array.isArray(storedUsers) ? storedUsers : [] };
  } catch (error) {
    console.error("Unable to restore user state:", error);
    return { users: [] };
  }
}

const adminOnlyActions = new Set([
  "movies/addMovie",
  "movies/updateMovie",
  "movies/deleteMovie",
]);

const roleAuthorizationMiddleware = ({ getState }) => (next) => (action) => {
  if (
    adminOnlyActions.has(action.type) &&
    getState().auth.loggedInUser?.role !== "admin"
  ) {
    throw new Error("Only an admin can add, edit, or delete movies.");
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    booking: bookingReducer,
    auth: authReducer,
    users: usersReducer,
  },
  preloadedState: {
    movies: loadMoviesState(),
    booking: loadBookingState(),
    auth: loadAuthState(),
    users: loadUsersState(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roleAuthorizationMiddleware),
});

store.subscribe(() => {
  const { booking, auth, movies, users } = store.getState();

  try {
    localStorage.setItem("booking", JSON.stringify(booking));
    localStorage.setItem("movies", JSON.stringify(movies.movies));
    localStorage.setItem("users", JSON.stringify(users.users));

    if (auth.loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(auth.loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  } catch (error) {
    console.error("Unable to save Redux state to localStorage:", error);
  }
});
