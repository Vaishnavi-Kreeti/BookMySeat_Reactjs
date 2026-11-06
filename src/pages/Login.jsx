import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const savedUsers = useSelector((state) => state.users.users);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event) {
        event.preventDefault();

        const normalizedEmail = email.trim().toLowerCase();
        const user = savedUsers.find(
            (savedUser) => savedUser.email?.trim().toLowerCase() === normalizedEmail
        );

        if (!user) {
            setError("No account found with this email. Please register first.");
            return;
        }

        dispatch(login({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }));

        setError("");
        navigate(user.role === "admin" ? "/admin" : "/", { replace: true });
    }

    return (
        <div className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10 text-white">
            <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/30 sm:p-10" aria-labelledby="login-title">
                <Link className="text-sm font-semibold text-violet-300 transition hover:text-violet-200 hover:underline" to="/">← Back to movies</Link>
                <div className="mb-7 mt-8">
                    <h1 className="text-2xl font-bold text-white sm:text-3xl" id="login-title">Login</h1>
                    <p className="mt-1 text-sm text-slate-400">Welcome back! Please enter your details.</p>
                    <p className="mt-1 text-sm text-slate-400">Enter your registered email to continue.</p>
                </div>
                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="email">Email</label>
                        <input className="min-h-12 w-full rounded-xl border border-white/15 bg-slate-950 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/15" type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required/>
                    </div>
                    {error && (<p className="text-sm text-red-400" role="alert">{error}</p>)}
                    <button className="min-h-12 w-full rounded-xl bg-violet-500 px-5 font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-slate-900" type="submit">Login</button>
                </form>
                <p className="mt-4 text-sm text-slate-400 justify-center text-center">
                    Doesn't have an account? <Link to="/register" className="text-violet-300 hover:underline">Create account</Link>
                </p>
            </section>
        </div>
    );
}

export default Login;