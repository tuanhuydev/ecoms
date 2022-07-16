import { USER_PERMISSION } from 'scripts/configs/enums';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material';
import React, { RefObject } from 'react';
import Select from 'react-select';

const BaseSelect = React.forwardRef((props: any, ref: RefObject<any>) => {
  const { disabled, ...restProps } = props;
  const theme = useTheme();
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      borderColor: grey[200]
    }),
    control: (provided: any) => ({
      ...provided,
      width: '100%',
      display: 'flex',
      background: grey[50],
      borderRadius: theme.shape.borderRadius,
      borderColor: grey[200],
      boxShadow: 'none',
      '&:hover': {
        borderColor: grey[200]
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: theme.typography.fontSize,
      color: theme.palette.common.black
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(12),
      color: grey[400]
    })
  };
  return (
    <Select
      {...restProps}
      isDisabled={disabled}
      ref={ref}
      styles={customStyles}
    />
  );
});

export default BaseSelect;
