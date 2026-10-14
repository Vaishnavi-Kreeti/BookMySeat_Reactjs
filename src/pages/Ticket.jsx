import {QRCodeSVG} from "qrcode.react";
import { useParams,useLocation,useNavigate} from "react-router-dom";
import movies from "../data/movies";
import {useState} from "react";
function Ticket(){
    const location=useLocation();
    const {id}=useParams();
    const navigate=useNavigate();
    const [cancelled,setCancelled]=useState(false);
    function handleCancelBooking(){
        const bookingKey=`bookedSeats-${id}-${location.state.date}-${location.state.time}`;
        const existingSeats=JSON.parse(localStorage.getItem(bookingKey)||"[]");
        const updatedSeats=existingSeats.filter(seat=>!location.state.selectedSeats.includes(seat));
        localStorage.setItem(bookingKey,JSON.stringify(updatedSeats));
        setCancelled(true);
    }
    const movie=movies.find((movie)=>movie.id===parseInt(id));
    const {selectedSeats,date,time,totalPrice}=location.state || {};
    const bookingDetails=JSON.stringify({movie:movie?.name,date,time,seats:selectedSeats,totalPrice});
return(
    <div className="ticket">
        <div >
        <h1>Movie Ticket</h1>
        <strong>{movie.name}</strong>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Showtime:</strong> {time}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
        <h3>Total Paid: ₹{totalPrice}</h3>
        </div>
        <p>Booking Status: {cancelled ? "Cancelled" : "Confirmed"}</p>
        {cancelled?(<p>Your booking has been cancelled. Please contact support for further assistance.</p>):(<><p>Thank you for booking with us!</p>
        <p>Enjoy your movie!</p></>)}
        
        <div className="ticket-qr">
        <h3>Booking QR Code</h3>
        <QRCodeSVG value={bookingDetails} size={180} />
        <p>Scan to view booking details</p>
        </div>
        <div>
            <button onClick={() => window.print()}>Print Ticket</button>
            <button onClick={handleCancelBooking} disabled={cancelled}>
                {cancelled ? "Booking Cancelled" : "Cancel Booking"}
            </button>
        </div>
        
    </div>
);
}
export default Ticket;