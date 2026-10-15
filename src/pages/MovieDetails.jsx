import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);
  const movie = movies.find((movie) => movie.id === parseInt(id));
  if (!movie) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-center text-white">
        <div>
          <h1 className="text-3xl font-bold">Movie not found</h1>
          <button className="mt-5 rounded-xl bg-violet-500 px-5 py-3 font-semibold hover:bg-violet-400" onClick={() => navigate("/", { replace: true })}>
            Back to movies
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen items-center bg-slate-950 px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/30 sm:p-10 md:grid-cols-2">
        <div className="mx-auto h-[420px] w-full max-w-[320px] overflow-hidden rounded-2xl bg-slate-800 shadow-xl">
          <img className="h-full w-full object-cover" src={movie.image} alt={`${movie.name} poster`} />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">Movie details</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">{movie.name}</h1>
          <p className="mt-4 text-lg text-slate-300">{movie.genre} <span className="px-2 text-violet-300">·</span> {movie.length}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">{movie.certification}</span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">{movie.format}</span>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <button className="rounded-xl bg-violet-500 px-6 py-3 font-bold transition hover:bg-violet-400" onClick={() => navigate(`/moviedetails/${id}/showtimes`)}>
              Book tickets
            </button>
            <button className="rounded-xl border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10" onClick={() => navigate("/")}>
              Back to movies
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;