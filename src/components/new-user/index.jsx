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

import { CREATWE_SUB_USER } from 'src/constants/apiEndPoints';

import httpRequest from '../../axios';

// eslint-disable-next-line react/prop-types
const NewUserDialog = ({ openDialog, handleCloseDialog, getSubusers = () => {} }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [passError, setpassError] = useState(false);
  const [imageupload, setImageupload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageupload(event.target.files[0]);
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    const PasswordRejex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    const emailRejex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Name) {
      return toast.error('Please enter name');
    }
    if (!email) {
      return toast.error('Please enter email');
    }
    if (!emailRejex.test(email)) {
      return toast.error('Please enter valid email');
    }
    if (!PasswordRejex.test(password)) {
      const remainingRequirements = [];

      // Check for each requirement and add to remainingRequirements if not met
      if (!/(?=.*[A-Z])/.test(password)) {
        remainingRequirements.push('one uppercase letter');
      }
      if (!/(?=.*[a-z])/.test(password)) {
        remainingRequirements.push('one lowercase letter');
      }
      if (!/(?=.*\d)/.test(password)) {
        remainingRequirements.push('one number');
      }
      if (!/(?=.*[@$!%*?&.])/.test(password)) {
        remainingRequirements.push('one special character');
      }
      setpassError(
        `Password must contain at least 8 characters and include ${remainingRequirements.join(', ')}`
      );
      return;
    }
    setpassError('');

    if (!confirmPassword) {
      return toast.error('Please enter confirm password');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (!imageupload) {
      return toast.error('Please select image');
    }

    const payload = {
      name: Name,
      // eslint-disable-next-line object-shorthand
      email: email,
      // eslint-disable-next-line object-shorthand
      password: password,
      file: imageupload,
    };

    const formData = new FormData();

    // Append each key-value pair to FormData
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    setLoading(true);

    try {
      const response = await httpRequest.post(CREATWE_SUB_USER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        handleEmpty();
        handleCloseDialog();
        getSubusers();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmpty = () => {
    setName('');
    setemail('');
    setpassword('');
    setconfirmPassword('');
    setSelectedImage(null);
    setImageupload(null);
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
            Add New User
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pb: { sm: '30px', xs: '10px' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <img
                src={selectedImage || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
                alt="Avatar"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                }}
                onClick={() => document.getElementById('imageInput').click()}
              >
                <img src="/assets/editicon.svg" alt="Edit Icon" />
              </IconButton>
            </Box>
            <Box>
              <Typography fontSize="16px" fontWeight="400">
                Profile Picture
              </Typography>
            </Box>
            <input
              id="imageInput"
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </Box>
        </Box>
        <Grid sx={{ px: { sm: '50px' } }} container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Name</Typography>
              <TextField
                fullWidth
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Harry Madison"
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
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Email</Typography>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="harrymadi@gmail.com"
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
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M9.00001 0C7.21997 0 5.47992 0.527841 3.99987 1.51677C2.51983 2.50571 1.36628 3.91131 0.685088 5.55585C0.00389957 7.20039 -0.17433 9.00999 0.172937 10.7558C0.520204 12.5016 1.37737 14.1053 2.63604 15.364C3.89472 16.6226 5.49836 17.4798 7.24419 17.8271C8.99002 18.1743 10.7996 17.9961 12.4442 17.3149C14.0887 16.6337 15.4943 15.4802 16.4832 14.0001C17.4722 12.5201 18 10.78 18 9C17.9974 6.61385 17.0484 4.32616 15.3611 2.63889C13.6738 0.951621 11.3862 0.00258081 9.00001 0ZM9.00001 16.5C7.51665 16.5 6.0666 16.0601 4.83323 15.236C3.59986 14.4119 2.63857 13.2406 2.07091 11.8701C1.50325 10.4997 1.35473 8.99168 1.64411 7.53682C1.9335 6.08197 2.64781 4.74559 3.6967 3.6967C4.7456 2.64781 6.08197 1.9335 7.53683 1.64411C8.99169 1.35472 10.4997 1.50325 11.8701 2.0709C13.2406 2.63856 14.4119 3.59986 15.236 4.83322C16.0601 6.06659 16.5 7.51664 16.5 9C16.4978 10.9885 15.7069 12.8948 14.3009 14.3009C12.8948 15.7069 10.9885 16.4978 9.00001 16.5Z"
                          fill="black"
                        />
                        <path
                          d="M9 3.75012C8.80109 3.75012 8.61032 3.82914 8.46967 3.96979C8.32902 4.11044 8.25 4.30121 8.25 4.50012V10.5001C8.25 10.699 8.32902 10.8898 8.46967 11.0305C8.61032 11.1711 8.80109 11.2501 9 11.2501C9.19891 11.2501 9.38968 11.1711 9.53033 11.0305C9.67098 10.8898 9.75 10.699 9.75 10.5001V4.50012C9.75 4.30121 9.67098 4.11044 9.53033 3.96979C9.38968 3.82914 9.19891 3.75012 9 3.75012Z"
                          fill="black"
                        />
                        <path
                          d="M9.75 13.5001C9.75 13.0859 9.41421 12.7501 9 12.7501C8.58579 12.7501 8.25 13.0859 8.25 13.5001C8.25 13.9143 8.58579 14.2501 9 14.2501C9.41421 14.2501 9.75 13.9143 9.75 13.5001Z"
                          fill="black"
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
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Password</Typography>
              <TextField
                type="password"
                fullWidth
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="........"
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
                        width="19"
                        height="10"
                        viewBox="0 0 19 10"
                        fill="none"
                      >
                        <path
                          d="M9.898 5.65H9.61256L9.55515 5.92961C9.33967 6.97915 8.76887 7.92229 7.93901 8.60001C7.10926 9.27763 6.07127 9.64846 5 9.65C2.4363 9.65 0.35 7.5637 0.35 5C0.35 2.43638 2.43617 0.350132 4.99976 0.35C6.07111 0.351483 7.1092 0.722317 7.93901 1.39999C8.76887 2.07771 9.33967 3.02085 9.55515 4.07039L9.61256 4.35H9.898H18.65V5.65H18H17.65V6V8.65H16.35V6V5.65H16H14H13.65V6V7.65H12.35V6V5.65H12H9.898ZM8.35 5C8.35 3.1527 6.8473 1.65 5 1.65C3.1527 1.65 1.65 3.1527 1.65 5C1.65 6.8473 3.1527 8.35 5 8.35C6.8473 8.35 8.35 6.8473 8.35 5Z"
                          fill="black"
                          stroke="#F2F3F5"
                          strokeWidth="0.7"
                        />
                      </svg>
                    </InputAdornment>
                  ),
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
                Confirm Password
              </Typography>
              <TextField
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                fullWidth
                placeholder="........"
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
                        width="19"
                        height="10"
                        viewBox="0 0 19 10"
                        fill="none"
                      >
                        <path
                          d="M9.898 5.65H9.61256L9.55515 5.92961C9.33967 6.97915 8.76887 7.92229 7.93901 8.60001C7.10926 9.27763 6.07127 9.64846 5 9.65C2.4363 9.65 0.35 7.5637 0.35 5C0.35 2.43638 2.43617 0.350132 4.99976 0.35C6.07111 0.351483 7.1092 0.722317 7.93901 1.39999C8.76887 2.07771 9.33967 3.02085 9.55515 4.07039L9.61256 4.35H9.898H18.65V5.65H18H17.65V6V8.65H16.35V6V5.65H16H14H13.65V6V7.65H12.35V6V5.65H12H9.898ZM8.35 5C8.35 3.1527 6.8473 1.65 5 1.65C3.1527 1.65 1.65 3.1527 1.65 5C1.65 6.8473 3.1527 8.35 5 8.35C6.8473 8.35 8.35 6.8473 8.35 5Z"
                          fill="black"
                          stroke="#F2F3F5"
                          strokeWidth="0.7"
                        />
                      </svg>
                    </InputAdornment>
                  ),
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
            {loading ? <CircularProgress sx={{ color: 'white' }} size="1.5rem" /> : 'Add User'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

NewUserDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default NewUserDialog;
