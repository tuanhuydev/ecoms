import { SxProps } from '@mui/system';
import { TASK_STATUS } from 'scripts/configs/enums';
import { useTheme } from '@mui/material';
import amber from '@mui/material/colors/amber';
import blue from '@mui/material/colors/blue';
import green from '@mui/material/colors/green';

const getStyles = () => {
  const theme = useTheme();

  const drawerStyles: SxProps = {
    '& .MuiDrawer-paper': {
      width: 400
    }
  };
  const toolbarStyles = (taskStatus?: string): SxProps => {
    const taskIsDone: boolean = taskStatus === TASK_STATUS.DONE;
    const taskIsProgress: boolean = taskStatus === TASK_STATUS.PROGRESS;
    const backgroundColor: string = taskIsDone ? green[400] : taskIsProgress ? amber[400] : blue[400];
    return {
      backgroundColor,
      height: 32,
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0)
      }
    };
  };

  const titleStyles = (taskStatus?: string): SxProps => {
    const taskIsDone: boolean = taskStatus === TASK_STATUS.DONE;
    const taskIsProgress: boolean = taskStatus === TASK_STATUS.PROGRESS;
    const backgroundColor: string = taskIsDone ? green[700] : taskIsProgress ? amber[700] : blue[700];
    return {
      backgroundColor: backgroundColor,
      padding: theme.spacing(0, 0.5),
      fontSize: theme.typography.fontSize,
      color: theme.palette.common.white,
      display: 'flex',
      alignItems: 'center',
      height: '100%'
    };
  };

  const headerButtonIconStyles = {
    fill: theme.palette.common.white,
    width: 14,
    height: 14
  };

  return {
    drawerStyles,
    toolbarStyles,
    titleStyles,
    headerButtonIconStyles
  };
};

export default getStyles;
