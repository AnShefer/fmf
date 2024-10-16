import { Helmet } from 'react-helmet-async';

import { SecondaryDashboardView } from 'src/sections/secondary-dashboard/view';


;

// ----------------------------------------------------------------------

export default function MainDashboardPage() {
  return (
    <>
      <Helmet>
        <title> Secondary Dashboard | Forever Messages </title>
      </Helmet>

      <SecondaryDashboardView />
    </>
  );
}
