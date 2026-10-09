import {useNavigate} from "react-router-dom";
function Moviecard(props) {
  const navigate = useNavigate();
  return (
   <div className="movie-card">

    <div className="movie-poster">
      <img src={props.image}
      alt={props.title}
      />
    </div>

    <div className="movie-name">
    <h3>{props.title}</h3>
    <p>{props.certification}.{props.format}</p>
    <button onClick={() => navigate(`/moviedetails/${props.id}`)}>
  Book Seat
</button>
   </div>

   </div>
  );
}

export default Moviecard;
