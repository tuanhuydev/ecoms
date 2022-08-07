import { Controller, ControllerProps } from 'react-hook-form';
import BaseSelect from '@components/base/Select';
import Box from '@mui/material/Box';
import React from 'react';
import getStyles from './styles';

export interface FormSelectProps extends Partial<ControllerProps> {
  control: any;
  className?: string;
  placeholder?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: any;
  options: Array<any>;
}

const FormSelect = (props: FormSelectProps) => {
  const { options, disabled = false, label, defaultValue, ...restProps } = props;
  const styles = getStyles();
  return (
    <Controller
      {...restProps}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { error }
      }) => (
        <>
          {label && (<Box component="label" sx={styles.labelStyles} aria-label={label}>{label}</Box>)}
          <Box>
            <BaseSelect
              onChange={onChange}
              onBlur={onBlur}
              options={options}
              value={value}
              name={name}
              defaultValue={defaultValue}
              disabled={disabled}
            />
            { error && (<Box component="span" sx={styles.errorStyles}>{error.message}</Box>) }
          </Box>
        </>
      )}
    />);
};

export default FormSelect;
