import { Helmet } from 'react-helmet-async';

import { SecurityView } from 'src/sections/security/view';


;

// ----------------------------------------------------------------------

export default function SecurityPage() {
  return (
    <>
      <Helmet>
        <title> Security | Forever Messages </title>
      </Helmet>

      <SecurityView />
    </>
  );
}
