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
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import {AuthProvider} from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar />
      {/* <button type="button" onClick={()=>{createAdminAccount();alert("Demo Admin Active");}} className="m-4 rounded-lg bg-violet-500 px-4 py-2 text-white">Create Demo Admin</button> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviedetails/:id" element={<MovieDetails />} />
        <Route path="/moviedetails/:id/showtimes" element={<Showtimes />} />
        <Route path="/moviedetails/:id/seats" element={<Seat />} />
        <Route path="/moviedetails/:id/booking" element={<Booking />} />
        <Route path="/moviedetails/:id/payment" element={<Payment />} />
        <Route path="/moviedetails/:id/ticket" element={<Ticket />} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;