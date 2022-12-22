import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import getStyles from './styles';

const BaseDatePicker = (props: any) => {
  const styles = getStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        {...props}
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
          <TextField {...params} sx={styles.textFieldStyles} />
        )}
      />
    </LocalizationProvider>
  );
};

export default BaseDatePicker;
