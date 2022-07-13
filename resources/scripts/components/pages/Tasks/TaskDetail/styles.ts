import { SxProps } from '@mui/system';
import { TASK_STATUS } from 'scripts/configs/enums';
import { useTheme } from '@mui/material';
import amber from '@mui/material/colors/amber';
import blue from '@mui/material/colors/blue';
import green from '@mui/material/colors/green';
import grey from '@mui/material/colors/grey';

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

  const headerButtonIconStyles: SxProps = {
    fill: theme.palette.common.white,
    width: 14,
    height: 14
  };

  const taskIdStyles: SxProps = {
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    p: 0,
    ml: 0.25,
    minWidth: '1rem',
    '&:hover': {
      textDecoration: 'underline'
    }
  };

  const subTitleStyles: SxProps = {
    display: 'flex',
    fontSize: '0.75rem',
    px: theme.spacing(0.75),
    mb: theme.spacing(1),
    fontWeight: theme.typography.fontWeightLight,

    label: {
      fontSize: '0.75rem',
      color: grey[500]
    }
  };

  const labelGroupStyles: SxProps = {
    color: grey[500],
    width: '4rem',
    fontWeight: theme.typography.fontWeightLight,
    fontSize: theme.typography.fontSize,
    marginRight: theme.spacing(0.75)
  };

  const baseFieldGroupStyles: SxProps = {
    my: theme.spacing(0.5),
    fontSize: theme.typography.htmlFontSize,
    transition: 'all 0.25s'
  };

  const fieldGroupStyles: SxProps = {
    ...baseFieldGroupStyles,
    label: {
      px: theme.spacing(0.75)
    }
  };

  const inlineFieldGroupStyles: SxProps = {
    ...baseFieldGroupStyles,
    px: theme.spacing(0.75),
    display: 'flex',
    alignItems: 'center'
  };

  const textareaStyles = (editMode: boolean): SxProps => {
    return {
      transition: 'all 0.25s',
      marginTop: theme.spacing(0.25),
      px: editMode ? theme.spacing(0.75) : 0,
      textarea: {
        fontSize: '1rem',
        fontWeight: theme.typography.fontWeightRegular
      },
      "textarea[name='title']": {
        fontSize: '1.4rem',
        fontWeight: theme.typography.fontWeightBold
      }
    };
  };

  return {
    drawerStyles,
    toolbarStyles,
    titleStyles,
    headerButtonIconStyles,
    taskIdStyles,
    subTitleStyles,
    fieldGroupStyles,
    inlineFieldGroupStyles,
    textareaStyles,
    baseFieldGroupStyles,
    labelGroupStyles
  };
};

export default getStyles;
