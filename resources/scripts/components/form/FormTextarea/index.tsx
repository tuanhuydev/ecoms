import { Controller, ControllerProps } from 'react-hook-form';
import { EMPTY_STRING } from '../../../configs/constants';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import React from 'react';
import Textarea from '@components/base/Textarea';
import getStyles from './styles';

export interface FormTextareaProps extends Partial<ControllerProps> {
  control: any;
  className?: string;
  placeholder?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  sx?: SxProps;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (event: any) => void
}

const FormTextarea = (props: FormTextareaProps) => {
  const { control, className, placeholder, disabled = false, onBlur: handleBlur, label, sx = {}, ...restProps } = props;
  const styles = getStyles();
  return (
    <Controller
      {...restProps}
      control={control}
      render={({
        field: { onChange, onBlur, value, name }
      }) => {
        return (
          <>
            {label && (<Box component="label" sx={styles.labelStyles} aria-label={label}>{label}</Box>)}
            <Textarea
              onBlur={(e) => {
                onBlur();
                if (handleBlur) {
                  handleBlur(e);
                }
              }}
              sx={sx}
              onChange={onChange}
              className={className}
              placeholder={placeholder}
              value={value || EMPTY_STRING}
              name={name}
              disabled={disabled}
            />
          </>

        );
      }}
    />);
};

export default FormTextarea;
