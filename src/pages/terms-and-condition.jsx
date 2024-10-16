import { Helmet } from 'react-helmet-async';

import { TermsView } from 'src/sections/term-and-conditon/view';


;

// ----------------------------------------------------------------------

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title> Terms & Conditions | Forever Messages </title>
      </Helmet>

      <TermsView />
    </>
  );
}
