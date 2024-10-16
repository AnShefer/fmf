import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import ReduxProvider from './lib/Redux/Reduxprovider';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <ReduxProvider>
        <Suspense>
          <App />
        </Suspense>
      </ReduxProvider>
      <ToastContainer autoClose={500} />
    </BrowserRouter>
  </HelmetProvider>
);
