/* eslint-disable consistent-return */
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Typography,
  FormControl,
  OutlinedInput,
  CircularProgress,
  Checkbox,
} from '@mui/material';

import { FORGOT_PASSWORD } from 'src/constants/apiEndPoints';

import httpRequest from '../../axios';

const ForgotPasswordView = () => {
  
  const [view, setView] = useState('forgotPassword');
  const [email, setEmail] = useState('');
  const params = new URLSearchParams(window.location.search).get('admin');
  const admin = params === 'true'
  const [loading, setLoading] = useState(false);
  console.log(admin);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleotp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailRegex.test(email)) {
      return toast.error('Please enter valid email');
    }

    setLoading(true);
    try {
      const response = await httpRequest.post(FORGOT_PASSWORD, { email, admin });

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        setView('success'); // Switch to success message view
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width={1}
      sx={{
        py: { xs: '12px', sm: '10px' },
        pb: { xs: '40px', sm: '70px' },
        backgroundImage: 'url(assets/bac.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ pt: { xs: '30px', sm: '30px' }, pb: '20px' }}>
        <Link to="/">
          <img
            src="/assets/loginlogo.svg"
            alt="Logo"
            style={{ width: '100%', maxWidth: '200px' }}
          />
        </Link>
      </Typography>

      <Box
        sx={{
          pb: { xs: '40px', sm: '80px' },
          pt: { xs: '50px', sm: '100px' },
          px: { xs: '20px', sm: '70px' },
          width: { xs: '90%', sm: '542px' },
          borderRadius: '20px',
          backgroundColor: 'white',
        }}
      >
        {view === 'forgotPassword' ? (
          <>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: { xs: '24px', sm: '30px' },
                fontWeight: '600',
                color: 'black',
              }}
            >
              Forgot Password
            </Typography>
            <Formik
              initialValues={{
                email: '',
                admin: false,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                admin: Yup.boolean(),
              })}
              onSubmit={(values, { setSubmitting, isValid }) => {
                if (isValid) {
                  // console.log(values);
                  setSubmitting(false);
                  handleotp(); // Call the OTP handler
                } else {
                  setSubmitting(false);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                isValid,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    sx={{ pb: '20px' }}
                  >
                    <Typography
                      component="label"
                      htmlFor="email"
                      sx={{
                        fontSize: '16px',
                        fontWeight: 400,
                        pt: { xs: '20px', sm: '40px' },
                        pb: '5px',
                        pl: '15px',
                        color: 'black',
                      }}
                    >
                      Email
                    </Typography>
                    <OutlinedInput
                      id="email"
                      type="email"
                      value={email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      endAdornment={
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
                      }
                      sx={{
                        height: { xs: '45px', md: '60px' },
                        backgroundColor: '#F2F3F5',
                        borderRadius: '37px',
                        fontSize: '13px',
                        fontWeight: 300,
                        px: '20px',
                        color: '#555',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                      }}
                    />
                  </FormControl>

                  <Box sx={{ pt: '30px' }}>
                    <Button
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      sx={{
                        fontSize: { xs: '16px', sm: '18px' },
                        fontWeight: 500,
                        p: { xs: '7px 15px', sm: '9px 17px' },
                        borderRadius: '53px',
                        background:
                          'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                        transition: 'background-color 0.9s ease',
                        '&:hover': {
                          background:
                            'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                        },
                      }}
                      onClick={handleotp}
                    >
                      {loading ? (
                        <CircularProgress sx={{ color: 'white' }} size="1.5rem" />
                      ) : (
                        'Get Password Reset Link'
                      )}
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography sx={{ fontSize: '16px', color: 'black' }}>
                      Go Back{' '}
                      <Typography
                        component="span"
                        sx={{
                          color: '#024397',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                        onClick={handleLogin}
                      >
                        Login
                      </Typography>
                    </Typography>
                  </Box>
                </form>
              )}
            </Formik>
          </>
        ) : (
          // Success message view
          <>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: { xs: '24px', sm: '30px' },
                fontWeight: '600',
                color: 'black',
                mt: '20px',
              }}
            >
              Password Reset Initiated
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: { xs: '16px', sm: '18px' },
                fontWeight: '400',
                color: 'black',
                mt: '10px',
              }}
            >
              You should receive an email shortly with instructions on how to reset your password.
            </Typography>
            <Box sx={{ pt: '30px', textAlign: 'center' }}>
              <Button
                size="large"
                variant="contained"
                onClick={handleLogin}
                sx={{
                  fontSize: { xs: '16px', sm: '18px' },
                  fontWeight: 500,
                  p: { xs: '7px 15px', sm: '9px 17px' },
                  borderRadius: '53px',
                  background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                  transition: 'background-color 0.9s ease',
                  '&:hover': {
                    background:
                      'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                  },
                }}
              >
                Back to Login
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPasswordView;
