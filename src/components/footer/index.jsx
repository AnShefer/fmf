import React from 'react';

import { Box, AppBar, Toolbar } from '@mui/material';

function Footer() {
  const footerStyle = {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '20px 0',
    boxShadow: 'none', 
  };

  const logoStyle = {
    width: '154px',
    height: 'auto',
  };

  return (
    <AppBar position="static" style={footerStyle}>
      <Toolbar>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
          <img src="/assets/logo.svg" alt="Logo" style={logoStyle} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
