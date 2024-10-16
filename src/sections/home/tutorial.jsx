/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState } from 'react';

import { Box, Grid, Container, Typography } from '@mui/material';

function TutorialVideo() {
  // State to keep track of the currently playing video
  // eslint-disable-next-line no-unused-vars
  const [playingVideo, setPlayingVideo] = useState(null);

  // Refs for the video elements
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  // Function to handle video play
  const handlePlay = (videoId) => {
    // Pause the other video
    if (videoId === 'video1') {
      if (videoRef2.current) videoRef2.current.pause();
    } else if (videoId === 'video2') {
      if (videoRef1.current) videoRef1.current.pause();
    }

    // Update the state
    setPlayingVideo(videoId);
  };

  return (
    <Container maxWidth="xl" sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', zIndex: '-1', top: '-300px', right: '0' }}>
        <img src="/assets/homeback.svg" alt="Background" />
      </Box>
      <Box
        sx={{
          px: { xs: '20px', sm: '30px', md: '50px', lg: '100px' },
          py: { xs: '20px', sm: '30px', md: '40px', lg: '60px' },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            color: '#000',
            fontSize: { xs: '24px', sm: '30px', md: '36px', lg: '44px' },
            fontWeight: '600',
            pb: { xs: '20px', sm: '30px', md: '40px', lg: '68px' },
          }}
        >
          Tutorial Videos
        </Typography>

        <Grid container spacing="122px">
          {/* Left Side */}
          <Grid item xs={12} sm={12} md={6} alignItems="center">
            <Typography
              variant="h5"
              sx={{
                fontWeight: '500',
                fontSize: { xs: '18px', sm: '20px', md: '22px', lg: '24px' },
                color: '#6DAB24',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Profile - how to leave messages
            </Typography>
            <Box>
              {/* Video 1 */}
              <video
                width="100%"
                height="100%"
                controls
                style={{ borderRadius: '20px', }}
                ref={videoRef1}
                onPlay={() => handlePlay('video1')}
              >
                <source
                  src="https://forever-messages-dev-01.syd1.cdn.digitaloceanspaces.com/VideoA.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} sm={12} md={6}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: '500',
                fontSize: { xs: '18px', sm: '20px', md: '22px', lg: '24px' },
                color: '#6DAB24',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              User - how to access messages
            </Typography>
            <Box>
              {/* Video 2 */}
              <video
                width="100%"
                height="100%"
                controls
                style={{ borderRadius: '20px' }}
                ref={videoRef2}
                onPlay={() => handlePlay('video2')}
              >
                <source
                  src="https://forever-messages-dev-01.syd1.cdn.digitaloceanspaces.com/Videob.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default TutorialVideo;
