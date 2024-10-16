import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { PROTECTED } from 'src/constants/apiEndPoints';
import { clearUser } from 'src/lib/Redux/slices/userslice';

import httpRequest from '../axios';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated = false, user = {} } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [accessGranted, setAccessGranted] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const checkAccess = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return navigate('/login', { replace: true });
      }

      try {
        // Replace with your protected route API URL
        const response = await httpRequest.get(PROTECTED);

        if (response.data.accessGranted) {
          if (requiredRole && user?.usertype !== requiredRole) {
            setLoading(false);
            return navigate('/', { replace: true });
          }
        } else {
          setAccessGranted(false);
          dispatch(clearUser());
          navigate('/login', { replace: true });
        }
      } catch (error) {
        setAccessGranted(false);
        dispatch(clearUser());
        navigate('/login', { replace: true });
      }

      setLoading(false);
    };

    checkAccess();
  }, [location.pathname, isAuthenticated, requiredRole, user?.usertype, navigate, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accessGranted) {
    return null;
  }

  return children;
};
