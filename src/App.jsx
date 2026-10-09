import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Showtimes from "./pages/ShowTimes";
import Seat from "./pages/Seat";
import Booking from "./pages/Booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviedetails/:id" element={<MovieDetails />} />
        <Route path="/moviedetails/:id/showtimes" element={<Showtimes />} />
        <Route path="/moviedetails/:id/seats" element={<Seat />} />
        <Route path="/moviedetails/:id/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;