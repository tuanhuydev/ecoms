import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, RefObject } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

export interface InputClasses {
  root: string;
  input?: string;
  icon?: string;
}

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  icon?: ReactNode | string;
  iconPosition?: 'start' | 'end';
  classes?: InputClasses;
}

const Input = React.forwardRef((props: InputProps, ref: RefObject<any>) => {
  const { className = '', classes = { root: '' }, icon, iconPosition = 'start', ...restProps }: InputProps = props;

  // styles merging
  let rootClasses = clsx(styles.container, className, classes?.root);
  const inputClasses = clsx(styles.input, classes?.input);
  const iconClasses = clsx(styles.icon, classes?.icon);

  if (iconPosition === 'end') {
    rootClasses = clsx(rootClasses, styles.rightToLeft);
  }

  return (
    <div className={rootClasses}>
      {icon && <div className={iconClasses}>{icon}</div>}
      <input {...restProps} ref={ref} className={inputClasses} />
    </div>
  );
});

export default Input;
