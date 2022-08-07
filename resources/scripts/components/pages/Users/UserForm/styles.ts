import { SxProps } from '@mui/system';
import { amber, blue, green } from '@mui/material/colors';
import { useTheme } from '@mui/material';

const getStyles = () => {
  const theme = useTheme();

  const drawerStyles: SxProps = {
    '& .MuiDrawer-paper': {
      width: 500
    }
  };
  const toolbarStyles: SxProps = {
    backgroundColor: blue[400],
    height: 32,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0)
    }
  };

  const toolbarMenuStyles: SxProps = {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  };

  const titleStyles: SxProps = {
    backgroundColor: blue[700],
    padding: theme.spacing(0, 0.5),
    fontSize: theme.typography.fontSize,
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  };

  const headerButtonIconStyles: SxProps = {
    fill: theme.palette.common.white,
    width: 14,
    height: 14
  };

  return {
    drawerStyles,
    toolbarStyles,
    titleStyles,
    headerButtonIconStyles,
    toolbarMenuStyles
  };
};

export default getStyles;
