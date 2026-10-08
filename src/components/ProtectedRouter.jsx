import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    // Wait until session check is completed
    if (loading) {
        return <div>Checking authentication...</div>;
    }

    // User is not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is logged in
    return children;
}

export default ProtectedRoute;