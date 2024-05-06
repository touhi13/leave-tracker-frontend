import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const RoleRouter = ({ children, role }) => {

  const userRole = useSelector(state => state.auth.role);

  const checkRole = (role, userRole) => {
    return role === userRole
  };


  if (!checkRole(role, userRole)) {
    return <Navigate to="/not-found" />;
  }

  return children;
};

export default RoleRouter;

