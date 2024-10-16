import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Typography,
  FormControl,
  OutlinedInput,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

import { RESET_PASSWORD } from 'src/constants/apiEndPoints';

import httpRequest from '../axios';

const PasswordRejex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

const ResetPasswordView = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setToken(null);
    }
  }, [location.search]);

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!token) {
      toast.error('Invalid token');
      setSubmitting(false);
      return;
    }

    const data = {
      token,
      newPassword: values.newPassword,
    };

    setLoading(true);

    try {
      const response = await httpRequest.post(RESET_PASSWORD, data);

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
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
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: { xs: '24px', sm: '30px' },
            fontWeight: '600',
            color: 'black',
          }}
        >
          Reset Password
        </Typography>
        <Formik
          initialValues={{
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object().shape({
            newPassword: Yup.string()
              .matches(
                PasswordRejex,
                'Password must be at least 8 characters, contain one uppercase letter, one lowercase letter, one number, and one special character'
              )
              .required('New Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
              .required('Confirm Password is required'),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, isSubmitting, touched, values, isValid }) => (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(values, { setSubmitting: () => {} });
              }}
            >
              <FormControl
                fullWidth
                error={Boolean(touched.newPassword && errors.newPassword)}
                sx={{ pb: '20px' }}
              >
                <Typography
                  component="label"
                  htmlFor="newPassword"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    pt: { xs: '20px', sm: '40px' },
                    pb: '5px',
                    pl: '15px',
                    color: 'black',
                  }}
                >
                  New Password
                </Typography>
                <OutlinedInput
                  id="newPassword"
                  type="password"
                  value={values.newPassword}
                  name="newPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Your New Password"
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
                {touched.newPassword && errors.newPassword && (
                  <FormHelperText error id="newPassword">
                    {errors.newPassword}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                sx={{ pb: '20px' }}
              >
                <Typography
                  component="label"
                  htmlFor="confirmPassword"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    pt: { xs: '20px', sm: '40px' },
                    pb: '5px',
                    pl: '15px',
                    color: 'black',
                  }}
                >
                  Confirm Password
                </Typography>
                <OutlinedInput
                  id="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  sx={{
                    height: { xs: '45px', md: '60px' },
                    backgroundColor: '#F2F3F5',
                    borderRadius: '37px',
                    fontSize: '13px',
                    fontWeight: 300,
                    px: '20px',
                    color: '#555',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'noneconfirmPassword',
                    },
                  }}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormHelperText error id="confirmPassword">
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
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
                    background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                    transition: 'background-color 0.9s ease',
                    '&:hover': {
                      background:
                        'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress sx={{ color: 'white' }} size="1.5rem" />
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ResetPasswordView;
