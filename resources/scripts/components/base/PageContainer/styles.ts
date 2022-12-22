import { SxProps } from '@mui/system';
import { useTheme } from '@mui/material';

const getStyles = () => {
  const theme = useTheme();

  const pageWrapper: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden'
  };

  const contentStyles: SxProps = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyles: SxProps = {
    fontWeight: 'bold',
    fontFamily: "'Open Sans',sans-serif",
    display: 'flex',
    alignItems: 'center'
  };

  const avatarStyles: SxProps = {
    ml: 'auto'
  };

  const spinnerStyles: SxProps = {
    ml: theme.spacing(0.5)
  };

  const toolbarStyles: SxProps = {
    background: 'white',
    mb: theme.spacing(0.25),
    px: theme.spacing(1)
  };

  return {
    pageWrapper,
    titleStyles,
    avatarStyles,
    spinnerStyles,
    toolbarStyles,
    contentStyles
  };
};

export default getStyles;
