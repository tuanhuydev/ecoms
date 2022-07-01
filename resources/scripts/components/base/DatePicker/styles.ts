import { SxProps } from '@mui/system';
import { grey } from '@mui/material/colors';

const getStyles = () => {
  const textFieldStyles: SxProps = {
    '&.MuiTextField-root': {
      backgroundColor: grey[50],
      flexGrow: 1
    },
    '& .MuiInputBase-input': {
      height: 32,
      px: '0.875rem',
      py: 0
    },
    '& fieldset': {
      border: 'none'
    }
  };

  return {
    textFieldStyles
  };
};

export default getStyles;
