import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const PublicRoute = ({ children, type = 'public' }) => {
  const { isAuthenticated = false, user = {} } = useSelector((state) => state.user);

  if (isAuthenticated) {
    if (user.usertype === 'Primary') {
      return <Navigate to="/dashboard" replace />;
    } if (user.usertype === 'Secondary') {
      return <Navigate to="/secondary-dashboard" replace />;
    }
  }

  return children;
};
