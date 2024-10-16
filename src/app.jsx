/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-unresolved
import 'src/global.css';

// eslint-disable-next-line import/no-unresolved
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

// eslint-disable-next-line import/no-unresolved
import Router from 'src/routes/sections';
// eslint-disable-next-line import/no-unresolved
import ThemeProvider from 'src/theme';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useInactivityTimeout from './components/userInactivity';

// ----------------------------------------------------------------------
const logOutRoutes = ['/', '/terms', '/privacy', '/security', '/about-us', '/contact'];
export default function App() {
  const location = useLocation();
  useEffect(() => {
    if (logOutRoutes.includes(location.pathname)) {
      localStorage.clear();
    }
  }, [location.pathname]);

  useScrollToTop();
  useInactivityTimeout(300000);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
