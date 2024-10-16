import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Typography, OutlinedInput, CircularProgress } from '@mui/material';

import { OTP_VERIFY, VERIFY_OTP } from 'src/constants/apiEndPoints';
import { setType, setUser, setemail } from 'src/lib/Redux/slices/userslice';

import httpRequest from '../../axios';

const OtpView = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(300);
  const [expired, setExpired] = useState(false);
  const { email = '', type = '' } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (value, index) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 3 && newOtp[index]) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  // eslint-disable-next-line consistent-return
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (expired) {
      return toast.error('OTP code has expired. Please log in again.');
    }

    const payload = {
      // eslint-disable-next-line object-shorthand
      email: email,
      otp: otp.join(''),
      // eslint-disable-next-line object-shorthand
      type: type,
    };

    setLoading(true);

    try {
      if (type === 'admin' || type === 'register') {
        const response = await httpRequest.post(OTP_VERIFY, payload);

        if (response.status === 200 || response.status === 201) {
          toast.success(response.data.message);
          dispatch(setemail(''));
          dispatch(setType(''));
          if (response?.data?.token) {
            localStorage.setItem('token', response?.data?.token);
            dispatch(setUser(response?.data?.user));
            navigate('/dashboard');
          } else {
            navigate('/login');
          }
        }
      } else {
        const newresponse = await httpRequest.post(VERIFY_OTP, payload);

        if (newresponse.status === 200 || newresponse.status === 201) {
          toast.success(newresponse.data.message);
          dispatch(setemail(''));
          dispatch(setType(''));
          localStorage.setItem('token', newresponse?.data?.token);
          dispatch(setUser(newresponse?.data?.user));
          navigate('/secondary-dashboard');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setExpired(true); // Set expired state when countdown reaches zero
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <Box
      width={1}
      sx={{
        py: { xs: '24px', sm: '12px' },
        pb: '70px',
        backgroundImage: 'url(/assets/images/bac.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>
        <Link to="/">
          <img src="/assets/loginlogo.svg" alt="Logo" />
        </Link>
      </Typography>
      <Box
        sx={{
          pb: { xs: '40px', sm: '50px' },
          pt: { xs: '50px', sm: '50px' },
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
            pt: '30px',
            color: '#000',
          }}
        >
          Verification Code
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '300',
            pb: '30px',
            color: '#000',
          }}
        >
          Please type the verification code sent to your email
        </Typography>
        <form onSubmit={handleOtpSubmit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: '5px', sm: '10px' },
              pb: '30px',
            }}
          >
            {otp.map((digit, index) => (
              <OutlinedInput
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                inputProps={{ maxLength: 1, pattern: '[0-9]*', style: { textAlign: 'center' } }}
                sx={{
                  width: { xs: '40px', sm: '50px' },
                  height: { xs: '40px', sm: '50px' },
                  backgroundColor: '#d5d7db',
                  borderRadius: '50%',
                  fontSize: { xs: '24px', sm: '30px' },
                  fontWeight: 600,
                  color: '#000',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            ))}
          </Box>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading || expired} // Disable button if expired
            sx={{
              fontSize: { xs: '16px', sm: '18px' },
              fontWeight: 500,
              py: { xs: '10px', sm: '14px' },
              borderRadius: '53px',
              background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
              transition: 'background-color 0.9s ease',
              '&:hover': {
                background:
                  'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
              },
            }}
          >
            {loading ? <CircularProgress sx={{ color: 'white' }} size="1.5rem" /> : 'Verify'}
          </Button>
        </form>
        <Typography sx={{ textAlign: 'center', mt: 2, color: '#000' }}>
          Code expires in: {Math.floor(countdown / 60)}:
          {(countdown % 60).toString().padStart(2, '0')}
        </Typography>
        {expired && (
          <Typography sx={{ textAlign: 'center', mt: 2, color: 'red' }}>
            OTP code has expired. Please <Link to="/login">log in again</Link>.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default OtpView;
