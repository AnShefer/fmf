/* eslint-disable react/prop-types */
import moment from 'moment';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Box,
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

import { setUser } from 'src/lib/Redux/slices/userslice';
import { UPDATE_USER, UPDATE_MEMBER_USER } from 'src/constants/apiEndPoints';

import httpRequest from '../../axios';

// eslint-disable-next-line react/prop-types
const ProfleSettingDialog = ({ openDialog, handleCloseDialog, loginuser }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fullname, setfullname] = useState(loginuser?.fullname || loginuser?.name);
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [imageupload, setImageupload] = useState(null);
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageupload(event.target.files[0]);
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = async () => {
    const PasswordRejex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    // if (fullname.length < 5) {
    //   return toast.error('Fullname must be at least 5 characters');
    // }

    if (oldPassword.length > 0) {
      if (!newPassword) {
        return toast.error('Please enter new password');
      }

      if (!PasswordRejex.test(newPassword)) {
        return toast.error(
          'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
        );
      }

      if (newPassword !== confirmPassword) {
        return toast.error('Passwords do not match');
      }
    }

    const payload = {
      // eslint-disable-next-line object-shorthand
      fullname: fullname,
      // eslint-disable-next-line object-shorthand
      oldPassword: oldPassword,
      // eslint-disable-next-line object-shorthand
      password: newPassword,
      file: imageupload,
    };

    const formData = new FormData();

    // Append each key-value pair to FormData
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    setLoading(true);
    let response;

    try {
      if (loginuser?.usertype === 'Secondary') {
        response = await httpRequest.post(`${UPDATE_MEMBER_USER}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await httpRequest.put(`${UPDATE_USER}/${loginuser?._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      if (response.status === 200) {
        toast.success(response?.data?.message);
        dispatch(setUser(response?.data?.user));
        handleCloseDialog();
        setoldPassword('');
        setnewPassword('');
        setconfirmPassword('');
        setSelectedImage(null);
        setImageupload(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="sm"
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
              pb: { sm: '30px', xs: '20px' },
            }}
          >
            Profile Settings
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
                src={selectedImage || loginuser?.image || loginuser?.profilePic}
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
            <Box>
              <Typography fontSize="18px" fontWeight="600">
                {loginuser?.email}
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
        <Box sx={{ px: { sm: '50px' } }}>
          <Box pb={3}>
            <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Name</Typography>
            <TextField
              fullWidth
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
              placeholder="Harry Madison"
              disabled={loginuser?.usertype === 'Secondary'}
              sx={{
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
          <Box pb={3}>
            <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Date of Birth</Typography>
            <TextField
              fullWidth
              placeholder="MM/DD/YYYY"
              disabled
              value={moment(loginuser?.dob).format('DD/MM/YYYY')}
              sx={{
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
          <Box sx={{ display: 'flex', justifyContent: 'center', my:5 }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Keep or create new password</Typography>
          </Box>
          <Box pb={3}>
            <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Old Password</Typography>
            <TextField
              type="password"
              fullWidth
              onChange={(e) => setoldPassword(e.target.value)}
              value={oldPassword}
              placeholder="**********"
              sx={{
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

          <Box pb={3}>
            <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>New Password</Typography>
            <TextField
              type="password"
              fullWidth
              onChange={(e) => setnewPassword(e.target.value)}
              value={newPassword}
              placeholder="**********"
              sx={{
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
          <Box pb={3}>
            <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>
              Confirm Password
            </Typography>
            <TextField
              type="password"
              fullWidth
              onChange={(e) => setconfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="**********"
              sx={{
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
              Password must contain at least 8 characters with 1 number, 1 alphabet, 1 special
              character, and 1 uppercase letter
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              width: '80%',
              fontSize: '18px',
              fontWeight: 500,
              borderRadius: '44px',
              padding: '9px 17px',
              textTransform: 'none',
              background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
            }}
          >
            {loading ? <CircularProgress sx={{ color: 'white' }} size="1.5rem" /> : 'Update'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

ProfleSettingDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default ProfleSettingDialog;
