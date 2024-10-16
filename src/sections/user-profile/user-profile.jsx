/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
// import Buffer from 'buffer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Button,
  Container,
  CardMedia,
  Typography,
  IconButton,
  useMediaQuery,
  CircularProgress,
  CardHeader,
  CardContent,
} from '@mui/material';

import { GET_USER_MEDIAS } from 'src/constants/apiEndPoints';

import EditMediaDialog from 'src/components/edit';
import EditVideo from 'src/components/edit-video';
import EditUserDialog from 'src/components/edit-user';
import UploadDialog from 'src/components/upload-image-video/index ';

import httpRequest from '../../axios';

// eslint-disable-next-line react/prop-types
const UserProfile = ({ handleDeleteuser = () => {}, loading = false, CurrentUser = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const [previewPopup, setPreviewPopup] = useState(false);
  const [viewableContent, setViewableContent] = useState({
    contentType: null,
    src: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openEditVideo, setOpenEditVideo] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [AllImages, setAllImages] = useState([]);
  const [AllVideos, setAllVideos] = useState([]);
  const videoRefs = useRef([]);
  const currentVideoRef = useRef(null);
  const [EditMedia, setEditMedia] = useState({});
  const [Edittype, setEdittype] = useState('');
  const [fetchingMedia, setFetchingMedia] = useState(false);
  const handleVideoSelect = (src, type) => {
    setViewableContent({
      contentType: type,
      src,
    });
    setPreviewPopup(true);
  };

  // eslint-disable-next-line consistent-return

  const fetchMedia = async () => {
    try {
      setFetchingMedia(true);
      const response = await httpRequest.get(`${GET_USER_MEDIAS}/${id}/media`);

      if (response.status === 200) {
        const { videos, images } = response.data;
        // console.log(response.data);

        // const processedVideos = videos.map((video) => {
        //   try {
        //     const blob = base64ToBlob(video.fileBlob, 'video/mp4');
        //     const url = URL.createObjectURL(blob);

        //     return { ...video, file: url };
        //   } catch (err) {
        //     console.error('Error processing video', err);
        //     return video;
        //   }
        // });

        // const processedImages = images.map((image) => {
        //   try {
        //     const blob = base64ToBlob(image.fileBlob, 'image/jpeg'); // Assuming image/jpeg is correct
        //     const url = URL.createObjectURL(blob);
        //     return { ...image, file: url };
        //   } catch (err) {
        //     console.error('Error processing image', err);
        //     return image;
        //   }
        // });

        setAllImages(images);
        setAllVideos(videos);

        setFetchingMedia(false);
      }
    } catch (error) {
      console.error('Fetch media error', error);
      toast.error(error.response?.data?.message || 'An error occurred while fetching media.');

      setFetchingMedia(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenEditVideo = (media, type) => {
    setOpenEditVideo(true);
    setEditMedia(media);
    setEdittype(type);
  };

  const handleCloseEditVideo = () => {
    setOpenEditVideo(false);
  };

  const handleOpenEditUser = () => {
    setOpenEditUser(true);
  };

  const handleCloseEditUser = () => {
    setOpenEditUser(false);
  };

  const handleOpenDeleteUser = () => {
    setOpenDeleteUser(true);
  };

  const handleConfirmDisableUser = () => {
    handleDeleteuser();
  };

  const handlePlay = (index) => {
    if (currentVideoRef.current && currentVideoRef.current !== videoRefs.current[index]) {
      currentVideoRef.current.pause();
    }
    currentVideoRef.current = videoRefs.current[index];
  };

  return (
    <Box sx={{ pt: '40px', pb: '40px', px: isMobile ? '20px' : '50px' }}>
      {previewPopup && (
        <Box
          sx={{
            position: 'relative',
          }}
        >
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
                {viewableContent.contentType === 'video' && (
                  <video
                    style={{
                      objectFit: 'contain',
                      height: '70vh',
                    }}
                    controls
                    controlsList="nodownload"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    src={viewableContent.src}
                  />
                )}
                {viewableContent.contentType === 'image' && (
                  <img
                    src={viewableContent.src}
                    style={{
                      objectFit: 'contain',
                      height: '70vh',
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                    alt="The file"
                  />
                )}
                <Button
                  onClick={() => {
                    setPreviewPopup(false);
                    setViewableContent({
                      contentType: '',
                      src: '',
                    });
                  }}
                  sx={{ backgroundColor: '#fff', mt: '20px' }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Container
        maxWidth="xl"
        sx={{
          py: { md: '40px', xs: '15px' },
          backgroundColor: '#fff',
          borderRadius: '20px',
          px: isMobile ? '20px' : '50px',
        }}
        disableGutters
      >
        {fetchingMedia && (
          <Box
            sx={{
              position: 'relative',
            }}
          >
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
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 300,
                    fontSize: '24px',
                    color: 'white',
                    textAlign: 'center',
                    my: '20px',
                  }}
                >
                  Please hold tight—we&apos;are securely loading your data with end-to-end
                  encryption to keep you safe.
                </Typography>
                <CircularProgress size={80} />
              </Box>
            </Box>
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={2}
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <Box sx={{ display: 'flex', gap: '12px', mb: isMobile ? 2 : 0 }}>
            <Box>
              <Button
                onClick={handleOpenDialog}
                variant="contained"
                sx={{
                  fontSize: '13px',
                  fontWeight: 500,
                  borderRadius: '44px',
                  padding: '9px 17px',
                  textTransform: 'none',
                  background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                  transition: 'background-color 0.9s ease', // Adding transition for smooth animation
                  '&:hover': {
                    background:
                      'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                  },
                }}
              >
                Upload Video or Image
              </Button>
              <UploadDialog
                userId={id}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                fetchMedia={fetchMedia}
              />
            </Box>
          </Box>
          <Box>
            <Box>
              <Button
                onClick={handleOpenEditUser}
                variant="contained"
                sx={{
                  fontSize: '13px',
                  fontWeight: 500,
                  borderRadius: '44px',
                  padding: '9px 17px',
                  textTransform: 'none',
                  background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                  transition: 'background-color 0.9s ease', // Adding transition for smooth animation
                  '&:hover': {
                    background:
                      'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                  },
                }}
              >
                Edit User
              </Button>
              <EditUserDialog
                CurrentUser={CurrentUser}
                openDialog={openEditUser}
                handleCloseDialog={handleCloseEditUser}
              />
            </Box>
            {/* <Box>
              <Button
                onClick={handleOpenDeleteUser}
                variant="contained"
                sx={{
                  fontSize: '13px',
                  fontWeight: 500,
                  borderRadius: '44px',
                  padding: '9px 17px',
                  textTransform: 'none',
                  background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                  transition: 'background-color 0.9s ease', // Adding transition for smooth animation
                  '&:hover': {
                    background:
                      'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                  },
                }}
              >
                Delete
              </Button>
              <ConfirmationDialog
                openDialog={openDeleteUser}
                loading={loading}
                setOpenDialog={setOpenDeleteUser}
                handleConfirmDisableUser={handleConfirmDisableUser}
              />
            </Box> */}
          </Box>
        </Box>
        <Typography variant="h6" sx={{ fontSize: { md: '26px' }, fontWeight: 600, color: '#000' }}>
          Images ({AllImages?.length || 0})
        </Typography>
        <Box
          sx={{
            overflowX: 'auto',
            display: 'flex',
            gap: 2,
            py: 2,
            '&::-webkit-scrollbar': {
              height: '16px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#024397',
              color: '#F2F3F5',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-track': {
              borderRadius: '10px',
              backgroundColor: '#F2F3F5',
            },
          }}
        >
          {AllImages?.map((image, index) => (
            <Card
              key={index}
              sx={{
                width: '187px',
                height: '187px',
                borderRadius: '10px',
                flex: '0 0 auto',
                position: 'relative',
              }}
            >
              <CardMedia
                onClick={() => handleVideoSelect(image?.file, 'image')}
                component="img"
                height="100%"
                width="100%"
                image={image?.file}
                alt={`Image ${index + 1}`}
                sx={{ borderRadius: '10px' }}
              />
              <Typography
                sx={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  position: 'absolute',
                  bottom: '0%',
                  left: '0%',
                  padding: '10px',
                  textAlign: 'center',
                  // transform: 'translate(-50%, -50%)',
                  background: 'rgba(0, 0, 0, 0.3)',
                }}
              >
                {image?.title}
              </Typography>

              <Box>
                <IconButton
                  onClick={() => handleOpenEditVideo(image, 'image')}
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                  }}
                >
                  <img src="/assets/editicon.svg" alt="Edit icon" />
                </IconButton>
              </Box>
            </Card>
          ))}
          <EditMediaDialog openDialog={openEditDialog} handleCloseDialog={handleCloseEditDialog} />
        </Box>
        <Box mt={2}>
          <Typography
            variant="h6"
            sx={{ fontSize: { md: '26px' }, fontWeight: 600, color: '#000' }}
          >
            Videos ({AllVideos?.length || 0})
          </Typography>
          <Box
            sx={{
              overflowX: 'auto',
              display: 'flex',
              gap: 2,
              py: 2,
              '&::-webkit-scrollbar': {
                height: '16px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#024397',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-track': {
                borderRadius: '10px',
                backgroundColor: '#F2F3F5',
              },
            }}
          >
            {AllVideos?.map((video, index) => (
              <Card
                key={video?._id}
                sx={{
                  minWidth: '187px',
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
                    width: '187px',
                    height: '120px',
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
                  onClick={() => handleVideoSelect(video?.file, 'video')}
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
                    {video?.title}
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
                <Box>
                  <IconButton
                    onClick={() => handleOpenEditVideo(video, 'video')}
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                    }}
                  >
                    <img src="/assets/editicon.svg" alt="Edit icon" />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
      <EditVideo
        Edittype={Edittype}
        userId={id}
        fetchMedia={fetchMedia}
        openDialog={openEditVideo}
        handleCloseDialog={handleCloseEditVideo}
        EditMedia={EditMedia}
      />
    </Box>
  );
};

export default UserProfile;
