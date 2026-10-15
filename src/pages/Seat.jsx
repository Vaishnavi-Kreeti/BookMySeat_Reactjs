import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function Seat() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const savedMovies = JSON.parse(localStorage.getItem("movies") || "[]");
  const movie = savedMovies.find((movie) => movie.id === Number(id));
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const hallName = searchParams.get("hallName");
  const bookingKey = `bookedSeats-${id}-${date}-${time}-${hallName}`;
  const storageKey = `selectedSeats-${id}-${date}-${time}-${hallName}`;

  const [bookedSeats] = useState(() => {
    const savedSeats = localStorage.getItem(bookingKey);
    if (!savedSeats) {
      return [];
    }

    try {
      return JSON.parse(savedSeats);
    } catch (error) {
      console.error("Invalid booked seats data:", error);
      return [];
    }
  });

  const rows = ["A", "B", "C", "D", "E"];
  const seatNumbers = [1, 2, 3, 4, 5];
  const [selectedSeats, setSelectedSeats] = useState(() => {
    const savedSeats = localStorage.getItem(storageKey);
    return savedSeats ? JSON.parse(savedSeats) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selectedSeats));
  }, [storageKey, selectedSeats]);

  const pricePerSeat = 200;

  if (!movie) {
    return <main className="grid min-h-screen place-items-center bg-slate-950 text-3xl font-bold text-white">Movie not found</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Seat selection</p>
          <h1 className="mt-2 text-3xl font-black">{movie.name}</h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            <p>Date: <span className="font-semibold text-white">{date}</span></p>
            <p>Time: <span className="font-semibold text-white">{time}</span></p>
            <p>Hall: <span className="font-semibold text-white">{hallName}</span></p>
          </div>
        </header>

        <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900 px-4 py-8 sm:px-8" aria-label="Choose seats">
          <h2 className="text-center text-2xl font-bold">Choose your seats</h2>
          <div className="mx-auto mb-10 mt-8 w-4/5 max-w-lg rounded-[50%_50%_8px_8px] border-t-4 border-violet-300/70 bg-slate-700 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.4em] text-slate-200 shadow-[0_-8px_30px_rgba(167,139,250,0.12)]">
            Screen
          </div>
          <div className="flex flex-col items-center gap-3">
            {rows.map((row) => (
              <div className="flex justify-center gap-2" key={row}>
                {seatNumbers.map((seatNumber) => {
                  const seat = `${row}${seatNumber}`;
                  const isBooked = bookedSeats.includes(seat);
                  const isSelected = selectedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={isBooked}
                      className={`grid h-11 w-12 place-items-center rounded-lg text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-white ${isBooked
                          ? "cursor-not-allowed bg-red-500/80 text-white opacity-70"
                          : isSelected
                            ? "bg-violet-500 text-white shadow-lg shadow-violet-950/40"
                            : "bg-emerald-600 text-white hover:bg-emerald-500"
                        }`}
                      onClick={() => {
                        if (isBooked) return;

                        if (isSelected) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (selectedSeat) => selectedSeat !== seat
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seat]);
                        }
                      }}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs text-slate-300">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-emerald-600" />Available</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-violet-500" />Selected</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-red-500" />Booked</span>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8">
          <h2 className="text-xl font-bold">Booking summary</h2>
          <p className="mt-4 text-sm text-slate-300">Selected seats: <span className="font-semibold text-white">{selectedSeats.join(", ") || "None"}</span></p>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-slate-300">{selectedSeats.length} seat{selectedSeats.length === 1 ? "" : "s"}</span>
            <span className="text-xl font-black">₹{selectedSeats.length * pricePerSeat}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl border border-white/20 px-5 py-3 font-semibold transition hover:bg-white/10" onClick={() => navigate(`/moviedetails/${id}/showtimes`)}>
              Back to Showtimes
            </button>
            {selectedSeats.length > 0 && (
              <button
                className="rounded-xl bg-violet-500 px-5 py-3 font-bold transition hover:bg-violet-400"
                onClick={() =>
                  navigate(`/moviedetails/${id}/booking`, {
                    state: {
                      selectedSeats,
                      date,
                      time,
                      hallName,
                      totalPrice: selectedSeats.length * pricePerSeat,
                    },
                  })
                }
              >
                Confirm Booking
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Seat;