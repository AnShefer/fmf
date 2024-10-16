import React from 'react';

import { Box, Grid, AppBar, Toolbar, Typography } from '@mui/material';

const CustomAppBar = () => (
  <Box pb="40px">
    <AppBar position="static" sx={{ backgroundColor: '#FFF', boxShadow: 'none' }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between" px="10px">
          <Grid item>
            <Typography variant="h6">
              <img src="/assets/logo.svg" alt="Logo" />
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </Box>
);

export default CustomAppBar;


