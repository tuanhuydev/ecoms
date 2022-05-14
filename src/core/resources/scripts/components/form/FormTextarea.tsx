import { Controller, ControllerProps } from 'react-hook-form';
import { EMPTY_STRING } from '../../configs/constants';
import React from 'react';
import Textarea from '@components/base/Textarea';

export interface FormTextareaProps extends Partial<ControllerProps> {
  control: any;
  className?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (event: any) => void
}

const FormTextarea = (props: FormTextareaProps) => {
  const { control, className, placeholder, disabled = false, onBlur: handleBlur, ...restProps } = props;

  return (
    <Controller
      {...restProps}
      control={control}
      render={({
        field: { onChange, onBlur, value, name }
      }) => {
        return (
          <>
            <Textarea
              onBlur={(e) => { onBlur(); handleBlur(e); }}
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
