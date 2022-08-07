import { SxProps } from '@mui/system';
import { useTheme } from '@mui/material';
import red from '@mui/material/colors/red';

const getStyles = () => {
  const theme = useTheme();

  const labelStyles: SxProps = {
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.fontWeightBold
  };

  const errorStyles: SxProps = {
    ...labelStyles,
    color: red[400]
  };

  return {
    labelStyles,
    errorStyles
  };
};

export default getStyles;
