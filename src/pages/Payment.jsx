import {useLocation,useParams,useNavigate} from 'react-router-dom';
import movies from "../data/movies.js";
function Payment() {
  const location = useLocation();
  const navigate=useNavigate();
  const { id } = useParams();
  const movie=movies.find((movie)=>movie.id===parseInt(id));
  const {selectedSeats,date,time,totalPrice}=location.state|| {} ;
  if(!selectedSeats||selectedSeats.length===0){
    return (
      <div>
        <h1>No seats selected</h1>
        <p>Please go back and select seats before proceeding to payment.</p>
        <button onClick={()=>navigate('/')}>Back to Movies</button>
      </div>
    );
  }
  
  function handlePayment() {
    const bookingKey = `bookedSeats-${id}-${date}-${time}`;

    let existingSeats = [];

    try {
      existingSeats = JSON.parse(
        localStorage.getItem(bookingKey) || "[]"
      );
    } catch (error) {
      console.error("Invalid booked seats data:", error);
    }

    // Check whether any selected seat is already booked
    const alreadyBooked = selectedSeats.some((seat) =>
      existingSeats.includes(seat)
    );

    if (alreadyBooked) {
      alert("Some seats are already booked. Please select different seats.");
      navigate(`/moviedetails/${id}/showtimes`);
      return;
    }

    // Save the newly booked seats
    const updatedSeats = [...existingSeats, ...selectedSeats];

    localStorage.setItem(
      bookingKey,
      JSON.stringify(updatedSeats)
    );

    // Clear the temporary seat selection
    localStorage.removeItem(`selectedSeats-${id}-${date}-${time}`);

    // Navigate to the ticket page
    navigate(`/moviedetails/${id}/ticket`, {
      state: {
        selectedSeats,
        date,
        time,
        totalPrice,
      },
    });
  }

  return (
    <div>
      <h1>Payment Page</h1>
      <h2>{movie.name}</h2>
      <p>Date: {date}</p>
      <p>Showtime: {time}</p>
      <p>Seats: {selectedSeats.join(", ")}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );

}
export default Payment;