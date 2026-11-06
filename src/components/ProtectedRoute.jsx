import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserRole } from "../redux/authSlice";

function ProtectedRoute({ children, allowedRoles }) {
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const role = getUserRole(loggedInUser);

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to={role === "admin" ? "/admin" : "/"} replace />;
    }

    return children;
}

export default ProtectedRoute;
