import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

function Ticket() {
    const location = useLocation();
    const { id } = useParams();
    const savedMovies = JSON.parse(localStorage.getItem("movies") || "[]");
    const movie = savedMovies.find((movie) => movie.id === Number(id));
    const { selectedSeats, date, time, hallName, totalPrice } = location.state || {};
    const cancellationKey = `cancelled-${id}-${date}-${time}-${hallName}-${[...(selectedSeats || [])].sort().join("-")}`;
    const [cancelled, setCancelled] = useState(() => {
        return localStorage.getItem(cancellationKey) === "true";
    });

    if (!movie || !selectedSeats || selectedSeats.length === 0) {
        return (
            <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-center text-white">
                <div>
                    <h2 className="text-3xl font-bold">Ticket details not found</h2>
                    <p className="mt-3 text-slate-400">Please complete a booking to view your ticket.</p>
                </div>
            </main>
        );
    }

    function handleCancelBooking() {
        const bookingKey = `bookedSeats-${id}-${date}-${time}-${hallName}`;
        const existingSeats = JSON.parse(localStorage.getItem(bookingKey) || "[]");
        const updatedSeats = existingSeats.filter(
            (seat) => !selectedSeats.includes(seat)
        );

        localStorage.setItem(bookingKey, JSON.stringify(updatedSeats));
        localStorage.setItem(cancellationKey, "true");
        setCancelled(true);
    }

    const bookingDetails = JSON.stringify({
        movie: movie?.name,
        date,
        time,
        hallName,
        seats: selectedSeats,
        totalPrice,
    });

    return (
        <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8">
            <article className="mx-auto max-w-xl rounded-3xl border-2 border-dashed border-violet-300/40 bg-slate-900 p-6 shadow-2xl shadow-black/30 sm:p-9 print:border-slate-400 print:bg-white print:text-slate-900 print:shadow-none">
                <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300 print:text-violet-700">Your booking is ready</p>
                    <h1 className="mt-2 text-3xl font-black">Movie Ticket</h1>
                    <strong className="mt-3 block text-xl">{movie.name}</strong>
                </div>

                <dl className="mt-7 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-slate-950 p-4 print:bg-slate-100"><dt className="text-slate-400 print:text-slate-600">Date</dt><dd className="mt-1 font-bold">{date}</dd></div>
                    <div className="rounded-xl bg-slate-950 p-4 print:bg-slate-100"><dt className="text-slate-400 print:text-slate-600">Showtime</dt><dd className="mt-1 font-bold">{time}</dd></div>
                    <div className="rounded-xl bg-slate-950 p-4 print:bg-slate-100"><dt className="text-slate-400 print:text-slate-600">Hall</dt><dd className="mt-1 font-bold">{hallName}</dd></div>
                    <div className="rounded-xl bg-slate-950 p-4 print:bg-slate-100"><dt className="text-slate-400 print:text-slate-600">Seats</dt><dd className="mt-1 font-bold">{selectedSeats.join(", ")}</dd></div>
                </dl>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 print:border-slate-300">
                    <span className="text-slate-300 print:text-slate-600">Total paid</span>
                    <span className="text-2xl font-black">₹{totalPrice}</span>
                </div>

                <p className="mt-5 text-center text-sm">
                    Booking status: <span className={`font-bold ${cancelled ? "text-red-300 print:text-red-700" : "text-emerald-300 print:text-emerald-700"}`}>{cancelled ? "Cancelled" : "Confirmed"}</span>
                </p>
                {cancelled ? (
                    <p className="mt-2 text-center text-sm leading-relaxed text-slate-300 print:text-slate-600">
                        Your booking has been cancelled. Please contact support for further
                        assistance.
                    </p>
                ) : (
                    <p className="mt-2 text-center text-sm text-slate-300 print:text-slate-600">Thank you for booking with us. Enjoy your movie!</p>
                )}

                <div className="mt-7 flex flex-col items-center border-t border-white/10 pt-6 print:border-slate-300">
                    <h3 className="mb-4 font-bold">Booking QR code</h3>
                    <QRCodeSVG value={bookingDetails} size={180} />
                    <p className="mt-3 text-xs text-slate-400 print:text-slate-600">Scan to view booking details</p>
                </div>

                <div className="mt-7 flex flex-wrap justify-center gap-3 print:hidden">
                    <button className="rounded-xl border border-white/20 px-5 py-3 font-semibold transition hover:bg-white/10" onClick={() => window.print()}>Print ticket</button>
                    <button className="rounded-xl bg-red-500/15 px-5 py-3 font-semibold text-red-200 transition hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-50" onClick={handleCancelBooking} disabled={cancelled}>
                        {cancelled ? "Booking Cancelled" : "Cancel Booking"}
                    </button>
                </div>
            </article>
        </main>
    );
}

export default Ticket;