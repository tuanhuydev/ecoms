import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
