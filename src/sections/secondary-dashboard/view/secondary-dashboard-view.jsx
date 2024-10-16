import React from 'react';

import { Box } from '@mui/material';

import SecondaryDashboardHeader from 'src/components/secondary-dashboard';

import SecondaryDashboard from '../secondary-dashboard';



const SecondaryDashboardView = () => (
  <Box
    sx={{
      backgroundImage: 'url(/assets/bac.svg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
    }}
  >
    <SecondaryDashboardHeader />
    <SecondaryDashboard />
  </Box>
   
);

export default SecondaryDashboardView;
