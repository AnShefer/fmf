import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const VideoPlayer = ({ src, initialMuted = true, autoPlay = true, controls = true }) => {
  const [isMuted] = useState(initialMuted);
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 9999,
        backdropFilter: 'blur(14px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <video
            style={{
              objectFit: 'contain',
              width: '70VW',
              maxHeight: '70vh',
            }}
            autoPlay={autoPlay}
            muted={isMuted}
            controls={controls}
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={src} type="video/mp4" />
            <track kind="captions" src="" srcLang="en" label="English" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>
    </Box>
  );
};
VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  initialMuted: PropTypes.bool,
  autoPlay: PropTypes.bool,
  controls: PropTypes.bool,
};
export default VideoPlayer;
