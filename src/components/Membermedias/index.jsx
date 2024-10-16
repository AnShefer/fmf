/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, Typography } from '@mui/material';

const PhotosVideos = ({ items, showAll, setCurrentMedias = () => {}, setDownloading = false }) => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  if (!showAll) return null;

  const handlePlay = (item) => {
    setPlayingVideoId(item?.id);
    setCurrentMedias({});
    setDownloading(true);

    setTimeout(() => {
      setCurrentMedias(item);
      setDownloading(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        overflowY: 'auto',
        maxHeight: 400,
        '&::-webkit-scrollbar': { width: 8 },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#024397',
          borderRadius: '4px',
        },
      }}
    >
      <Grid container spacing={2}>
        {items?.map((item) => (
          <Grid item xs={6} key={item?.id}>
            {item.type === 'video' ? (
              <Box sx={{ position: 'relative', cursor: 'pointer' }}>
                {/* <video
                  controlsList="nodownload"
                  // disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  muted
                  style={{
                    width: '100%',
                    height: '170px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                  onClick={() => handlePlay(item)}
                  onPlay={() => handlePlay(item)}
                  ref={(video) => {
                    if (video && playingVideoId !== item.id) {
                      video.pause();
                    }
                  }}
                >
                  <source src={item?.thumbnail} type="video/mp4" />

                </video> */}
                <Card
                  key={item?._id}
                  sx={{
                    flex: '0 0 auto',
                    position: 'relative',
                    borderRadius: '10px',
                    height: '185px',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: '170px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#F2F3F5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',

                      '&:hover': {
                        background: '#ADADAD',
                        // transition: 'all 0.1s ease',
                      },
                    }}
                    onClick={() => handlePlay(item)}
                    onContextMenu={(e) => e.preventDefault()}
                    onPlay={() => handlePlay(item)}
                  >
                    <Typography
                      sx={{
                        maxWidth: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#0859BA',
                        position: 'absolute',
                        top: '90%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {item?.title}
                    </Typography>
                    <Box
                      component="img"
                      src="/assets/play.svg"
                      sx={{
                        width: '40px',
                        height: '40px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                        // visibility: 'hidden',

                        '&:hover': {
                          visibility: 'visible',
                        },
                      }}
                    />
                    {/* <video
                    controls
                    id="videoPlayer"
                    src={video?.file}
                    // eslint-disable-next-line no-return-assign
                    ref={(el) => (videoRefs.current[index] = el)}
                    onPlay={() => handlePlay(index)}
                    style={{ width: '187px', height: '187px', objectFit: 'cover' }}
                  /> */}
                  </Box>
                </Card>
              </Box>
            ) : (
              <Box sx={{ position: 'relative' }}>
                <img
                  src={item.thumbnail}
                  alt={item.type}
                  style={{
                    width: '100%',
                    height: '170px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="button"
                  tabIndex="0"
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={() => handlePlay(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handlePlay(item);
                    }
                  }}
                />
                <Typography
                  sx={{
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#fff',
                    position: 'absolute',
                    bottom: '0%',
                    left: '0%',
                    padding: '10px',
                    textAlign: 'center',
                    // transform: 'translate(-50%, -50%)',
                    background: 'rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {item?.title}
                </Typography>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PhotosVideos;
