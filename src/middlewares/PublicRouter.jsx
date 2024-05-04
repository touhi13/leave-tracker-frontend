import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRouter = ({ children }) => {
    const isLoggedIn = useAuth();
    // console.log(isLoggedIn);
    return !isLoggedIn ? children : <Navigate to={"/"} />
}

export default PublicRouter;