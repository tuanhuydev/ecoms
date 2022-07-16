import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import React, { DetailedHTMLProps, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import getStyles from './styles';

export interface TextareaProps extends
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  value?: string;
  name?: string;
  sx?: SxProps;
}

const Textarea = (props: TextareaProps) => {
  const { value = '', disabled = false, sx, ...restProps } = props;
  const textareaRef = useRef();
  const styles = getStyles();
  /**
   * Calculate and update textarea height base on text height
   */
  const onInputFitSize = () => {
    if (textareaRef.current) {
      const textareaElement = textareaRef.current as HTMLTextAreaElement;
      textareaElement.style.overflowY = 'hidden';
      textareaElement.style.height = 'auto';
      textareaElement.style.height = `${textareaElement.scrollHeight}px`;
    }
  };

  useEffect(() => {
    onInputFitSize();
  }, []);

  return (
    <Box
      {...restProps}
      sx={{ ...styles.textareaStyles, ...sx }}
      component="textarea"
      ref={textareaRef}
      onInput={onInputFitSize}
      value={value}
      disabled={disabled}
    ></Box>
  );
};

export default Textarea;
