import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearUser } from 'src/lib/Redux/slices/userslice';

const useInactivityTimeout = (timeout = 300000) => {
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Function to log the user out
  const logout = () => {
    navigate('/login', { replace: true });
    dispatch(clearUser());
    localStorage.clear();
  };

  // Function to reset the inactivity timer
  const resetTimer = () => {
    const currentTime = Date.now();
    localStorage.setItem('lastActivityTime', currentTime);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      logout();
    }, timeout);
  };

  // Check if the user should be logged out based on inactivity when the component mounts
  const checkInactivity = () => {
    const lastActivityTime = localStorage.getItem('lastActivityTime');
    if (lastActivityTime) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastActivityTime;

      if (elapsedTime > timeout) {
        logout();
      } else {
        resetTimer(); // Reset the timer if user is still within the allowed time
      }
    }
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

    // Add event listeners
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Set initial timer and check for inactivity on mount
    checkInactivity();

    return () => {
      // Cleanup event listeners
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, timeout]);

  return { resetTimer }; // Return resetTimer if you want to manually reset the timer elsewhere
};

export default useInactivityTimeout;
