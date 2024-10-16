import { toast } from 'react-toastify';
import React, { useState } from 'react';

import {
  Box,
  Grid,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { CONTACT_US } from 'src/constants/apiEndPoints';

import httpRequest from '../../axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const validate = () => {
    const tempErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid';
      isValid = false;
    }
    if (!formData.message) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await httpRequest.post(CONTACT_US, formData);
        if (response.status === 200 || response.status === 201) {
          toast.success(response.data.message);
          setFormData({
            name: '',
            email: '',
            message: '',
          });
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ pt: 10, color: '#000' }}>
      <Box sx={{ py: 10, color: '#000' }}>
        <Container
          maxWidth="lg"
          sx={{ backgroundColor: '#fff', p: { xs: 2, md: 14 }, borderRadius: 2 }}
        >
          <Grid container spacing={10}>
            <Grid item xs={12} md={7}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ width: { xs: '100%', md: '460px' } }}>
                  <Box sx={{ pb: 4 }}>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '30px',
                          md: '40px',
                          background: 'linear-gradient(91deg, #014092 27.18%, #137EF2 58.73%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        },
                        fontWeight: 700,
                        color: '#000',
                      }}
                    >
                      Contact Us
                    </Typography>
                    <Typography>
                      Feel free to contact us at any time, and we will get back to you as soon as
                      possible.
                    </Typography>
                  </Box>
                  <Box pb={3}>
                    <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Name</Typography>
                    <TextField
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Your Name"
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
                            <img src="/assets/name.svg" alt="Name" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.name && (
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: '#F00',
                          mt: 1,
                        }}
                      >
                        {errors.name}
                      </Typography>
                    )}
                  </Box>
                  <Box pb={3}>
                    <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Email</Typography>
                    <TextField
                      fullWidth
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Your Email"
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
                            <img src="/assets/email.svg" alt="Email" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.email && (
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: '#F00',
                          mt: 1,
                        }}
                      >
                        {errors.email}
                      </Typography>
                    )}
                  </Box>
                  <Box pb={3}>
                    <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>
                      Message
                    </Typography>
                    <TextField
                      fullWidth
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter Your message"
                      multiline
                      rows={4}
                      sx={{
                        borderRadius: '10px',
                        backgroundColor: '#F2F3F5',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                      }}
                    />
                    {errors.message && (
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: '#F00',
                          mt: 1,
                        }}
                      >
                        {errors.message}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      width: '100%',
                      color: '#FFF',
                      borderRadius: '42px',
                      background:
                        'linear-gradient(90deg, #003F91 6.62%, #1482F9 52.26%, #014092 96.48%)',
                      padding: '10px 20px',
                      textTransform: 'none',
                      fontSize: '16px',
                      fontWeight: 600,
                      transition: 'background-color 0.9s ease',
                      '&:hover': {
                        background:
                          'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                      },
                    }}
                    onClick={handleSubmit}
                  >
                    {loading ? <CircularProgress size="1.5rem" sx={{ color: '#FFF' }} /> : 'Submit'}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  height: { xs: 'auto', md: '576px' },
                  width: { xs: 'auto', md: '497px' },
                  backgroundColor: '#EBF3FF',
                  p: { xs: 2, md: 4 },
                  pl: { xs: 0, md: '88px' },
                  pt: { xs: 0, md: '66px' },
                  borderRadius: { xs: '20px', md: '20px 0px 0px 20px' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '28px',
                      md: '35px',
                      background: 'linear-gradient(91deg, #014092 27.18%, #137EF2 58.73%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    },
                    fontWeight: 700,
                    pb: '48px',
                  }}
                >
                  Info
                </Typography>
                <Box>
                  <Typography sx={{ fontSize: '21px', fontWeight: 600, color: '#024397' }}>
                    ADDRESS
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      pb: '63px',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                    }}
                  >
                    <img src="/assets/address.svg" alt="Address" />
                    <Typography sx={{ fontSize: '18px', fontWeight: 300, color: '#000', ml: 1 }}>
                      Suit 44 Kelso Crescent Moorbank NSW 2170 Sydney Australia
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '21px', fontWeight: 600, color: '#024397' }}>
                    PHONE
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      pb: '63px',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                    }}
                  >
                    <img src="/assets/phone.svg" alt="Phone" />
                    <Typography sx={{ fontSize: '18px', fontWeight: 300, color: '#000', ml: 1 }}>
                      +1300 810 372
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '21px', fontWeight: 600, color: '#024397' }}>
                    EMAIL
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                    }}
                  >
                    <img src="/assets/emaill.svg" alt="Email" />
                    <Typography sx={{ fontSize: '18px', fontWeight: 300, color: '#000', ml: 1 }}>
                      info@forevermessages.com.au
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;
