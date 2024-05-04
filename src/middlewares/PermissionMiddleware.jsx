import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const checkPermissions = (requiredPermissions, userPermissions) => {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};

const PermissionMiddleware = ({ children, requiredPermissions }) => {

  const userPermissions = useSelector(state => state.auth.permission);

  if (!checkPermissions(requiredPermissions, userPermissions)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PermissionMiddleware;

