import { Controller } from 'react-hook-form';
import { DefaultObjectType } from 'scripts/interfaces/Meta';
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export interface FormTextFieldProps {
  name: string;
  onKeyDown?: (e: any) => void;
  errors?: DefaultObjectType;
  control?: any;
  TextFieldProps?: TextFieldProps
};

const FormTextField = ({ onKeyDown, TextFieldProps, ...restProps }: FormTextFieldProps) => {
  return (
    <Controller
      {...restProps}
      render={({ field: { onChange, name, ref, value } }) => (
        <TextField
          fullWidth
          autoComplete="off"
          label="Ex: Create new feature"
          {...TextFieldProps}
          value={value}
          name={name}
          ref={ref}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      )}
    />
  );
};

export default FormTextField;
