import { SxProps } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material';

const getStyles = () => {
  const theme = useTheme();

  const textareaStyles: SxProps = {
    fontFamily: theme.typography.fontFamily,
    border: 'none',
    outline: 'none',
    resize: 'none',
    width: '100%',
    p: '0.875rem',
    m: 0,
    borderRadius: 1,
    backgroundColor: grey[50],
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
