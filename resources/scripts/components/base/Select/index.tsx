import { useTheme } from '@mui/material';
import React, { RefObject } from 'react';
import Select from 'react-select';

const BaseSelect = React.forwardRef((props: any, ref: RefObject<any>) => {
  const { disabled, ...restProps } = props;
  const theme = useTheme();
  const customStyles = {
    control: () => ({
      width: '100%',
      display: 'flex',
      background: '#FAFAFA',
      borderRadius: 4,
      '&:hover': {
        background: '#EEE'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: theme.palette.common.black
    })
  };
  return (
    <Select {...restProps} isDisabled={disabled} ref={ref} styles={customStyles} width='300px' />
  );
});

export default BaseSelect;
