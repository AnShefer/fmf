import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Grid, Toolbar, useTheme, Container, Typography, useMediaQuery } from '@mui/material';

const ForeverMessagesDashboard = () => {
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user = {} } = useSelector((state) => state.user);
  // console.log('🚀 ~ ForeverMessagesDashboard ~ user:', user);

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
                  // backgroundImage: 'url("/assets/dashboardforever.svg")',
                  // backgroundSize: "contain",
                  // backgroundRepeat: "no-repeat",
                  // backgroundPosition: "center left",
                  // height: isMobile ? "60px" : "91px",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:"start",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#000',
                    fontSize: { xs: '12px', sm: '18px', md: '26px' },
                    fontWeight: 600,
                    pl: "15px",
                    zIndex: 1,
                  }}
                >
                  Forever Messages Dashboard
                </Typography>

                <img
                  style={{ position: 'absolute', left: '-30px', height: '100%' }}
                  src="/assets/dashboardforever.svg"
                  alt="Logo"
                />
              </Box>
            </Grid>
            {/* <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={user?.image || ''}
                alt="Logo"
                style={{ height: isMobile ? '40px' : '60px', width: isMobile ? '40px' : '60px' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#000' }}>
                {user?.fullname}
              </Typography>
            </Grid> */}
          </Grid>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default ForeverMessagesDashboard;
