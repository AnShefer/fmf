import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

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

import { UPDATE_SUB_USER } from 'src/constants/apiEndPoints';

import httpRequest from '../../axios';

// eslint-disable-next-line react/prop-types
const EditUserDialog = ({ openDialog, handleCloseDialog, CurrentUser = {} }) => {
  const [selectedImage, setSelectedImage] = useState(CurrentUser?.profilePic || null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(CurrentUser?.name || '');
  // eslint-disable-next-line no-unused-vars
  const [email, setemail] = useState(CurrentUser?.email || '');
  const [password, setpassword] = useState(CurrentUser?.password || '');
  const [confirmPassword, setconfirmPassword] = useState(CurrentUser?.password || '');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (CurrentUser) {
      setSelectedImage(CurrentUser.profilePic || null);
      setName(CurrentUser.name || '');
      setemail(CurrentUser.email || '');
      setpassword('');
      setconfirmPassword('');
    }
  }, [CurrentUser]);

  // eslint-disable-next-line consistent-return
  const handleSubmit = async () => {
    if (password) {
      if (!confirmPassword) {
        toast.error('Please confirm your new password.');
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }
    }
    if (name.length < 3) {
      toast.error('Name must be at least 3 characters');
      return;
    }

    const formData = new FormData();

    // Check if selectedImage is a file or a URL
    if (selectedImage && image instanceof File) {
      formData.append('file', image);
    }

    formData.append('name', name);

    if (password && password.trim()) {
      formData.append('password', password);
    }

    setLoading(true);
    try {
      const response = await httpRequest.put(`${UPDATE_SUB_USER}/${CurrentUser._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        handleCloseDialog();
        setImage(null);
        setpassword('');
        setconfirmPassword('');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while updating the sub-user.');
    } finally {
      setLoading(false);
    }
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
          WebkitBackdropFilter: 'blur(5px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: { sm: '30px', xs: `10px` },
        }}
      >
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
              pt: { sm: '50px', xs: '30px' },
            }}
          >
            Edit User information
          </Typography>
        </Box>
        <IconButton
          sx={{ backgroundColor: '#024397', ':hover': { backgroundColor: '#024397' } }}
          onClick={handleCloseDialog}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="19"
            viewBox="0 0 16 19"
            fill="none"
          >
            <path
              d="M15.8333 3.16667H11.875V1.58333C11.875 1.16341 11.7082 0.76068 11.4113 0.463748C11.1143 0.166815 10.7116 0 10.2917 0L5.54167 0C5.12174 0 4.71901 0.166815 4.42208 0.463748C4.12515 0.76068 3.95833 1.16341 3.95833 1.58333V3.16667H0V4.75H1.58333V16.625C1.58333 17.2549 1.83356 17.859 2.27895 18.3044C2.72435 18.7498 3.32844 19 3.95833 19H11.875C12.5049 19 13.109 18.7498 13.5544 18.3044C13.9998 17.859 14.25 17.2549 14.25 16.625V4.75H15.8333V3.16667ZM5.54167 1.58333H10.2917V3.16667H5.54167V1.58333ZM12.6667 16.625C12.6667 16.835 12.5833 17.0363 12.4348 17.1848C12.2863 17.3333 12.085 17.4167 11.875 17.4167H3.95833C3.74837 17.4167 3.54701 17.3333 3.39854 17.1848C3.25007 17.0363 3.16667 16.835 3.16667 16.625V4.75H12.6667V16.625Z"
              fill="white"
            />
            <path d="M7.12533 7.91663H5.54199V14.25H7.12533V7.91663Z" fill="white" />
            <path d="M10.2913 7.91663H8.70801V14.25H10.2913V7.91663Z" fill="white" />
          </svg>
        </IconButton>
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
                src={selectedImage || '/assets/harry.svg'}
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
                placeholder="Harry Madison"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="harrymadi@gmail.com"
                name="email"
                value={email}
                disabled
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
                        height="14"
                        viewBox="0 0 19 14"
                        fill="none"
                      >
                        <path
                          d="M16.9375 1H2.0625C1.78071 1 1.51046 1.11155 1.3112 1.31012C1.11194 1.50869 1 1.77801 1 2.05882L1 11.9412C1 12.222 1.11194 12.4913 1.3112 12.6899C1.51046 12.8884 1.78071 13 2.0625 13H16.9375C17.2193 13 17.4895 12.8884 17.6888 12.6899C17.8881 12.4913 18 12.222 18 11.9412V2.05882C18 1.77801 17.8881 1.50869 17.6888 1.31012C17.4895 1.11155 17.2193 1 16.9375 1ZM16.7108 1.70588L9.5 7.26118L2.28917 1.70588H16.7108ZM1.70833 11.7965V2.15059L7.16604 6.35412L1.70833 11.7965ZM2.20771 12.2941L7.72917 6.79176L9.28042 7.98823C9.34235 8.03574 9.4183 8.06151 9.49646 8.06151C9.57461 8.06151 9.65057 8.03574 9.7125 7.98823L11.2708 6.79176L16.7923 12.2941H2.20771ZM17.2917 11.7965L11.834 6.35412L17.2917 2.15059V11.7965Z"
                          fill="black"
                          stroke="#F2F3F5"
                          strokeWidth="0.1"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 500,
                fontSize: { sm: '20px', xs: '15px' },
                pt: 0,
              }}
            >
              Keep or create new password
            </Typography>
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
                placeholder="********"
                sx={{
                  px: 1,
                  alignContent: 'center',
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box pb={2}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>
                Confirm Password
              </Typography>
              <TextField
                type="password"
                fullWidth
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                placeholder="********"
                sx={{
                  px: 1,
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiInputBase-input': {
                    verticalAlign: 'center',
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
            type="submit"
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
            {loading ? <CircularProgress sx={{ color: 'white' }} size="1.5rem" /> : 'Update'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

EditUserDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default EditUserDialog;
