import { SxProps } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material';

const getStyles = () => {
  const theme = useTheme();

  const titleStyles: SxProps = {
    textAlign: 'center',
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.fontWeightBold,
    color: grey[900]
  };

  const messageStyles: SxProps = {
    color: grey[600],
    fontSize: theme.typography.body2
  };

  return {
    titleStyles,
    messageStyles
  };
};

export default getStyles;
