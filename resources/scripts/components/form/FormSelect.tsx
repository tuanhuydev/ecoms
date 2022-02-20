import { Controller, ControllerProps } from 'react-hook-form';
import React from 'react';
import Select from 'react-select';

export interface FormSelectProps extends Partial<ControllerProps> {
  control: any;
  className?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  options: Array<any>;
}

const FormSelect = (props: FormSelectProps) => {
  const { options, ...restProps } = props;

  return (
    <Controller
      {...restProps}
      render={({
        field: { onChange, onBlur, value, name }
      }) => (
        <Select
          onChange={onChange}
          onBlur={onBlur}
          options={options}
          value={value}
          name={name}
        />
      )}
    />);
};

export default FormSelect;
