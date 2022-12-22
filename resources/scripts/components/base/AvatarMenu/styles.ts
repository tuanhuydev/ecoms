import { SxProps } from '@mui/system';
import { USER_AVAILABILITY } from 'scripts/configs/enums';
import { green, grey, red, yellow } from '@mui/material/colors';
import { useTheme } from '@mui/material';

const getStyles = () => {
  const theme = useTheme();

  const avatarSize: SxProps = {
    width: 36,
    height: 36,
    m: 0,
    p: 0
  };
  const avatarStyles: SxProps = {
    display: 'flex',
    alignItems: 'center'
  };

  const paperStyles: SxProps = {
    overflow: 'visible',
    width: 250,
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '&:before': {
      // Arrow edge
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: theme.palette.background.paper,
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0
    }
  };

  const statusBadgeStyles: SxProps = (availability: USER_AVAILABILITY) => {
    const colorMap = {
      AVAILABLE: green[300],
      AWAY: yellow[300],
      BUSY: red[300],
      OFFLINE: grey[300]
    };
    return {
      '& .MuiBadge-badge': {
        backgroundColor: `${colorMap[availability]}`,
        color: `${colorMap[availability]}`,

        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: 'ripple 1.2s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""'
        }
      },
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(.8)',
          opacity: 1
        },
        '100%': {
          transform: 'scale(2.4)',
          opacity: 0
        }
      }
    };
  };

  const nameStyles: SxProps = {
    m: 0,
    fontWeight: theme.typography.fontWeightBold
  };
  const emailStyles: SxProps = {
    m: 0,
    color: grey[500]
  };

  const signOutStyles: SxProps = {
    color: grey[700],
    fontSize: theme.typography.subtitle2
  };

  const selectStyles: any = {
    control: {
      background: 'transparent',
      borderColor: 'transparent',
      padding: 0,
      '&:hover': {
        borderColor: 'transparent'
      }
    },
    valueContainer: {
      padding: 0
    },
    input: {
      margin: 0
    },
    menu: {
      padding: 0.25,
      fontSize: theme.typography.pxToRem(14)
    }
  };

  return {
    avatarSize,
    avatarStyles,
    paperStyles,
    nameStyles,
    emailStyles,
    signOutStyles,
    selectStyles,
    statusBadgeStyles
  };
};

export default getStyles;
