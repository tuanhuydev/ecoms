import { Controller } from 'react-hook-form';
import { DefaultObjectType } from '@utils/interfaces';
import { SxProps } from '@mui/material';
import Box from '@mui/system/Box';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput';
import React from 'react';
import getStyles from './styles';

export interface FormInputProps extends OutlinedInputProps {
  name: string;
  label?: string;
  errors?: DefaultObjectType;
  control?: any;
  placeholder?: string;
  disabled?: boolean;
  OutlinedInputProps?: Partial<OutlinedInputProps>;
};

const FormInput = ({
  onKeyDown, label,
  OutlinedInputProps = {},
  sx: customStyles = {},
  placeholder = '',
  disabled = false,
  ...restProps
}: FormInputProps) => {
  const { inputStyles, labelStyles, errorStyles } = getStyles();
  const styles: SxProps = { ...inputStyles, ...customStyles };
  return (
    <Controller
      {...restProps}
      defaultValue=""
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            {label && (<Box sx={labelStyles} component="label" aria-label={label}>{label}</Box>)}
            <Box sx={{ minHeight: 60 }}>
              <OutlinedInput
                {...OutlinedInputProps}
                {...field}
                autoComplete="off"
                disabled={disabled}
                placeholder={placeholder}
                sx={styles}
                onKeyDown={onKeyDown}
              />
              { error && (<Box component="span" sx={errorStyles}>{error.message}</Box>) }
            </Box>
          </>
        );
      }}
    />
  );
};

export default FormInput;
