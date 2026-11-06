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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <button type="button" onClick={()=>{createAdminAccount();alert("Demo Admin Active");}} className="m-4 rounded-lg bg-violet-500 px-4 py-2 text-white">Create Demo Admin</button> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviedetails/:id" element={<MovieDetails />} />
        <Route path="/moviedetails/:id/showtimes" element={<ProtectedRoute allowedRoles={["customer"]}><Showtimes /></ProtectedRoute>} />
        <Route path="/moviedetails/:id/seats" element={<ProtectedRoute allowedRoles={["customer"]}><Seat /></ProtectedRoute>} />
        <Route path="/moviedetails/:id/booking" element={<ProtectedRoute allowedRoles={["customer"]}><Booking /></ProtectedRoute>} />
        <Route path="/moviedetails/:id/payment" element={<ProtectedRoute allowedRoles={["customer"]}><Payment /></ProtectedRoute>} />
        <Route path="/moviedetails/:id/ticket" element={<ProtectedRoute allowedRoles={["customer"]}><Ticket /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;