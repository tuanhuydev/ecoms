import { Controller, ControllerProps } from 'react-hook-form';
import BaseDatePicker from '@components/base/DatePicker';
import React from 'react';

export interface FormSelectProps extends Partial<ControllerProps> {
  control: any;
  className?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  options: Array<any>;
}

const FormDatePicker = (props: any) => {
  const { disabled = false, ...restProps } = props;

  return (
    <Controller
      {...restProps}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <BaseDatePicker onChange={onChange} onBlur={onBlur} value={value} name={name} disabled={disabled} />
      )}
    />
  );
};

export default FormDatePicker;
