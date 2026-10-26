import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute({ children, allowedRoles }) {
    const { loggedInUser } = useAuth();
    if (!loggedInUser) {
        return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(loggedInUser.role)) {return <Navigate to="/" replace />;}
    return children;
}
export default ProtectedRoute;
