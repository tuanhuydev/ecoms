import { SxProps } from '@mui/system';
import { Theme, useTheme } from '@mui/material/styles';

const getStyles = () => {
  const theme = useTheme();

  const wrapperStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  };

  const toolbarStyles: SxProps<Theme> = {
    background: theme.palette.common.white,
    mb: 0.25,
    px: 1
  };

  const typoStyles: SxProps<Theme> = {
    fontWeight: 'bold',
    fontFamily: "'Open Sans',sans-serif",
    mr: theme.spacing(1)
  };
  return { toolbarStyles, typoStyles, wrapperStyles };
};

export default getStyles;
