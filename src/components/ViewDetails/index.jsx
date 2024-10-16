import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, Typography, DialogTitle, DialogContent } from '@mui/material';

// eslint-disable-next-line react/prop-types
const DescriptionModel = ({
  openDialog,
  setOpenModel,
  handleConfirmDisableUser,
  // eslint-disable-next-line react/prop-types
  content,
  // eslint-disable-next-line react/prop-types
  loading = false,
}) => (
  <Dialog open={openDialog} onClose={() => setOpenModel(false)}>
    <DialogTitle sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'center' }}>
      Description
    </DialogTitle>
    <DialogContent>
      <Typography>{content}</Typography>
    </DialogContent>
  </Dialog>
);

DescriptionModel.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenModel: PropTypes.func.isRequired,
  handleConfirmDisableUser: PropTypes.func.isRequired,
};

export default DescriptionModel;
