import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
    const navigate = useNavigate();
    const {loggedInUser,logout}= useAuth();
    function handleLogout() {
        const confirmlogout=window.confirm("Are you sure you want to log out?");
        if (confirmlogout) {
            logout();
            navigate("/login");
        }
    }
    return (
        <nav className="flex items-center justify-between gap-4 bg-slate-900 px-6 py-4 text-white">
            <Link to="/" className="text-xl font-bold text-violet-300">bookmyseat</Link>
            <div className="flex items-center gap-4">
                {loggedInUser ? (
                    <>
                        <span>Welcome, {loggedInUser.name}</span>
                        {loggedInUser.role === "admin" && (<Link to="/admin" className="text-violet-300">Admin</Link>)}
                        <button type="button" onClick={handleLogout} className="rounded-lg bg-violet-500 px-4 py-2 font-semibold hover:bg-violet-400">Logout</button>
                    </>) : (<>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-300 hover:bg-white/5">Create account</Link></> )}
            </div>
        </nav>);}
export default Navbar;
