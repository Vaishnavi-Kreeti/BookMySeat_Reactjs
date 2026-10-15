import { useLocation, useParams, useNavigate } from 'react-router-dom';
function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const savedMovies = JSON.parse(localStorage.getItem("movies") || "[]");
  const movie = savedMovies.find((movie) => movie.id === Number(id));
  const { selectedSeats, date, time, hallName, totalPrice } = location.state || {};
  if (!movie || !selectedSeats?.length) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-center text-white">
        <div>
          <h1 className="text-3xl font-bold">Booking details not found</h1>
          <p className="mt-3 text-slate-400">Choose a movie and seats to continue.</p>
          <button className="mt-6 rounded-xl bg-violet-500 px-5 py-3 font-bold hover:bg-violet-400" onClick={() => navigate("/")}>Back to movies</button>
        </div>
      </main>
    );
  }
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-10 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/30 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Review your order</p>
        <h1 className="mt-2 text-3xl font-black">Booking summary</h1>
        <h2 className="mt-7 text-xl font-bold">{movie.name}</h2>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-slate-950 p-4"><dt className="text-slate-400">Date</dt><dd className="mt-1 font-semibold">{date}</dd></div>
          <div className="rounded-xl bg-slate-950 p-4"><dt className="text-slate-400">Showtime</dt><dd className="mt-1 font-semibold">{time}</dd></div>
          <div className="rounded-xl bg-slate-950 p-4"><dt className="text-slate-400">Hall</dt><dd className="mt-1 font-semibold">{hallName}</dd></div>
          <div className="rounded-xl bg-slate-950 p-4"><dt className="text-slate-400">Seats</dt><dd className="mt-1 font-semibold">{selectedSeats.join(", ")}</dd></div>
        </dl>
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-slate-300">Total</span>
          <span className="text-2xl font-black">₹{Number(totalPrice).toFixed(2)}</span>
        </div>
        <button className="mt-6 w-full rounded-xl bg-violet-500 px-5 py-3.5 font-bold transition hover:bg-violet-400" onClick={() => navigate(`/moviedetails/${id}/payment`, { state: { selectedSeats, date, time, hallName, totalPrice } })}>
          Proceed to payment
        </button>
      </section>
    </main>
  );
}

export default Booking;