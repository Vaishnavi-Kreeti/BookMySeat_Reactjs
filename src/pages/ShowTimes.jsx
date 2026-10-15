import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function Showtimes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedShowIndex, setSelectedShowIndex] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const savedMovies = JSON.parse(localStorage.getItem("movies") || "[]");
  const movie = savedMovies.find((movie) => movie.id === Number(id));
  if (!movie) {
    return <h2>Movie not found</h2>;
  }
  const shows = movie.shows?.length
    ? movie.shows
    : movie.showtime
      ? [{ showtime: movie.showtime, hallName: movie.hallName }]
      : [];
  const selectedShow = selectedShowIndex === "" ? null : shows[Number(selectedShowIndex)];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white sm:px-8">
      <section className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/30 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">Choose your screening</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{movie.name}</h1>
        <div className="mt-8 grid gap-2">
          <label className="text-sm font-semibold text-slate-200" htmlFor="show-date">Select a date</label>
          <input
            className="min-h-12 w-full max-w-xs rounded-xl border border-white/15 bg-slate-950 px-4 text-white outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-400/15"
            id="show-date"
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            required
          />
        </div>

        <fieldset className="mt-8">
          <legend className="mb-4 text-lg font-bold">Select a showtime and hall</legend>
          {shows.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {shows.map((show, index) => (
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${selectedShowIndex === String(index) ? "border-violet-400 bg-violet-400/10 ring-2 ring-violet-400/20" : "border-white/10 bg-slate-950 hover:border-white/25"}`}
                  key={`${show.showtime}-${show.hallName}-${index}`}
                >
                  <input
                    className="h-4 w-4 accent-violet-400"
                    type="radio"
                    name="showtime"
                    value={index}
                    checked={selectedShowIndex === String(index)}
                    onChange={() => setSelectedShowIndex(String(index))}
                  />
                  <span>
                    <span className="block text-lg font-bold">{show.showtime}</span>
                    <span className="mt-1 block text-sm text-slate-400">{show.hallName}</span>
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-amber-100">No showtimes are currently available for this movie.</p>
          )}
        </fieldset>

        {selectedDate && selectedShow && (
          <button
            className="mt-8 rounded-xl bg-violet-500 px-6 py-3 font-bold text-white transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-slate-900"
            onClick={() =>
              navigate(
                `/moviedetails/${id}/seats?date=${selectedDate}&time=${encodeURIComponent(selectedShow.showtime)}&hallName=${encodeURIComponent(selectedShow.hallName)}`
              )
            }
          >
            Select Seats
          </button>
        )}
      </section>
    </main>
  );
}
export default Showtimes;
