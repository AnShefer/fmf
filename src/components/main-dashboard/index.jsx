/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { Box, Grid, Menu, AppBar, Toolbar, MenuItem, Typography, IconButton } from '@mui/material'; // Import useNavigate

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clearUser } from 'src/lib/Redux/slices/userslice';

import ProfileSettingDialog from '../profile-setting';

const DashboardHeader = () => {
  const [openProfileSetting, setOpenProfileSetting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user = {} } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenProfileSetting = () => {
    setOpenProfileSetting(true);
  };

  const handleCloseProfileSetting = () => {
    setOpenProfileSetting(false);
  };

  const handleMenuClick = (event) => {

    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileSettingClick = () => {
    handleMenuClose();
    handleOpenProfileSetting();
  };

  const handleLogoutClick = () => {
    dispatch(clearUser());
    navigate('/login');
    handleMenuClose();
    localStorage.clear();
  };

  return (
    <Box pb="40px">
      <AppBar position="static" sx={{ backgroundColor: '#FFF', boxShadow: 'none' }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between" px="10px">
            <Grid item>
              <Typography
                variant="h6"
                // sx={{ color: '#000', fontSize: { md: '30px', sm: '24px' }, fontWeight: 600 }}
              >
              {/* Dashboard */}
                <img src="/assets/logo.svg" alt="Logo"/>
              </Typography>
            </Grid>
            <Grid item>
              <Box
                onClick={handleMenuClick}
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              > <Typography color='#000' sx={{ fontWeight: 700, mr: '10px' ,}}>
                {user?.fullname}
              </Typography>
                <img
                  src={user?.image}
                  alt="Profile"
                  style={{ height: '40px', width: '40px', borderRadius: '50%' }}
                />
                <IconButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.82497 7.66529C7.36938 8.11157 6.63065 8.11157 6.17506 7.66529L0.341706 1.95099C-0.113902 1.50467 -0.113902 0.781054 0.341706 0.334733C0.797325 -0.111578 1.53601 -0.111578 1.99163 0.334733L7.00001 5.24093L12.0084 0.334733C12.464 -0.111578 13.2027 -0.111578 13.6583 0.334733C14.1139 0.781054 14.1139 1.50467 13.6583 1.95099L7.82497 7.66529Z"
                      fill="black"
                    />
                  </svg>
                </IconButton>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleProfileSettingClick}>Profile Settings</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
              <ProfileSettingDialog
                loginuser={user}
                openDialog={openProfileSetting}
                handleCloseDialog={handleCloseProfileSetting}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashboardHeader;
