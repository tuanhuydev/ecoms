import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

const Input = (props: any) => {
  const { className = '', ...restProps } = props;
  const inputClasses = clsx(styles.input, className);

  return (
    <input {...restProps} className={inputClasses} />
  );
};

export default Input;
