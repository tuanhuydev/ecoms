import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import DatePicker from '@mui/lab/DatePicker';
import React from 'react';
import TextField from '@mui/material/TextField';
import getStyles from './styles';

const BaseDatePicker = (props: any) => {
  const styles = getStyles();

  return (<LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      {...props}
      renderInput={(params) => (
        <TextField {...params} sx={styles.textFieldStyles} />
      )}
    />
  </LocalizationProvider>);
};

export default BaseDatePicker;
