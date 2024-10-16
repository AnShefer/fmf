/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useRef, useState } from 'react';
import VideoRecorder from 'react-video-recorder';

import {
  Box,
  Grid,
  Input,
  Dialog,
  Button,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import { UPLOAD_MEDIA } from 'src/constants/apiEndPoints';

import httpRequest from '../../axios';
import CircularProgressWithLabel from '../uploadprogress';

// eslint-disable-next-line react/prop-types
const UploadDialog = ({ userId, openDialog, handleCloseDialog, fetchMedia = () => {}, isVideoOnly=false, customAPI, tagId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [UploadFile, setUploadFile] = useState(null);

  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const file = event.dataTransfer.files[0];
  //   if (file) {
  //     setSelectedFile(URL.createObjectURL(file));
  //     setError(null);
  //   }
  // };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recordedDate, setRecordedDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [ProgressUpload, setProgressUpload] = useState(0);

  const handleRecordingComplete = (vid) => {
    const videoFile = new File([vid], 'recorded-video.mp4', { type: 'video/mp4' });
    setUploadFile(videoFile);
    const url = URL.createObjectURL(videoFile);
    setSelectedFile(url);
    setIsRecording(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  };
  
  const handleFile = (file) => {
    const fileType = file.type;
    const validImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff',
      'image/webp',
      'image/svg+xml',
      'image/avif',
    ];
    const validVideoTypes = [
      'video/mp4',
      'video/quicktime',
      'video/avi',
      'video/x-matroska',
      'video/webm',
      'video/x-flv',
      'video/x-ms-wmv',
      'video/mpeg',
      'video/x-msvideo',
    ];
  
    if (validImageTypes.includes(fileType) || validVideoTypes.includes(fileType)) {
      const fileURL = URL.createObjectURL(file);
      setSelectedFile(fileURL);  // Set preview URL
      setUploadFile(file);
      setError('');
    } else {
      setError('Invalid file type. Please upload a valid image or video.');
      setSelectedFile(null);
      setUploadFile(null);
    }
  };
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setRecordedDate(event.target.value);
  };

  // eslint-disable-next-line consistent-return
  const handleUpload = async () => {
    if (title === '') {
      return toast.error('Please enter title');
    }
    // if (description === '') {
    //   return toast.error('Please enter description');
    // }
    if (recordedDate === '') {
      return toast.error('Please enter recorded date');
    }

    if (!selectedFile) {
      return toast.error('Please upload image or video');
    }

    if (selectedFile) {
      const formData = new FormData();
      if (!customAPI) {
        formData.append('subUserId', userId);
      } else {
        formData.append('tagId', tagId);
      }
      formData.append('file', UploadFile);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('recordedDate', recordedDate);


      const fileType = UploadFile?.type.split('/')[0];
      formData.append('type', fileType);

      setLoading(true);

      try {
        const url = customAPI || UPLOAD_MEDIA;
        const response = await httpRequest.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgressUpload(percentCompleted);
            }
          },
        });
        if (response.status === 200 || response.status === 201) {
          toast.success(response.data?.message);
          handleCloseDialog();
          handleEmptyFields();
          fetchMedia();
        }
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
        setProgressUpload(0);
      }
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const handleBothActions = () => {
    handleCloseDialog();
    handleEmptyFields();
  };

  const handleEmptyFields = () => {
    setTitle('');
    setDescription('');
    setRecordedDate(new Date().toISOString().slice(0, 10));
    setSelectedFile(null);
    setUploadFile(null);
    setError('');
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleBothActions}
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
        <IconButton onClick={handleBothActions}>
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
              pb: { sm: '20px', xs: `10px` },
            }}
          >
            {isVideoOnly ? 'Upload Video' : 'Upload Image or Video'}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid sx={{ px: { sm: '50px' } }} container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box mb={4}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Title</Typography>
              <TextField
                fullWidth
                placeholder="Enter Your Title Here"
                value={title}
                onChange={handleTitleChange}
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
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M0.565663 0.751305L0 6.22092L2.74232 8.05738L1.13074 10.658V12.8844L5.59228 14L3.23954 11.9963L6.39544 10.2698V6.66411L14 7.04824V0L0.565663 0.751305ZM2.76221 11.5906L1.76601 10.7422L3.22843 8.38363L5.65487 10.0084L2.76221 11.5906ZM5.8093 9.40856L1.33021 6.4086L5.8093 6.63487V9.40856ZM13.4139 6.43316L0.632934 5.78768L1.09623 1.30733L13.4144 0.618V6.43257L13.4139 6.43316Z"
                          fill="black"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mb={6} sx={{ height: '233px' }}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Description</Typography>
              <TextField
                fullWidth
                placeholder="Enter Your Description Here"
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                sx={{
                  borderRadius: '10px',
                  backgroundColor: '#F2F3F5',
                  width: '100%',
                  height: '100%',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                width: '100%',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '44px',
                px: '19px',
                py: '11px',
                textTransform: 'none',
                background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                transition: 'background-color 0.9s ease',
                '&:hover': {
                  background:
                    'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                },
              }}
              onClick={() => {
                setIsRecording(true);
              }}
            >
              Record a Video
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={4}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>
                Recorded Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="date"
                value={recordedDate}
                onChange={handleDateChange}
                inputProps={{ max: today }}
                sx={{
                  px: 1,
                  width: '100%',
                  borderRadius: '51px',
                  backgroundColor: '#F2F3F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>
            <Box mb={2}>
              <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>
                {isVideoOnly ? 'Upload Video' : 'Upload Image or Video'}
              </Typography>
              <Input
                type="file"
                accept="image/*,video/*"
                name="file"
                inputRef={fileInputRef}
                sx={{ display: 'none' }}
                onChange={handleFileChange}
              />
             <Box
  sx={{
    border: '1px dashed #000000',
    height: '235px',
    borderRadius: '10px',
    p: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  }}
  onClick={handleClick}
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
>
  {selectedFile ? (
    UploadFile?.type?.startsWith('video') ? (
      <video
        src={selectedFile}
        controls
        style={{ maxWidth: '100%', maxHeight: '200px' }}
      />
    ) : (
      <img
        src={selectedFile}
        alt="Selected"
        style={{ maxWidth: '100%', maxHeight: '200px' }}
      />
    )
  ) : (
    <>
      <Typography
        sx={{
          textDecoration: 'underline',
          color: '#054EA8',
        }}
      >
        {isVideoOnly ? 'Click to upload Video' : 'Click to upload Images or Videos'}
      </Typography>
      <Typography>or drag and drop</Typography>
    </>
  )}
</Box>


              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              sx={{
                width: '100%',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '44px',
                px: '19px',
                py: '11px',
                textTransform: 'none',
                background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
                transition: 'background-color 0.9s ease',
                '&:hover': {
                  background:
                    'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                },
              }}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? <CircularProgressWithLabel value={ProgressUpload - 5} /> : 'Upload'}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      {isRecording && (
        <Box
          sx={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        >
          <VideoRecorder
            style={{ zIndex: 999 }}
            timeLimit={120000}
            onRecordingComplete={handleRecordingComplete}
          />
        </Box>
      )}
    </Dialog>
  );
};

UploadDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default UploadDialog;
