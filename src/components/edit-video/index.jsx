/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import VideoRecorder from 'react-video-recorder';
import React, { useRef, useState, useEffect } from 'react';

import {
  Box,
  Input,
  Dialog,
  Button,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import { DELETE_MEDIA, DELETE_TAG_URL, UPDATE_MEDIA } from 'src/constants/apiEndPoints';

import httpRequest from '../../axios';
import ConfirmationDialog from '../delete';
import CircularProgressWithLabel from '../uploadprogress';

// eslint-disable-next-line react/prop-types
const EditMediaDialog = ({
  // eslint-disable-next-line react/prop-types
  userId,
  openDialog,
  handleCloseDialog,
  // eslint-disable-next-line react/prop-types
  fetchMedia = () => {},
  // eslint-disable-next-line react/prop-types
  EditMedia = {},
  // eslint-disable-next-line react/prop-types
  Edittype = '',
  isVideoOnly = false,
  customAPI,
  tagId,
}) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(EditMedia?.recordedDate);

  const [selectedFile, setSelectedFile] = useState(EditMedia?.file || null);
  const [UploadFile, setUploadFile] = useState(null);

  const [title, setTitle] = useState(EditMedia?.title || '');
  const [description, setDescription] = useState(EditMedia?.description || '');
  const [recordedDate, setRecordedDate] = useState(formattedDate || '');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fileExtension, setFileExtension] = useState('');
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [ProgressUpload, setProgressUpload] = useState(0);

  const handleRecordingComplete = (vid) => {
    const videoFile = new File([vid], 'recorded-video.mp4', { type: 'video/mp4' });
    setUploadFile(videoFile);
    const url = URL.createObjectURL(videoFile);
    setSelectedFile(url);
    setIsRecording(false);
  };

  useEffect(() => {
    setTitle(EditMedia?.title);
    setDescription(EditMedia?.description);
    setRecordedDate(formattedDate);
    setSelectedFile(EditMedia?.file);
    const fileExtensionnew = selectedFile?.split('.').pop().toLowerCase();
    setFileExtension(fileExtensionnew);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [EditMedia]);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
        setSelectedFile(URL.createObjectURL(file));
        setUploadFile(file);
        setError('');
      } else {
        setError('Invalid file type. Please upload a valid image or video.');
        setSelectedFile(null);
        setUploadFile(null);
      }
    }
  };

  // eslint-disable-next-line consistent-return
  const handleUpload = async () => {
    const formData = new FormData();
    if (!customAPI) {
      formData.append('subUserId', userId);
    } else {
      formData.append('tagId', tagId);
    }

    if (UploadFile !== null) {
      formData.append('file', UploadFile);
      const fileType = UploadFile?.type.split('/')[0]; // 'image' or 'video'
      formData.append('type', fileType);
    } else {
      formData.append('type', Edittype);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('recordedDate', recordedDate);
    formData.append('mediaId', EditMedia?._id);

    setLoading(true);
    const url = customAPI || UPDATE_MEDIA;
    try {
      const response = await httpRequest.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
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
  };

  const handleBothActions = () => {
    handleCloseDialog();
    handleEmptyFields();
  };
  const handleEmptyFields = () => {
    setTitle('');
    setDescription('');
    setRecordedDate('');
    setSelectedFile(null);
    setUploadFile(null);
    setError('');
  };

  const today = new Date().toISOString().split('T')[0];

  const handleDeletemedia = async () => {
    const payload = customAPI
      ? {
          tagId,
          type: Edittype,
        }
      : {
          subUserId: userId,
          mediaId: EditMedia?._id,
          type: Edittype,
        };

    setLoading(true);
    const url = tagId?DELETE_TAG_URL:DELETE_MEDIA;
    try {
      const response = await httpRequest.post(url, payload);
      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message);
        handleCloseDialog();
        setOpenDeleteUser(false);
        handleEmptyFields();
        fetchMedia();
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      disableGutters
      open={openDialog}
      onClose={handleBothActions}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: { sm: '50px' },
          }}
        >
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
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: { sm: '30px', xs: '24px' },
              pt: { sm: '20px' },
            }}
          >
            {isVideoOnly ? 'Edit Video' : 'Edit Image or Video'}
          </Typography>
          <IconButton
            sx={{ backgroundColor: '#024397', ':hover': { backgroundColor: '#024397' } }}
            onClick={() => setOpenDeleteUser(true)}
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
              <path d="M7.12484 7.91675H5.5415V14.2501H7.12484V7.91675Z" fill="white" />
              <path d="M10.2918 7.91675H8.7085V14.2501H10.2918V7.91675Z" fill="white" />
            </svg>
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: { sm: 6 } }}>
        <Box mb={4}>
          <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Title</Typography>
          <TextField
            fullWidth
            value={title || ''}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Your Title Here"
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
            onChange={(e) => setDescription(e.target.value)}
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
        <Box mb={4}>
          <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Recorded Date</Typography>
          <TextField
            fullWidth
            placeholder="Enter Your Date Here"
            type="date"
            name="date"
            value={recordedDate}
            onChange={(e) => setRecordedDate(e.target.value)}
            inputProps={{ max: today }}
            sx={{
              px: 1,
              borderRadius: '51px',
              backgroundColor: '#F2F3F5',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
        </Box>

        <Box mb={4}>
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
          >
            {selectedFile ? (
              Edittype === 'video' ? (
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
                <Typography sx={{ textDecoration: 'underline' }}>Click to upload</Typography>
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
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: { sm: 3, xs: 1 } }}
        >
          <Button
            variant="contained"
            onClick={() => setIsRecording(true)}
            sx={{
              width: '100%',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '44px',
              px: { sm: '19px' },
              py: '11px',
              textTransform: 'none',
              background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
              transition: 'background-color 0.9s ease', // Adding transition for smooth animation
              '&:hover': {
                background:
                  'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
              },
            }}
          >
            Record a Video
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            sx={{
              width: '100%',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '44px',
              px: { sm: '19px' },
              py: '11px',
              textTransform: 'none',
              background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
            }}
          >
            {loading ? <CircularProgressWithLabel value={ProgressUpload - 5} /> : 'Update'}
          </Button>
        </Box>
        {isRecording && (
          <Box
            sx={{
              height: '100vh',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            <VideoRecorder
              style={{ zIndex: 999 }}
              timeLimit={120000}
              onRecordingComplete={handleRecordingComplete}
            />
          </Box>
        )}
      </DialogContent>
      <ConfirmationDialog
        openDialog={openDeleteUser}
        loading={loading}
        setOpenDialog={setOpenDeleteUser}
        handleConfirmDisableUser={handleDeletemedia}
      />
    </Dialog>
  );
};

EditMediaDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  isVideoOnly: PropTypes.bool,
  tagId: PropTypes.string,
  customAPI: PropTypes.string,
};

export default EditMediaDialog;
