import { Helmet } from 'react-helmet-async';

import { SignUpView } from 'src/sections/sign-up';

// ----------------------------------------------------------------------

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title> Sign Up | Forever Messages </title>
      </Helmet>

      <SignUpView />
    </>
  );
}
