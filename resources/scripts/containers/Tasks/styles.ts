import { SxProps } from '@mui/system';
import { useTheme } from '@mui/material';
import grey from '@mui/material/colors/grey';

const getStyles = () => {
  const theme = useTheme();
  const maxContentHeight = 'calc(100vh - 68px - 64px)';

  const quickSearchStyles: SxProps = {
    backgroundColor: theme.palette.common.white,
    p: 1,
    mb: 0.25
  };

  const toolbarStyles: SxProps = {
    ...quickSearchStyles,
    display: 'flex'
  };

  const listContainerStyles: SxProps = {
    backgroundColor: theme.palette.common.white,
    flex: 1,
    maxHeight: maxContentHeight,
    overflow: 'auto'
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
    fontSize: 'small',
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

  const createButtonStyles: SxProps = {
    px: 0.5,
    py: 0.25,
    ml: 'auto'
  };

  const typographyStyles: SxProps = {
    width: 600,
    mr: 2
  };
  const emptyRecordStyles: SxProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: maxContentHeight,
    color: grey[400],
    textTransform: 'capitalize',
    fontSize: theme.typography.body1
  };

  const skeletonStyles: SxProps = {
    flex: 1
  };

  return {
    toolbarStyles,
    quickSearchStyles,
    listContainerStyles,
    buttonStyles,
    listItemStyles,
    labelStyles,
    renewIconStyles,
    chipStyles,
    createButtonStyles,
    typographyStyles,
    emptyRecordStyles,
    skeletonStyles
  };
};

export default getStyles;
