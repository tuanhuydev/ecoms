import { SxProps } from '@mui/system';
import { grey, red } from '@mui/material/colors';
import { useTheme } from '@mui/material';

const getStyles = () => {
  const theme = useTheme();

  const inputStyles: SxProps = {
    '&.MuiOutlinedInput-root': {
      backgroundColor: grey[50],
      width: '100%',
      '&.Mui-focused': {
        backgroundColor: grey[200],

        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent'
        }
      }
    },

    '.MuiOutlinedInput-input': {
      py: 0,
      px: 0.5,
      height: 36,

      '&::placeholder': {
        fontSize: theme.typography.caption,
        color: grey[600]
      }
    },
    '&.Mui-disabled': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: grey[200]
      },
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: grey[200]
        }
      }
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: grey[200]
      }
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: grey[200]
    }
  };

  const labelStyles: SxProps = {
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.fontWeightBold
  };

  const errorStyles: SxProps = {
    ...labelStyles,
    color: red[400]
  };

  return {
    inputStyles,
    labelStyles,
    errorStyles
  };
};

export default getStyles;
