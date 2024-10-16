/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useCallback } from 'react';

import {
  Box,
  // CircularProgress,
  Tab,
  Tabs,
  Card,
  Button,
  useTheme,
  Typography,
  FormControl,
  OutlinedInput,
  useMediaQuery,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

import { SUB_LOGIN, MAIN_LOGIN } from 'src/constants/apiEndPoints';
import { setType, setemail } from 'src/lib/Redux/slices/userslice';

import httpRequest from '../../axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const LoginView = () => {
  const [tab, setTab] = useState(0);
  const [view, setView] = useState('login');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handleChange = useCallback((event, newValue) => {
    setTab(newValue);
  }, []);

  const handleForgotPassword = () => {
    console.log(tab);

    navigate(`/forgot?admin=${tab === 0 ? 'true' : 'false'}`);
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <Box>
      <Box
        sx={{
          py: '12px',
          pb: isSmUp ? '70px' : '30px',
          backgroundImage: 'url(/assets/bac.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography sx={{ pt: '45`px', pb: '20px' }}>
          <Link to="/">
            <img
              src="/assets/loginlogo.svg"
              alt="Logo"
              style={{ width: isSmUp ? 'auto' : '150px' }}
            />
          </Link>
        </Typography>
        <Card
          sx={{
            py: isSmUp ? '70px' : '30px',
            px: isSmUp ? '70px' : '20px',
            // eslint-disable-next-line no-nested-ternary
            width: isLgUp ? '542px' : isMdUp ? '70%' : '100%',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              centered
              TabIndicatorProps={{ style: { display: 'none' } }}
              sx={{ background: '#024397', borderRadius: '66px', p: 1 }}
            >
              <Tab
                className={`${tab === 0 ? 'TabClass' : 'InActiveClass'}`}
                sx={{
                  width: '50%',
                  background: tab === 0 ? '#fff' : 'none',
                  textAlign: 'center',
                  borderRadius: '149px',
                  px: isSmUp ? '68px' : '58px',
                  boxShadow:
                    tab === 0
                      ? '-4px -4px 7.2px 0px rgba(0, 0, 0, 0.08) inset, 4px 4px 7.9px 0px rgba(0, 0, 0, 0.08) inset'
                      : 'none',
                  fontWeight: 600,
                  fontSize: isSmUp ? '20px' : '16px',
                  // color: tab === 0 ? 'black' : 'white',
                }}
                label="Admin"
              />
              <Tab
                className={`${tab === 1 ? 'TabClass' : 'InActiveClass'}`}
                sx={{
                  width: '50%',
                  background: tab === 1 ? '#fff' : 'none',
                  textAlign: 'center',
                  borderRadius: '66px',
                  boxShadow:
                    tab === 1
                      ? '-4px -4px 7.2px 0px rgba(0, 0, 0, 0.08) inset, 4px 4px 7.9px 0px rgba(0, 0, 0, 0.08) inset'
                      : 'none',
                  px: isSmUp ? '68px' : '58px',
                  fontWeight: 600,
                  fontSize: isSmUp ? '20px' : '16px',
                  // color: tab === 1 ? 'black' : 'white',
                }}
                label="User"
              />
            </Tabs>
          </Box>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: isSmUp ? '30px' : '24px',
              fontWeight: '600',
              pt: '20px',
              pb: '40px',
            }}
          >
            {tab === 0 ? 'Admin Login' : 'User Login'}
          </Typography>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                setStatus({ success: true });
                setSubmitting(false);
                setLoading(true);
                if (tab === 0) {
                  const response = await httpRequest.post(MAIN_LOGIN, values);

                  if (response.status === 200 || response.status === 201) {
                    toast.success(response.data.message);
                    dispatch(setemail(values?.email));
                    dispatch(setType('admin'));
                    navigate('/otp');
                  }
                } else {
                  const response = await httpRequest.post(SUB_LOGIN, values);

                  if (response.status === 200 || response.status === 201) {
                    toast.success(response.data.message);
                    dispatch(setemail(values?.email));
                    dispatch(setType('user'));
                    navigate('/otp');
                  }
                }
              } catch (err) {
                console.error(err);
                toast.error(err?.response?.data?.message);
                setStatus({ success: false });
                setSubmitting(false);
              } finally {
                setLoading(false);
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
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  sx={{ mb: 3 }}
                >
                  <Typography
                    component="label"
                    htmlFor="email"
                    sx={{
                      fontSize: isSmUp ? '16px' : '14px',
                      fontWeight: 400,
                      pb: '5px',
                      pl: '10px',
                    }}
                  >
                    Email
                  </Typography>
                  <OutlinedInput
                    id="email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email"
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
                      height: isSmUp ? '60px' : '45px',
                      backgroundColor: '#F2F3F5',
                      borderRadius: '37px',
                      fontSize: '13px',
                      fontWeight: 300,
                      px: '20px',
                      py: isSmUp ? '17px' : '10px',
                      color: '#555',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    }}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="email">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  sx={{ mb: 1 }}
                >
                  <Typography
                    component="label"
                    htmlFor="password"
                    sx={{
                      fontSize: isSmUp ? '16px' : '14px',
                      fontWeight: 400,
                      pb: '5px',
                      pl: '10px',
                    }}
                  >
                    Password
                  </Typography>
                  <OutlinedInput
                    id="password"
                    type="password"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Password"
                    placeholder="Enter Your Password"
                    endAdornment={
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
                    }
                    sx={{
                      height: isSmUp ? '60px' : '45px',
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
                  {touched.password && errors.password && (
                    <FormHelperText error id="password">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>

                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#024397',
                    }}
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </Typography>
                </Box>

                <Box sx={{ pt: '25px' }}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      fontSize: '18px',
                      fontWeight: 500,
                      p: '9px 17px',
                      borderRadius: '44px',
                      background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                      transition: 'background-color 0.9s ease',
                      '&:hover': {
                        background:
                          'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                      },
                    }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress sx={{ color: 'white' }} size="1.5rem" /> : 'Login'}
                  </Button>
                </Box>
                {tab === 0 && (
                  <Box sx={{ textAlign: 'center', pt: '36px' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>
                      Dont have an account?{' '}
                      <Typography
                        component="span"
                        sx={{
                          fontSize: '16px',
                          color: '#024397',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                        onClick={handleSignUp}
                      >
                        Sign Up
                      </Typography>
                    </Typography>
                  </Box>
                )}
              </form>
            )}
          </Formik>
        </Card>
        {/* <Box
          sx={{
            position: 'absolute',
            bottom: '-250px',
            zIndex: '-1',
            left: '0',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <img src="/assets/Backgroundleft.svg" alt="" />
        </Box> */}
      </Box>
    </Box>
  );
};

export default LoginView;
