import React, { DetailedHTMLProps, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

export interface TextareaProps extends
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  value?: string;
  name?: string;
}

const Textarea = (props: TextareaProps) => {
  const { className = '', value = '', disabled = false, ...restProps } = props;
  const textareaRef = useRef();

  const textareaClasses = clsx(styles.textarea, className);

  /**
   * Calculate and update textarea height base on text height
   */
  const onInputFitSize = () => {
    if (textareaRef.current) {
      const textareaElement = textareaRef.current as HTMLTextAreaElement;
      textareaElement.style.minHeight = '25px';
      textareaElement.style.height = (textareaElement.scrollHeight) + 'px';
    }
  };

  return (
    <textarea
      {...restProps}
      ref={textareaRef}
      onInput={onInputFitSize}
      className={textareaClasses}
      value={value}
      disabled={disabled}
    ></textarea>
  );
};

export default Textarea;
