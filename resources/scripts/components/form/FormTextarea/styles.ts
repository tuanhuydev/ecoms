import { SxProps } from '@mui/system';
import { useTheme } from '@mui/material';
import grey from '@mui/material/colors/grey';

const getStyles = () => {
  const theme = useTheme();

  const labelStyles: SxProps = {
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.fontWeightBold
  };

  const textareaStyles: SxProps = {
    display: 'block',
    fontSize: '1rem',
    borderColor: grey[200],
    backgorundColor: grey[50],
    fontWeight: theme.typography.fontWeightRegular,
    py: 0,
    px: 0.5,

    '&::placeholder': {
      fontSize: theme.typography.caption,
      color: grey[600]
    }
  };

  return {
    labelStyles,
    textareaStyles
  };
};

export default getStyles;
