// CircularProgressWithLabel.jsx
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// eslint-disable-next-line react/prop-types
function CircularProgressWithLabel({ value }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{ color: 'white' }} size="1.5rem" variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{ fontSize: '8px', color: 'white' }}
          variant="caption"
          component="div"
          color="white"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
