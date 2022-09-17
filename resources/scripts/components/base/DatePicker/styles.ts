import { SxProps } from '@mui/system';
import { grey } from '@mui/material/colors';

const getStyles = () => {
  const textFieldStyles: SxProps = {
    '&.MuiTextField-root': {
      backgroundColor: grey[50],
      flexGrow: 1,
      borderRadius: 1,
      border: `1px solid ${grey[200]}`
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
