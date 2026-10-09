import {useNavigate,useParams} from "react-router-dom";
import movies from "../data/movies.js";
import "../App.css";
function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((movie) => movie.id === parseInt(id));
  if (!movie){
    return (<h3>Movie not found</h3>)
  }
  return (
     <div className="movie-details">
    <div className="details-poster">
          <img src={movie.image}
              alt={movie.name} />
      </div>
      <div >
              <h3>{movie.name}</h3>
              <p>{movie.genre}.{movie.length}</p>
              <p>{movie.certification}.{movie.format}</p>
              <button className="movie-details button" onClick={()=>navigate(`/moviedetails/${id}/showtimes`)}>
                Book Tickets
              </button>
              <button className="movie-details button" onClick={() => navigate("/")}>
                Back to Movies
              </button>
            </div>
          </div>

  
  );
}

export default MovieDetails;