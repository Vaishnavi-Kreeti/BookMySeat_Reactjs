import {useLocation,useParams,useNavigate} from 'react-router-dom';
import movies from "../data/movies.js";
function Booking() {
  const location = useLocation();
  const navigate =useNavigate();
  const { id } = useParams();
  const movie=movies.find((movie)=>movie.id===parseInt(id));
  const {selectedSeats,date,time,totalPrice}=location.state|| {} ;
  if(!movie){
    return (<h1>Movie not found</h1>);
  }
  return (
    <div>
      <h1>Booking Page</h1>
      <h2>{movie.name}</h2>
      <p>Date: {date}</p>
      <p>Showtime: {time}</p>
      <p>Seats: {selectedSeats.join(", ")}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button onClick={()=>navigate(`/moviedetails/${id}/Payment`,{state:{selectedSeats,date,time,totalPrice},})}>Proceed to Payment</button>
    </div>
  );
}

export default Booking;