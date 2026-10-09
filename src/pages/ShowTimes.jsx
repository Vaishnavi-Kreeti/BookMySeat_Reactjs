import {useNavigate,useParams} from "react-router-dom";
import {useState} from "react";

function Showtimes() {
  const { id } = useParams();
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  return (
    <div>
        <h1>Select Date</h1>
        <input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} />
      <h1>Select Showtime</h1>
      <h2>Movie ID: {id}</h2>
     <label><input type="radio"name="showtime"value="9AM"checked={selectedShowtime === "9:00 AM"}onChange={() => setSelectedShowtime("9:00 AM")}/>9:00 AM</label>
      <label><input type="radio"name="showtime"value="12PM"checked={selectedShowtime === "12:00 PM"}onChange={() => setSelectedShowtime("12:00 PM")}/>12:00 PM</label>
      <label><input type="radio"name="showtime"value="3PM"checked={selectedShowtime === "3:00 PM"}onChange={() => setSelectedShowtime("3:00 PM")}/>3:00 PM</label>
      <label><input type="radio"name="showtime"value="6PM"checked={selectedShowtime === "6:00 PM"}onChange={() => setSelectedShowtime("6:00 PM")}/>6:00 PM</label>
    {selectedDate && selectedShowtime && (
  <button
    onClick={() =>
     navigate(
  `/moviedetails/${id}/seats?date=${selectedDate}&time=${encodeURIComponent(selectedShowtime)}`
)}>Select Seats</button>)}
    </div>
  );
}

export default Showtimes;