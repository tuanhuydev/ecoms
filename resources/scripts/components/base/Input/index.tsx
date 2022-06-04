import React, { RefObject } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

const Input = React.forwardRef((props: any, ref: RefObject<any>) => {
  const { className = '', ...restProps } = props;
  const inputClasses = clsx(styles.input, className);

  return (
    <input {...restProps} ref={ref} className={inputClasses} />
  );
});

export default Input;
