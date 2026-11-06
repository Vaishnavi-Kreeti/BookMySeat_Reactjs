import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmBooking } from '../redux/bookingSlice';
function Payment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking.currentBooking);
  const savedMovies = useSelector((state)=>state.movies.movies);
  const movie = savedMovies.find((movie) => movie.id === Number(id));
  const isMatchingDraft =
    booking?.movieId === Number(id) && booking.status === "draft";
  const selectedSeats = isMatchingDraft ? booking.selectedSeats : [];
  const date = isMatchingDraft ? booking.date : "";
  const time = isMatchingDraft ? booking.time : "";
  const hallName = isMatchingDraft ? booking.hallName : "";
  const totalPrice = selectedSeats.length * 200;

  if (!movie) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-center text-white">
        <div><h1 className="text-3xl font-bold">Movie not found</h1><button className="mt-5 rounded-xl bg-violet-500 px-5 py-3 font-semibold" onClick={() => navigate("/")}>Back to movies</button></div>
      </main>
    );
  }
  if (!isMatchingDraft || selectedSeats.length === 0) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-center text-white">
        <div><h1 className="text-3xl font-bold">No seats selected</h1><p className="mt-3 text-slate-400">Please go back and select seats before proceeding to payment.</p><button className="mt-5 rounded-xl bg-violet-500 px-5 py-3 font-semibold" onClick={() => navigate(`/moviedetails/${id}/seats`)}>Back to seat selection</button></div>
      </main>
    );
  }

  function handlePayment() {
    dispatch(confirmBooking());
    navigate(`/moviedetails/${id}/ticket`);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-10 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/30 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Secure checkout</p>
        <h1 className="mt-2 text-3xl font-black">Payment</h1>
        <h2 className="mt-6 text-xl font-bold">{movie.name}</h2>
        <div className="mt-5 space-y-3 rounded-2xl bg-slate-950 p-5 text-sm">
          <p className="flex justify-between gap-4"><span className="text-slate-400">Date</span><span>{date}</span></p>
          <p className="flex justify-between gap-4"><span className="text-slate-400">Showtime</span><span>{time}</span></p>
          <p className="flex justify-between gap-4"><span className="text-slate-400">Hall</span><span>{hallName}</span></p>
          <p className="flex justify-between gap-4"><span className="text-slate-400">Seats</span><span>{selectedSeats.join(", ")}</span></p>
          <p className="flex justify-between gap-4 border-t border-white/10 pt-4 text-lg font-bold"><span>Total</span><span>₹{Number(totalPrice).toFixed(2)}</span></p>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">Demo checkout: selecting “Pay now” confirms your seats locally in this browser.</p>
        <button className="mt-6 w-full rounded-xl bg-emerald-500 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-emerald-400" onClick={handlePayment}>Pay now</button>
      </section>
    </main>
  );

}
export default Payment;