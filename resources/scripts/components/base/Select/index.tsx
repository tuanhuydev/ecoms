import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material';
import AsyncCreatableSelect from 'react-select/async-creatable';
import React, { RefObject } from 'react';
import Select from 'react-select';

const BaseSelect = React.forwardRef((props: any, ref: RefObject<any>) => {
  const { disabled, styles = {}, creatable = false, ...restProps } = props;
  const theme = useTheme();
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      borderColor: grey[200],
      ...styles?.container
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
      },
      ...styles?.control
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
    }),
    menu: (provided: any) => ({
      ...provided,
      fontSize: theme.typography.pxToRem(14),
      ...styles?.menu
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: grey[400],
      ...styles?.dropdownIndicator
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      ...styles?.valueContainer
    }),
    input: (provided: any) => ({
      ...provided,
      ...styles?.input
    })
  };

  return (
    <>
      {
        creatable
          ? (<AsyncCreatableSelect
            {...restProps}
            isDisabled={disabled}
            ref={ref}
            styles={customStyles}
            cacheOptions
            defaultOptions
          />)
          : (<Select {...restProps} isDisabled={disabled} ref={ref} styles={customStyles} />)
      }
    </>
  );
});

export default BaseSelect;
