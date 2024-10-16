import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, Button, Typography } from '@mui/material';

function Banner() {
  const navigate = useNavigate();

  return (
    <Grid
      container
      maxWidth="fullWidth"
      spacing={3}
      sx={{
        backgroundColor: '#fff',
        px: { xs: '20px', sm: '50px', md: '100px', lg: '150px' },
        pt: { xs: '20px', sm: '40px', md: '90px', lg: '120px' },
      }}
    >
      {/* Left Side */}
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          textAlign: { xs: 'center', sm: 'left' },
          px: { xs: '20px', sm: '20px', md: '20px', lg: '20px' },
        }}
      >
        <Typography
          sx={{
            background: 'linear-gradient(90deg, #003F91 6.62%, #1482F9 52.26%, #014092 96.48%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '30px', sm: '36px', md: '40px', lg: '40px' },
            fontWeight: '700',
            pt: { xs: '60px', sm: '60px', md: '70px', lg: '80px' },
            pb: '20px',
            lineHeight: 1.2,
          }}
        >
          Capture And Share Memories That Last Forever
        </Typography>
        <Typography
          paragraph
          sx={{
            fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '20 px' },
            fontWeight: 300,
            color: '#000',
            textAlign: { xs: 'center', sm: 'left' },
            // mt: { xs: "20px", sm: "20px", md: "10px", lg: "10px" },
            lineHeight: 1.2,
          }}
        >
          Leave meaningful messages for your loved ones to access whenever they need guidance
          throughout their lives. Ensure that your wisdom and support are always there for them,
          offering comfort and guidance whenever they need it most and make a lasting impact on the
          lives of those you care about.
        </Typography>
        <Button
          onClick={() => navigate('/sign-up')}
          variant="contained"
          sx={{
            background: 'linear-gradient(90deg, #003F91 6.62%, #1482F9 52.26%, #014092 96.48%)',
            borderRadius: '42px',
            px: { xs: '12px', sm: '16px', md: '20px', lg: '24px' },
            py: { xs: '8px', sm: '10px', md: '12px', lg: '14px' },
            mt: { xs: '20px', sm: '0', md: '10px', lg: '10px' },
            fontWeight: '500',
            color: 'white',
            transition: 'background-color 0.9s ease', // Adding transition for smooth animation
            '&:hover': {
              background:
                'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
            },
          }}
        >
          Create New Account
        </Button>
      </Grid>

      {/* Right Side */}
      <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: { xs: '20px', sm: '0' },
          }}
        >
          <Box
            component="img"
            src="/assets/banner.svg"
            alt="Logo"
            sx={{
              width: { xs: '300px', sm: '350px', md: '400px', lg: '458px' },
              height: { xs: '300px', sm: '350px', md: '400px', lg: '458px' },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Banner;
