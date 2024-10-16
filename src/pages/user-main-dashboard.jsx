import { Helmet } from 'react-helmet-async';

import { MainDashboardView } from 'src/sections/user-main-dashboard/view';


;

// ----------------------------------------------------------------------

export default function MainDashboardPage() {
  return (
    <>
      <Helmet>
        <title> Main User Dashboard | Forever Messages </title>
      </Helmet>

      <MainDashboardView />
    </>
  );
}
