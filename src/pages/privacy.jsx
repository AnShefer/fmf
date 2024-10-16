import { Helmet } from 'react-helmet-async';

import { PrivacyView } from 'src/sections/privacy/view';

// ----------------------------------------------------------------------

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title> Privacy Policy | Forever Messages </title>
      </Helmet>

      <PrivacyView />
    </>
  );
}
