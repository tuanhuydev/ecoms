import { SxProps } from '@mui/system';
import { Theme, useTheme } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

const getStyles = () => {
  const theme = useTheme();

  const wrapperStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };

  const formStyles: SxProps<Theme> = {
    px: 1,
    py: 0.5,
    mb: 0.25,
    background: theme.palette.common.white
  };

  const listWrapperStyles: SxProps<Theme> = {
    flex: 1,
    background: theme.palette.common.white
  };

  const listStyles: SxProps<Theme> = {
    width: '100%',
    background: theme.palette.common.white,
    mt: 1
  };

  const listItemStyles: SxProps<Theme> = {
    minHeight: 48,
    px: 0.75,
    marginBottom: theme.spacing(0.25),
    borderRadius: theme.spacing(0.25),
    borderBottom: `1px solid ${grey[200]}`,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard
    }),
    '&:hover': {
      backgroundColor: grey[200]
    }
  };

  const buttonStyles: SxProps<Theme> = {
    p: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:focus': {
      backgroundColor: 'transparent'
    }
  };

  return { wrapperStyles, formStyles, listWrapperStyles, listStyles, listItemStyles, buttonStyles };
};

export default getStyles;
