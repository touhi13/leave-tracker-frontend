import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const PublicRouter = ({ children }) => {
    const isLoggedIn = useAuth();
    const role = useSelector((state) => state.auth.role);

    const destinationRoute = role === "employee" ? "/user-leave-request" : "/";

    return !isLoggedIn ? children : <Navigate to={destinationRoute} />;
}

export default PublicRouter;
