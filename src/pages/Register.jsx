import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function handleRegister(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Your passwords don't match. Please check and try again.");
            setMessage("");
            return;
        }

        setError("");
        setMessage(
            `Thanks, ${name.trim()}! Your details are valid. Connect a secure registration service to create your account; this demo does not store passwords.`
        );
    }

    return (
        <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10 text-white">
            <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/30 sm:p-10" aria-labelledby="register-title">
                <Link className="text-sm font-semibold text-violet-300 transition hover:text-violet-200 hover:underline" to="/">
                    ← Back to movies
                </Link>

                <div className="mb-7 mt-8">
                    <span className="text-xs font-bold tracking-[0.18em] text-violet-300">YOUR MOVIE NIGHTS START HERE</span>
                    <h1 id="register-title" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Create your account</h1>
                    <p className="mt-3 leading-relaxed text-slate-400">Sign up to make your next trip to the movies even easier.</p>
                </div>

                <form className="grid gap-5" onSubmit={handleRegister}>
                    <div className="grid gap-2">
                        <label className="text-sm font-semibold text-slate-200" htmlFor="name">Full name</label>
                        <input
                            className="min-h-12 rounded-xl border border-white/15 bg-slate-950 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/15"
                            id="name"
                            type="text"
                            value={name}
                            autoComplete="name"
                            placeholder="e.g. Alex Morgan"
                            onChange={(event) => setName(event.target.value)}
                            required
                            maxLength={80}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-semibold text-slate-200" htmlFor="email">Email address</label>
                        <input
                            className="min-h-12 rounded-xl border border-white/15 bg-slate-950 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/15"
                            id="email"
                            type="email"
                            value={email}
                            autoComplete="email"
                            placeholder="you@example.com"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-semibold text-slate-200" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="min-h-12 w-full rounded-xl border border-white/15 bg-slate-950 px-4 pr-20 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/15"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                autoComplete="new-password"
                                placeholder="At least 8 characters"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                minLength={8}
                            />
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm font-bold text-violet-300 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-violet-300"
                                type="button"
                                onClick={() => setShowPassword((visible) => !visible)}
                                aria-label={showPassword ? "Hide passwords" : "Show passwords"}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <span className="text-xs leading-relaxed text-slate-400">
                            Use at least 8 characters for a stronger password.
                        </span>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-semibold text-slate-200" htmlFor="confirm-password">Confirm password</label>
                        <input
                            className="min-h-12 rounded-xl border border-white/15 bg-slate-950 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/15"
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            autoComplete="new-password"
                            placeholder="Enter your password again"
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                            minLength={8}
                        />
                    </div>

                    {error && (
                        <p className="rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm leading-relaxed text-red-200" role="alert">
                            {error}
                        </p>
                    )}
                    {message && (
                        <p className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm leading-relaxed text-emerald-200" role="status">
                            {message}
                        </p>
                    )}

                    <button className="min-h-12 rounded-xl bg-violet-500 px-5 font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-slate-900" type="submit">
                        Create account
                    </button>
                    <p className="-mt-2 text-center text-xs leading-relaxed text-slate-400">
                        Your password is never saved by this demo.
                    </p>
                </form>
            </section>
        </main>
    );
}

export default Register;