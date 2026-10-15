import { useLocation, useParams, useNavigate } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const savedMovies = JSON.parse(localStorage.getItem("movies") || "[]");
  const movie = savedMovies.find((movie) => movie.id === Number(id));
  const { selectedSeats, date, time, hallName, totalPrice } = location.state || {};
  if (!movie) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-center text-white">
        <div><h1 className="text-3xl font-bold">Movie not found</h1><button className="mt-5 rounded-xl bg-violet-500 px-5 py-3 font-semibold" onClick={() => navigate("/")}>Back to movies</button></div>
      </main>
    );
  }
  if (!selectedSeats || selectedSeats.length === 0) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-center text-white">
        <div><h1 className="text-3xl font-bold">No seats selected</h1><p className="mt-3 text-slate-400">Please go back and select seats before proceeding to payment.</p><button className="mt-5 rounded-xl bg-violet-500 px-5 py-3 font-semibold" onClick={() => navigate(`/moviedetails/${id}/seats`)}>Back to seat selection</button></div>
      </main>
    );
  }

  function handlePayment() {
    const bookingKey = `bookedSeats-${id}-${date}-${time}-${hallName}`;

    let existingSeats = [];

    try {
      existingSeats = JSON.parse(
        localStorage.getItem(bookingKey) || "[]"
      );
    } catch (error) {
      console.error("Invalid booked seats data:", error);
    }

    // Check whether any selected seat is already booked
    const alreadyBooked = selectedSeats.some((seat) =>
      existingSeats.includes(seat)
    );

    if (alreadyBooked) {
      alert("Some seats are already booked. Please select different seats.");
      navigate(`/moviedetails/${id}/showtimes`);
      return;
    }

    // Save the newly booked seats
    const updatedSeats = [...existingSeats, ...selectedSeats];

    localStorage.setItem(
      bookingKey,
      JSON.stringify(updatedSeats)
    );

    // Clear the temporary seat selection
    localStorage.removeItem(`selectedSeats-${id}-${date}-${time}-${hallName}`);

    // Navigate to the ticket page
    navigate(`/moviedetails/${id}/ticket`, {
      state: {
        selectedSeats,
        date,
        time, hallName,
        totalPrice,
      },
    });
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