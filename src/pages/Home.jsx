import Moviecard from "../components/Moviecard";
import { Link } from "react-router-dom";

function Home() {
  const movies = (() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  })();

  if (movies.length === 0) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-center text-white">
        <div className="max-w-lg">
          <span className="text-5xl" aria-hidden="true">🎬</span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight">No movies available</h1>
          <p className="mt-3 text-slate-400">Please check back later for the latest screenings.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">Now showing</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Movie Booking</h1>
          </div>
          <Link to="/register" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-300 hover:bg-white/5">
            Create account
          </Link>
        </header>

        <section aria-label="Available movies" className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
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
        </section>
      </div>
    </main>
  );
}

export default Home;