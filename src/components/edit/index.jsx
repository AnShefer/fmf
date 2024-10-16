import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

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

const EditMediaDialog = ({ openDialog, handleCloseDialog }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog
      disableGutters
      open={openDialog}
      onClose={handleCloseDialog}
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
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: { sm: '30px', xs: '24px' },
              pt: { sm: '20px' },
            }}
          >
            Edit Image or Video
          </Typography>
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

        <Box mb={4}>
          <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>Recorded Date</Typography>
          <TextField
            fullWidth
            placeholder="Enter Your Date Here"
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
                      d="M4.375 7H3.20833C2.72592 7 2.33333 7.39258 2.33333 7.875V9.04167C2.33333 9.52408 2.72592 9.91667 3.20833 9.91667H4.375C4.85742 9.91667 5.25 9.52408 5.25 9.04167V7.875C5.25 7.39258 4.85742 7 4.375 7ZM4.66667 9.04167C4.66667 9.20267 4.53542 9.33333 4.375 9.33333H3.20833C3.04792 9.33333 2.91667 9.20267 2.91667 9.04167V7.875C2.91667 7.714 3.04792 7.58333 3.20833 7.58333H4.375C4.53542 7.58333 4.66667 7.714 4.66667 7.875V9.04167ZM11.375 1.16667H10.5V0.291667C10.5 0.130667 10.3693 0 10.2083 0C10.0473 0 9.91667 0.130667 9.91667 0.291667V1.16667H4.08333V0.291667C4.08333 0.130667 3.95267 0 3.79167 0C3.63067 0 3.5 0.130667 3.5 0.291667V1.16667H2.625C1.17775 1.16667 0 2.34442 0 3.79167V11.375C0 12.8222 1.17775 14 2.625 14H11.375C12.8222 14 14 12.8222 14 11.375V3.79167C14 2.34442 12.8222 1.16667 11.375 1.16667ZM2.625 1.75H11.375C12.5008 1.75 13.4167 2.66583 13.4167 3.79167V4.66667H0.583333V3.79167C0.583333 2.66583 1.49917 1.75 2.625 1.75ZM11.375 13.4167H2.625C1.49917 13.4167 0.583333 12.5008 0.583333 11.375V5.25H13.4167V11.375C13.4167 12.5008 12.5008 13.4167 11.375 13.4167Z"
                      fill="black"
                    />
                  </svg>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box mb={4}>
          <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 400 }}>
            Upload Image or video
          </Typography>
          <Input
            type="file"
            inputRef={fileInputRef}
            sx={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Box
            sx={{
              border: '2px solid #9e9e9e',
              height: '212px',
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
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            ) : (
              <>
                <Typography sx={{ textDecoration: 'underline' }}>Click to upload</Typography>
                <Typography>or drag and drop</Typography>
              </>
            )}
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: { sm: 3, xs: 1 } }}
        >
          <Button
            variant="contained"
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
            Update
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

EditMediaDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default EditMediaDialog;
