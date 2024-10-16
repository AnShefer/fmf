import React from 'react';

import { Box } from '@mui/material';

import DashboardHeader from 'src/components/main-dashboard';

import UserProfile from '../user-profile';
import ManageVideos from './user-profile-head';

// eslint-disable-next-line react/prop-types
const UserProfileView = ({ handleDeleteuser = () => {}, loading = false, CurrentUser = {} }) => (
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
    <DashboardHeader CurrentUser={CurrentUser} />
    <ManageVideos CurrentUser={CurrentUser} />
    <UserProfile handleDeleteuser={handleDeleteuser} loading={loading} CurrentUser={CurrentUser} />
  </Box>
);

export default UserProfileView;
