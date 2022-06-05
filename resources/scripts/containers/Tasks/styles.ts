import { SxProps } from '@mui/system';
import { useTheme } from '@mui/material';
import grey from '@mui/material/colors/grey';

const getStyles = () => {
  const theme = useTheme();
  const toolbarStyles: SxProps = {
    backgroundColor: theme.palette.common.white,
    p: 1,
    mb: 0.25
  };

  const listContainerStyles: SxProps = {
    backgroundColor: theme.palette.common.white,
    flex: 1
  };

  const listItemStyles: SxProps = {
    minHeight: 48,
    marginBottom: theme.spacing(0.25),
    px: theme.spacing(0.25),
    borderRadius: theme.spacing(0.25),
    borderBottom: `1px solid ${grey[200]}`,
    '&:hover': {
      backgroundColor: grey[200]
    }
  };

  const buttonStyles: SxProps = {
    p: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:focus': {
      backgroundColor: 'transparent'
    }
  };

  const labelStyles: SxProps = {
    display: 'flex',
    WebkitAlignItems: 'center',
    marginRight: theme.spacing(0.5),
    color: grey[400]
  };

  const renewIconStyles: SxProps = {
    color: grey[400],
    width: 18,
    height: 18
  };

  const chipStyles: SxProps = {
    textTransform: 'capitalize',
    width: 80
  };

  return {
    toolbarStyles,
    listContainerStyles,
    buttonStyles,
    listItemStyles,
    labelStyles,
    renewIconStyles,
    chipStyles
  };
};

export default getStyles;
