/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Toolbar,
  useTheme,
  Container,
  Typography,
  useMediaQuery,
} from '@mui/material';

// eslint-disable-next-line react/prop-types
const ForeverMessagesDashboard = ({ CurrentUser = {}, isTagDashboard=false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box sx={{ px: { sm: '50px', xs: '20px' } }}>
      <Container
        position="static"
        maxWidth="xl"
        sx={{ backgroundColor: '#fff', borderRadius: '20px' }}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
               <img
                  style={{ position: 'absolute', left: '0', height: '100%' }}
                  src="/assets/dashboardforever.svg"
                  alt="Logo"
                />
                <Typography sx={{ cursor: 'pointer', pl:{sm: '80px'},position:"relative" }}>
                  <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="14"
                      viewBox="0 0 26 14"
                      fill="none"
                      style={{ cursor: 'pointer' }}
                    >
                      <path
                        d="M24.5 6.45678H2.089C2.164 6.24778 2.287 6.05579 2.453 5.89179L6.401 1.84878C6.594 1.65179 6.59 1.33478 6.392 1.14178C6.195 0.949785 5.879 0.952785 5.685 1.15078L1.744 5.18678C1.27 5.65378 1.006 6.29178 1 6.95678C1.002 7.61478 1.258 8.25278 1.716 8.71778L5.639 12.8038C5.737 12.9058 5.868 12.9568 6 12.9568C6.125 12.9568 6.25 12.9108 6.346 12.8168C6.545 12.6268 6.552 12.3088 6.361 12.1098L2.433 8.01878C2.273 7.85678 2.154 7.66478 2.082 7.45678H24.5C24.776 7.45678 25 7.23278 25 6.95678C25 6.68078 24.776 6.45678 24.5 6.45678Z"
                        fill="black"
                        stroke="black"
                      />
                    </svg>
                  </Link>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: '#000',
                    fontSize: { xs: '12px', sm: '18px', md: '26px' },
                    fontWeight: 600,
                    pl: { sm: '16px' },
                    zIndex: 1,
                  }}
                >
                  {isTagDashboard ? 'Manage Tag Video Record' : `Manage Videos and Images for ${CurrentUser?.name}`}
                  
                </Typography>

               
              </Box>
            </Grid>
            <Grid item>
              <Link to="/dashboard">
                <img
                  src="/assets/logo.svg"
                  alt="Logo"
                  style={{ height: isMobile ? '60px' : '91px', width: isMobile ? '60px' : '91px' }}
                />
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default ForeverMessagesDashboard;
