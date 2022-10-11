import { SxProps } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material';

const getStyles = () => {
  const theme = useTheme();

  const textareaStyles: SxProps = {
    fontFamily: theme.typography.fontFamily,
    outline: 'none',
    resize: 'none',
    width: '100%',
    p: '0.875rem',
    m: 0,
    borderRadius: 1,
    border: '1px solid transparent',
    backgroundColor: grey[50],
    '&:not(:disabled)': {
      borderColor: grey[200]
    },
    '&:focus': {
      '&:not(:disabled)': {
        backgroundColor: grey[200]
      }
    },

    '&:disabled': {
      backgroundColor: 'transparent'
    }
  };

  return {
    textareaStyles
  };
};

export default getStyles;
