import {useParams,useSearchParams,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import movies from "../data/movies.js";
function Seat(){
  const {id} = useParams();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const time=searchParams.get("time");
  const movie = movies.find((movie) => movie.id === parseInt(id));
  const rows = ["A", "B", "C", "D", "E"];
  const seatNumbers = [1, 2, 3, 4, 5];
  const storageKey = `selectedSeats-${id}-${date}-${time}`;

const [selectedSeats, setSelectedSeats] = useState(() => {
const savedSeats = localStorage.getItem(storageKey);
return savedSeats ? JSON.parse(savedSeats) : [];
});

useEffect(() => {
  localStorage.setItem(storageKey, JSON.stringify(selectedSeats));
}, [storageKey, selectedSeats]);
  const pricePerSeat = 200;
  const navigate = useNavigate();
  return(
    <div>
      <h2>SEAT SELECTION</h2>
      <p>Movie Name:{movie.name}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <h1>Select Seats</h1>
      <div className="screen">screen</div>
      <div className="seat-layout">
      {rows.map((row)=>(<div className="seat-row" key={row}>{seatNumbers.map((seatNumber)=>(<button className={selectedSeats.includes(`${row}${seatNumber}`) ? "selected-seat" : "available-seat"} key={seatNumber} onClick={()=>
        {const seat=`${row}${seatNumber}`;
          if (selectedSeats.includes(seat)){
            setSelectedSeats(selectedSeats.filter((selectedSeat => selectedSeat !== seat)));
          }
          else
        setSelectedSeats([...selectedSeats, seat]);
      }} >
      {row}{seatNumber}</button>))}</div>))}</div>
      <div className="booking-summary">
        <h2>Booking Summary</h2>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        <p>Total Seats: {selectedSeats.length}</p>
        <p>Total Price: ₹{selectedSeats.length * pricePerSeat}</p>
        <button onClick={() => navigate(`/moviedetails/${id}/showtimes`)}>Back to Showtimes</button>
        {selectedSeats.length>0  && (<button onClick={() =>navigate(`/moviedetails/${id}/booking`,{state:{selectedSeats,date,time,totalPrice:selectedSeats.length * pricePerSeat}})}>Confirm Booking</button>)}
      </div>
</div>
)};
    export default Seat;