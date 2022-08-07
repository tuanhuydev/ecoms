import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import getStyles from './styles';
import isFunction from 'lodash/isFunction';

export interface ConfirmBoxProps {
  open?: boolean;
  title?: string;
  message?: string;
  onClose: Function;
  onSubmit: Function;
  cancelLabel?: string;
  submitLabel?: string;
}

const ConfirmBox = ({
  open = false,
  onClose,
  onSubmit,
  cancelLabel = 'Cancel',
  submitLabel = 'Submit',
  title = 'Title',
  message = 'Content'
}: ConfirmBoxProps) => {
  const styles = getStyles();

  const handleClose = () => {
    if (isFunction(onClose)) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (isFunction(onSubmit)) {
      onSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      { title && (<DialogTitle id="alert-dialog-title" sx={styles.titleStyles}>{title}</DialogTitle>) }
      { message && (<DialogContent sx={styles.messageStyles}>{message}</DialogContent>) }
      <DialogActions>
        <Button onClick={handleClose}>{cancelLabel}</Button>
        <Button onClick={handleSubmit} autoFocus>{submitLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmBox;
