/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  Box,
  Card,
  Grid,
  Button,
  Avatar,
  Container,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

import NewUserDialog from 'src/components/new-user';
import BuyTagDialog from 'src/components/buy-tag-form';

import {  GET_USER_TAG_DATA } from 'src/constants/apiEndPoints';

import httpRequest from '../../axios';

// UserCard component
// eslint-disable-next-line react/prop-types
const UserCard = ({
  name,
  videos,
  images,
  imageUrl,
  onDisableUser,
  // eslint-disable-next-line react/prop-types
  userId,
  // eslint-disable-next-line react/prop-types
  status,
  // eslint-disable-next-line react/prop-types
  disableduser,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleConfirmDisableUser = () => {
    disableduser();
    setOpenDialog(false);
  };
  const navigate = useNavigate();

  const handleDisableUser = () => {
    setOpenDialog(true);
    onDisableUser(userId);
  };

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '300px' },
        mb: 2,
        borderRadius: '30px',
        position: 'relative',
        paddingTop: '60px',
        overflow: 'visible',
        boxShadow: '3px 4px 4px 0px rgba(0, 0, 0, 0.18)',
      }}
    >
      <Avatar
        sx={{
          width: '90px',
          height: '90px',
          position: 'absolute',
          top: '-45px',
          left: '50%',
          transform: 'translateX(-50%)',
          border: '2px solid #1481F8',
        }}
        src={imageUrl}
        alt={name}
      />
      <CardContent sx={{ textAlign: 'center', paddingTop: 0 }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{name}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: 4,
            mt: 1,
          }}
        >
          <Box>
            <Typography component="div" sx={{ fontSize: '16px', fontWeight: 600 }}>
              {videos}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '12px', fontWeight: 300 }}
            >
              Videos
            </Typography>
          </Box>
          <Box>
            <Typography component="div" sx={{ fontSize: '16px', fontWeight: 600 }}>
              {images}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '12px', fontWeight: 300 }}
            >
              Images
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', gap: 1, pb: '23px' }}>
        <Button
          onClick={() => navigate(`/user-profile/${userId}`)}
          variant="contained"
          sx={{
            fontSize: '13px',
            fontWeight: 500,
            borderRadius: '44px',
            background: 'linear-gradient(90deg, #04479C 4.83%, #147DF0 50.56%, #03469B 94.18%)',
            padding: '9px 17px',
            transition: 'background-color 0.9s ease',
            '&:hover': {
              background:
                'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
            },
          }}
        >
          View Profile
        </Button>
        <Button
          variant="contained"
          sx={{
            fontSize: '13px',
            fontWeight: 500,
            borderRadius: '44px',
            backgroundColor: '#F71A1A',
            padding: '9px 17px',
            '&:hover': {
              backgroundColor: '#8e0808',
            },
          }}
          onClick={() => handleDisableUser(true)}
        >
          {status ? 'Disable User' : 'Enable User'}
        </Button>
      </CardActions>
      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            px: '20px',
            py: { sm: '50px', xs: '15px' },
            borderRadius: '20px',
            background: '#FFF',
            boxShadow:
              '-2px -2px 13.3px 0px rgba(0, 0, 0, 0.15), 3px 4px 9.7px 0px rgba(0, 0, 0, 0.17)',
          },
        }}
      >
        <DialogContent>
          <Typography sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'center' }}>
            Are You Sure?
          </Typography>
          <Typography sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'center' }}>
            You Want To {status ? 'Disable' : 'Enable'} This?
          </Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 500, textAlign: 'center' }}>
            {status ? '(This will be temporary)' : ''}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            flexDirection: 'column',
            pb: '20px',
            gap: '15px',
          }}
        >
          <Button
            onClick={handleConfirmDisableUser}
            sx={{
              backgroundColor: '#F71A1A',
              color: '#FFF',
              width: '100%',
              borderRadius: '53px',
              '&:hover': {
                backgroundColor: '#EB5757',
              },
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
              color: '#FFF',
              width: '100%',
              mr: '11 px',
              borderRadius: '53px',
              '&:hover': {
                background: 'linear-gradient(360deg, #024397 10%, #147FF4 92.5%, #014092 100%)',
              },
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

// Define prop types for UserCard
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  videos: PropTypes.number.isRequired,
  images: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onDisableUser: PropTypes.func.isRequired,
};

// Main component
// eslint-disable-next-line react/prop-types
const UserDashboard = ({
  allSubusers = [],
  getSubusers = () => { },
  setDisableuser = () => { },
  disableduser = () => { },
}) => {
  const [openNewUser, setOpenNewUser] = useState(false);
  const [buyTag, setBuyTag] = useState(false);
  const [hasTag, setHasTag] = useState(false);
  const [showVideo, setShowVideo] = useState(true);


  const handleBuyTag = () => {
    setBuyTag(true);
  };
  const handleCloseBuyTag = async () => {
    setBuyTag(false);
    setUserTagData();
  };

  const handleOpenNewUser = () => {
    setOpenNewUser(true);
  };

  const handleCloseNewUser = () => {
    setOpenNewUser(false);
  };

  const handleViewTutorialClick = () => {
    setShowVideo(true);
  };

  const handleHideTutorialClick = () => {
    setShowVideo(false);
  };

  const setUserTagData = async () => {
    const userTagData =  await httpRequest.get(GET_USER_TAG_DATA);
    setHasTag(userTagData?.data?.hasTag);
  }
  const navigate = useNavigate();

  useEffect(() => {
    setUserTagData();
  }, []);

  return (
    <Box sx={{ px: { md: '50px', sm: '50px' }, pl: { md: '0px', sm: '39px' } }}>

      <Container maxWidth="xl" sx={{ height: '100vh', overflowY: 'auto' }} disableGutters>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            py: '20px',
          }}
        >

          <Grid container spacing={2} alignItems="top">
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {hasTag ? (
                  <Button
                  onClick={() => navigate(`/manage-tag-video-records`)}
                    variant="contained"
                    size="large"
                    sx={{
                      fontSize: { xs: '16px', sm: '20px', lg: '24px' },
                      fontWeight: 600,
                      borderRadius: '65px',
                      px: { xs: '20px', md: '59px' },
                      background:
                        'linear-gradient(90deg, #04479C 4.83%, #147DF0 50.56%, #03469B 94.18%)',
                      transition: 'background-color 0.9s ease',
                      '&:hover': {
                        background:
                          'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                      },
                    }}
                  >
                    Manage Your Tag Video
                  </Button>
                ) : (
                  <Button
                    onClick={handleBuyTag}
                    variant="contained"
                    size="large"
                    sx={{
                      fontSize: { xs: '16px', sm: '20px', lg: '24px' },
                      fontWeight: 600,
                      borderRadius: '65px',
                      px: { xs: '20px', md: '59px' },
                      background:
                        'linear-gradient(90deg, #04479C 4.83%, #147DF0 50.56%, #03469B 94.18%)',
                      transition: 'background-color 0.9s ease',
                      '&:hover': {
                        background:
                          'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                      },
                    }}
                  >
                    Buy Your Tag
                  </Button>



                )}

              </Box>
              <BuyTagDialog
                getSubusers={getSubusers}
                openDialog={buyTag}
                handleCloseDialog={handleCloseBuyTag}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={handleOpenNewUser}
                  variant="contained"
                  size="large"
                  sx={{
                    fontSize: { xs: '16px', sm: '20px', lg: '24px' },
                    fontWeight: 600,
                    borderRadius: '65px',
                    px: { xs: '20px', md: '59px' },
                    background:
                      'linear-gradient(90deg, #04479C 4.83%, #147DF0 50.56%, #03469B 94.18%)',
                    transition: 'background-color 0.9s ease',
                    '&:hover': {
                      background:
                        'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                    },
                  }}
                >
                  Create Users Family & Friends
                </Button>
                <NewUserDialog
                  getSubusers={getSubusers}
                  openDialog={openNewUser}
                  handleCloseDialog={handleCloseNewUser}
                />
              </Box>

              
            </Grid>
          </Grid>
          <Container maxWidth="xl" sx={{ height: '100%', overflowY: 'auto' }} disableGutters> {/* 100vh */}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    py: '20px',
                  }}
                >

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={8}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: '24px', sm: '30px' },
                          pl: { sm: '0px', xs: '20px', md: '50px' },
                          color: '#000',
                        }}
                      >
                        All Users
                      </Typography>
                    </Grid>

                    
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'left',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                          Tutorial:
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: '14px', fontWeight: 400, color: '#6DAB24' }}
                        >
                          How to leave messages
                        </Typography>
                        {showVideo && (
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '12px',
                              color: '#03469B',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              ml: 1,
                            }}
                            onClick={handleHideTutorialClick}
                          >
                            Hide Tutorial
                          </Typography>
                        )}
                        {!showVideo ? (
                          <Button
                            variant="contained"
                            onClick={handleViewTutorialClick}
                            sx={{
                              fontSize: { xs: '16px', sm: '18px', lg: '18px' },
                              fontWeight: 500,
                              borderRadius: '65px',
                              px: { xs: '18px', md: '20px' },
                              background:
                                'linear-gradient(90deg, #04479C 4.83%, #147DF0 50.56%, #03469B 94.18%)',
                              transition: 'background-color 0.9s ease',
                              '&:hover': {
                                background:
                                  'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                              },
                            }}
                          >
                            View Tutorial
                          </Button>
                        ) : (
                          <Box
                            sx={{
                              borderRadius: '10px',
                              width: { xs: '250px', md: '250px', sm: '250px' },
                              height: { xs: '150px', md: '150px', sm: '150px' },
                              mt: 1,
                              position: 'relative',
                            }}
                          >
                            <video width="100%" height="100%" controls style={{ borderRadius: '15px' }}>
                              <source
                                src="https://forever-messages-dev-01.syd1.cdn.digitaloceanspaces.com/VideoA.mp4"
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '12px',
                                color: '#000',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                mr: 1,
                                mb: 1,
                              }}
                              onClick={handleHideTutorialClick}
                            >
                              Hide Tutorial
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      pl: { lg: '50px', xs: '0px', sm: '0px', md: '0px' },
                      maxHeight: 'calc(100vh - 170px)',
                      overflowY: 'auto',
                      mt: 2,
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 2,
                      '&::-webkit-scrollbar': {
                        width: '12px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#024397',
                        borderRadius: '14px',
                        height: '50px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#FFF',
                        borderRadius: '14px',
                      },
                    }}
                  >
                    <Grid container spacing={2} sx={{ px: { sm: '0px', xs: '12px' }, pl: { md: '0px' } }}>
                      {allSubusers.length > 0 ? (
                        allSubusers.map((item) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={item?._id}
                            sx={{ marginTop: { xs: '60px', sm: '90px' } }}
                          >
                            <UserCard
                              sx={{ fontSize: '16px', fontWeight: 600 }}
                              name={item.name}
                              videos={item?.videos?.length}
                              images={item?.images?.length}
                              imageUrl={item.profilePic}
                              onDisableUser={setDisableuser}
                              userId={item?._id}
                              status={item?.status}
                              disableduser={disableduser}
                            />
                          </Grid>
                        ))
                      ) : (
                        <Typography
                          sx={{
                            fontSize: {
                              xs: '14px',
                              sm: '18px',
                              marginTop: '20px',
                              color: '#6DAB24',
                              fontWeight: '600',
                            },
                          }}
                        >
                          YOUR USER LIST IS CURRENTLY EMPTY
                        </Typography>
                      )}
                    </Grid>
                  </Box>
                </Box>
              </Container>

        </Box>
      </Container>

    </Box>
  );
};

export default UserDashboard;
