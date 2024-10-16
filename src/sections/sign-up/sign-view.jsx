/* eslint-disable no-undef */
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { enGB } from 'date-fns/locale';
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  Card,
  // eslint-disable-next-line perfectionist/sort-named-imports
  Button,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
  FormControl,
  OutlinedInput,
  FormHelperText,
  CircularProgress,
  FormControlLabel,
} from '@mui/material'; // Use moment adapter

import { SIGNUP } from 'src/constants/apiEndPoints';
import { setType, setemail } from 'src/lib/Redux/slices/userslice';

import httpRequest from '../../axios';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().max(255).required('Full name is required'),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUpView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [Acceptprivacy, setAcceptprivacy] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // console.log('🚀 ~ selectedDate:', selectedDate);
  const [DateError, setDateError] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box
      width={1}
      sx={{
        pb: { xs: '40px', md: '60px' },
        backgroundImage: 'url(/assets/bac.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ pt: { xs: '20px', md: '30px' }, pb: '20px' }}>
        <Link to="/">
          <img
            src="/assets/loginlogo.svg"
            alt="Logo"
            style={{ width: '100%', maxWidth: '200px' }}
          />
        </Link>
      </Typography>
      <Card
        sx={{
          pb: '30px',
          px: { xs: '20px', md: '70px' },
          width: { xs: '90%', md: '542px' },
          borderRadius: '20px',
          backgroundColor: 'white',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: { xs: '24px', md: '30px' },
            fontWeight: '600',
            pt: { xs: '30px', md: '50px' },
          }}
        >
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            dob: '',
          }}
          validationSchema={validationSchema}
          // eslint-disable-next-line consistent-return
          onSubmit={async (values, { setStatus, setSubmitting }) => {
            try {
              setStatus({ success: true });
              setSubmitting(false);
              if (selectedDate === null) {
                setDateError('Date is Required');
                return;
              }

              const today = new Date();
              let age = today.getFullYear() - selectedDate.getFullYear();
              const monthDiff = today.getMonth() - selectedDate.getMonth();
              const dayDiff = today.getDate() - selectedDate.getDate();

              // Adjust age if the birth date hasn't occurred yet this year
              if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age -= 1; // Use -= instead of --
              }

              // Check if the user is at least 18 years old
              if (age < 18) {
                setDateError('You must be at least 18 years old');
                return;
              }

              setDateError('');

              if (!Acceptprivacy) {
                toast.error('Please accept privacy policy');
                return;
              }

              const formattedDate = selectedDate;

              setLoading(true);
              const payload = {
                fullname: values.fullName,
                email: values.email,
                password: values.password,
                dob: formattedDate,
              };

              const response = await httpRequest.post(SIGNUP, payload);

              if (response.status === 201 || response.status === 200) {
                toast.success(response?.data?.message);
                dispatch(setemail(values.email));
                dispatch(setType('register'));
                navigate('/otp');
              }
            } catch (err) {
              toast.error(err?.response?.data?.message);
              setStatus({ success: false });
              setSubmitting(false);
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.fullName && errors.fullName)}
                sx={{ pb: '20px' }}
              >
                <Typography
                  component="label"
                  htmlFor="fullName"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    pt: '30px',
                    pb: '5px',
                    pl: '15px',
                  }}
                >
                  Full Name
                </Typography>
                <OutlinedInput
                  id="fullName"
                  type="text"
                  value={values.fullName}
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Your Full Name"
                  endAdornment={
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
                  }
                  sx={{
                    height: { xs: '45px', md: '60px' },
                    backgroundColor: '#F2F3F5',
                    borderRadius: '37px',
                    fontSize: '13px',
                    fontWeight: 300,
                    px: '20px',
                    py: '17px',
                    color: '#555',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                />
                {touched.fullName && errors.fullName && (
                  <FormHelperText error id="fullName">
                    {errors.fullName}
                  </FormHelperText>
                )}
              </FormControl>
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
                    pb: '5px',
                    pl: '15px',
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
                    py: '17px',
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
                error={Boolean(touched.email && errors.email)}
                sx={{ pb: '20px' }}
              >
                <Typography
                  component="label"
                  htmlFor="email"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    pb: '5px',
                    pl: '15px',
                  }}
                >
                  Date of Birth
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                  <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    format="dd-MM-yyyy" // Format for the date display
                    renderInput={(params) => <TextField {...params} helperText={null} fullWidth />}
                  />
                </LocalizationProvider>
                {DateError && DateError && <FormHelperText error>{DateError}</FormHelperText>}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{ pb: '30px' }}
              >
                <Typography
                  component="label"
                  htmlFor="password"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    pl: '15px',
                    pb: '5px',
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
                    height: { xs: '45px', md: '60px' },
                    backgroundColor: '#F2F3F5',
                    borderRadius: '37px',
                    fontSize: '13px',
                    fontWeight: 300,
                    px: '20px',
                    py: '17px',
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
              <FormControl
                fullWidth
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              >
                <Typography
                  component="label"
                  htmlFor="confirmPassword"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    pl: '15px',
                    pb: '5px',
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
                  placeholder="Enter Your Confirm Password"
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
                    height: { xs: '45px', md: '60px' },
                    backgroundColor: '#F2F3F5',
                    borderRadius: '37px',
                    fontSize: '13px',
                    fontWeight: 300,
                    px: '20px',
                    py: '17px',
                    color: '#555',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormHelperText error id="confirmPassword">
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </FormControl>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => setAcceptprivacy(!Acceptprivacy)}
                      checked={Acceptprivacy}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '10px' }}>
                      I agree to the{' '}
                      <Link style={{ color: '#147FF4' }} to="/security">
                        Security
                      </Link>{' '}
                      and{' '}
                      <Link style={{ color: '#147FF4' }} to="/privacy">
                        Privacy Policy
                      </Link>{' '}
                      .
                    </Typography>
                  }
                />
              </FormGroup>
              <Box sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    fontSize: '18px',
                    fontWeight: 500,
                    p: '9px 17px',
                    borderRadius: '53px',
                    background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                    transition: 'background-color 0.9s ease', // Adding transition for smooth animation
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
                    'Create Account'
                  )}
                </Button>
              </Box>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography sx={{ fontSize: '16px' }}>
                  Already have an account?{' '}
                  <Typography
                    component="span"
                    sx={{
                      color: '#024397',
                      fontWeight: '500',
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
      </Card>
    </Box>
  );
};

export default SignUpView;
