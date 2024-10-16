/* eslint-disable consistent-return */
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

import {
  Box,
  Grid,
  Dialog,
  Button,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { BUY_TAG } from 'src/constants/apiEndPoints';
import httpRequest from '../../axios';

// eslint-disable-next-line react/prop-types
const BuyTagDialog = ({ openDialog, handleCloseDialog, getSubusers = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [appartment, setAppartment] = useState('');
  const [suburb, setSuburb] = useState('');
  const [statecode, setStatecode] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');
  const [passError, setpassError] = useState(false);
  const handleSubmit = async () => {
    if (!firstName) {
      return toast.error('Please enter first name');
    }
    if (!lastName) {
      return toast.error('Please enter last name');
    }
    if (!streetAddress) {
      return toast.error('Please enter street address');
    }
    if (!suburb) {
      return toast.error('Please enter suburb');
    }
    if (!statecode) {
      return toast.error('Please enter state');
    }  
    if (!postcode) {
      return toast.error('Please enter postcode');
    }
    if (!phone) {
      return toast.error('Please enter phone number');
    }
    setLoading(true);
    const payload = {
      shippingAddress: {
        streetAddress,
        unit: appartment,
        suburb,
        state: statecode,
        postcode,
      },
      firstName,
      lastName,
      phone,
    };
    try {
      const response = await httpRequest.post(BUY_TAG, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        handleEmpty();
        handleCloseDialog();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmpty = () => {
    setFirstName('');
    setLastName('');
    setStreetAddress('');
    setAppartment('');
    setSuburb('');
    setStatecode('');
    setPostcode('');
    setPhone('');
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          width: '984px',
          height: '709px',
        },
      }}
      BackdropProps={{
        style: {
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)', // For Safari
        },
      }}
    >
      <DialogTitle>
        <IconButton onClick={handleCloseDialog}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="14"
            viewBox="0 0 26 14"
            fill="none"
          >
            <path
              d="M24.5 6.45678H2.089C2.164 6.24778 2.287 6.05579 2.453 5.89179L6.401 1.84878C6.594 1.65179 6.59 1.33478 6.392 1.14178C6.195 0.949785 5.879 0.952785 5.685 1.15078L1.744 5.18678C1.27 5.65378 1.006 6.29178 1 6.95678C1.002 7.61478 1.258 8.25278 1.716 8.71778L5.639 12.8038C5.737 12.9058 5.868 12.9568 6 12.9568C6.125 12.9568 6.25 12.9108 6.346 12.8168C6.545 12.6268 6.552 12.3088 6.361 12.1098L2.433 8.01878C2.273 7.85678 2.154 7.66478 2.082 7.45678H24.5C24.776 7.45678 25 7.23278 25 6.95678C25 6.68078 24.776 6.45678 24.5 6.45678Z"
              fill="black"
              stroke="black"
            />
          </svg>
        </IconButton>
        <Box>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: { sm: '30px', xs: '20px' },
              pb: { sm: '10px', xs: '5px' },
            }}
          >
            Buy a tag
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        
        <Grid sx={{ px: { sm: '50px' } }} container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>First Name</Typography>
              <TextField
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Harry"
                sx={{
                  px: 1,
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                      >
                        <path
                          d="M4.57826 0.744842C5.14737 0.35688 5.81613 0.15 6.5 0.15C7.41696 0.15 8.29699 0.521608 8.94632 1.18408C9.59574 1.84665 9.96111 2.74592 9.96111 3.68421C9.96111 4.38387 9.75774 5.06758 9.37705 5.64887C8.99637 6.23012 8.45562 6.68268 7.82352 6.94981C7.19146 7.21692 6.49613 7.28676 5.82534 7.15063C5.15453 7.01449 4.53793 6.67839 4.05368 6.18434C3.5694 5.69026 3.23928 5.0604 3.1055 4.37426C2.97173 3.6881 3.04041 2.97691 3.30275 2.33075C3.56508 1.68461 4.00912 1.13283 4.57826 0.744842ZM5.21177 5.64614C5.59282 5.9059 6.04113 6.04474 6.5 6.04474C7.1154 6.04474 7.70497 5.79529 8.13919 5.35229C8.57331 4.90938 8.81667 4.3093 8.81667 3.68421C8.81667 3.218 8.68118 2.76203 8.427 2.37393C8.1728 1.98579 7.81119 1.68282 7.38754 1.50378C6.96385 1.32473 6.49746 1.27784 6.04747 1.36916C5.5975 1.46047 5.1846 1.68579 4.86081 2.01613C4.53705 2.34645 4.3169 2.76693 4.22774 3.22425C4.13858 3.68156 4.18431 4.15561 4.35928 4.58657C4.53426 5.01755 4.83077 5.3864 5.21177 5.64614ZM12.85 13.2632V13.85H11.7056V13.2632C11.7056 12.2472 11.31 11.2723 10.605 10.553C9.89991 9.83365 8.94293 9.42895 7.94444 9.42895H5.05556C4.05707 9.42895 3.10009 9.83365 2.39499 10.553C1.68999 11.2723 1.29444 12.2472 1.29444 13.2632V13.85H0.15V13.2632C0.15 11.934 0.667549 10.6599 1.58786 9.72097C2.50807 8.78213 3.7555 8.25526 5.05556 8.25526H7.94444C9.2445 8.25526 10.4919 8.78213 11.4121 9.72097C12.3325 10.6599 12.85 11.934 12.85 13.2632Z"
                          fill="black"
                          stroke="#F2F3F5"
                          strokeWidth="0.3"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Last Name</Typography>
              <TextField
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Madison"
                sx={{
                  px: 1,
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                      >
                        <path
                          d="M4.57826 0.744842C5.14737 0.35688 5.81613 0.15 6.5 0.15C7.41696 0.15 8.29699 0.521608 8.94632 1.18408C9.59574 1.84665 9.96111 2.74592 9.96111 3.68421C9.96111 4.38387 9.75774 5.06758 9.37705 5.64887C8.99637 6.23012 8.45562 6.68268 7.82352 6.94981C7.19146 7.21692 6.49613 7.28676 5.82534 7.15063C5.15453 7.01449 4.53793 6.67839 4.05368 6.18434C3.5694 5.69026 3.23928 5.0604 3.1055 4.37426C2.97173 3.6881 3.04041 2.97691 3.30275 2.33075C3.56508 1.68461 4.00912 1.13283 4.57826 0.744842ZM5.21177 5.64614C5.59282 5.9059 6.04113 6.04474 6.5 6.04474C7.1154 6.04474 7.70497 5.79529 8.13919 5.35229C8.57331 4.90938 8.81667 4.3093 8.81667 3.68421C8.81667 3.218 8.68118 2.76203 8.427 2.37393C8.1728 1.98579 7.81119 1.68282 7.38754 1.50378C6.96385 1.32473 6.49746 1.27784 6.04747 1.36916C5.5975 1.46047 5.1846 1.68579 4.86081 2.01613C4.53705 2.34645 4.3169 2.76693 4.22774 3.22425C4.13858 3.68156 4.18431 4.15561 4.35928 4.58657C4.53426 5.01755 4.83077 5.3864 5.21177 5.64614ZM12.85 13.2632V13.85H11.7056V13.2632C11.7056 12.2472 11.31 11.2723 10.605 10.553C9.89991 9.83365 8.94293 9.42895 7.94444 9.42895H5.05556C4.05707 9.42895 3.10009 9.83365 2.39499 10.553C1.68999 11.2723 1.29444 12.2472 1.29444 13.2632V13.85H0.15V13.2632C0.15 11.934 0.667549 10.6599 1.58786 9.72097C2.50807 8.78213 3.7555 8.25526 5.05556 8.25526H7.94444C9.2445 8.25526 10.4919 8.78213 11.4121 9.72097C12.3325 10.6599 12.85 11.934 12.85 13.2632Z"
                          fill="black"
                          stroke="#F2F3F5"
                          strokeWidth="0.3"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box pb={2}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Street address</Typography>
              <TextField
                type="text"
                fullWidth
                name="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="House number and street name"
                sx={{
                  px: 1,
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
              <Typography sx={{ color: '#E00', fontSize: '9px', fontWeight: '400', pt: '8px' }}>
                {passError}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box pb={2}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>
              Apartment, suite, unit, etc. (optional) 
              </Typography>
              <TextField
                type="text"
                name="appartment"
                value={appartment}
                onChange={(e) => setAppartment(e.target.value)}
                fullWidth
                placeholder="Apartment, suite, unit, etc. (optional)"
                sx={{
                  px: 1,
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box pb={2}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Suburb</Typography>
              <TextField
                type="text"
                fullWidth
                name="suburb"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="Suburb"
                sx={{
                  px: 1,
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
              <Typography sx={{ color: '#E00', fontSize: '9px', fontWeight: '400', pt: '8px' }}>
                {passError}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box pb={2}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>
              State
              </Typography>
              <TextField
                type="text"
                name="statecode"
                value={statecode}
                onChange={(e) => setStatecode(e.target.value)}
                fullWidth
                placeholder="State"
                sx={{
                  px: 1,
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box pb={2}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Postcode</Typography>
              <TextField
                type="number"
                fullWidth
                name="postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Postcode"
                sx={{
                  px: 1,
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
              <Typography sx={{ color: '#E00', fontSize: '9px', fontWeight: '400', pt: '8px' }}>
                {passError}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box pb={2}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>
              Phone
              </Typography>
              <TextField
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                placeholder="phone number"
                sx={{
                  px: 1,
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              width: '50%',
              fontSize: '18px',
              fontWeight: 500,
              borderRadius: '44px',
              padding: '9px 17px',
              textTransform: 'none',
              background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
              transition: 'background-color 0.9s ease',
              '&:hover': {
                background:
                  'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
              },
            }}
          >
            {loading ? <CircularProgress sx={{ color: 'white' }} size="1.5rem" /> : 'Pay Now'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

BuyTagDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default BuyTagDialog;
