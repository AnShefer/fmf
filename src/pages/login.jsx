import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Forever Messages </title>
      </Helmet>

      <LoginView />
    </>
  );
}
