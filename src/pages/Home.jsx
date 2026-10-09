import Moviecard from "../components/Moviecard";
import movies from "../data/movies.js";
import "../App.css";

function Home() {
  return (
    <div>
      <h1>🎬 Movie Booking</h1>

      <div className="movie-list">
        {movies.map((movie) => (
          <Moviecard
            key={movie.id}
            id={movie.id}
            title={movie.name}
            certification={movie.certification}
            format={movie.format}
            image={movie.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;