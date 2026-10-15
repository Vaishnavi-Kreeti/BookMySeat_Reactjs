import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Showtimes from "./pages/ShowTimes";
import Seat from "./pages/Seat";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviedetails/:id" element={<MovieDetails />} />
        <Route path="/moviedetails/:id/showtimes" element={<Showtimes />} />
        <Route path="/moviedetails/:id/seats" element={<Seat />} />
        <Route path="/moviedetails/:id/booking" element={<Booking />} />
        <Route path="/moviedetails/:id/payment" element={<Payment />} />
        <Route path="/moviedetails/:id/ticket" element={<Ticket />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;