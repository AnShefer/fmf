import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

// eslint-disable-next-line react/prop-types
const ConfirmationDialog = ({
  openDialog,
  setOpenDialog,
  handleConfirmDisableUser,
  // eslint-disable-next-line react/prop-types
  loading = false,
}) => (
  <Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  PaperProps={{
      sx: {
        px: '101px',
        py: '50px',
        borderRadius: '20px',
        background: '#FFF',
        boxShadow:
          '-2px -2px 13.3px 0px rgba(0, 0, 0, 0.15), 3px 4px 9.7px 0px rgba(0, 0, 0, 0.17)',
      },
    }}
    BackdropProps={{
      style: {
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)', // For Safari
      },
    }}
  >
    <DialogTitle sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'center' }}>
      Are You Sure?
    </DialogTitle>
    <DialogContent>
      <Typography sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'center' }}>
        You Want To Delete This?
      </Typography>
    </DialogContent>
    <DialogActions
      sx={{
        justifyContent: 'center',
        flexDirection: 'column',
        pb: '20px',
        gap: '15px',
      }}
    >
      <Button
        disabled={loading}
        onClick={() => {
          handleConfirmDisableUser();
        }}
        sx={{
          backgroundColor: '#F71A1A',
          color: '#FFF',
          width: '294px',
          borderRadius: '53px',
          '&:hover': {
            backgroundColor: '#EB5757',
          },
        }}
      >
        {loading ? <CircularProgress sx={{ color: 'white' }} size="1.5rem" />: 'Yes'}
      </Button>
      <Button
        onClick={() => setOpenDialog(false)}
        sx={{
          background: 'linear-gradient(90deg, #024397 0%, #147FF4 52.5%, #014092 100%)',
          color: '#FFF',
          width: '294px',
          borderRadius: '53px',
          '&:hover': {
            background: 'linear-gradient(360deg, #024397 10%, #147FF4 92.5%, #014092 100%)',
          },
        }}
      >
        No
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  handleConfirmDisableUser: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
