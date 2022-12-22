import { SxProps, useTheme } from '@mui/material';
import { selectOpenSidebar } from '@store/slices/metaSlice';
import grey from '@mui/material/colors/grey';

export const navItemStyles = (): SxProps => {
  const open = selectOpenSidebar();
  const { spacing, palette, transitions, typography } = useTheme();
  const transitionPadding = transitions.create('padding', {
    easing: transitions.easing.sharp,
    duration: transitions.duration.leavingScreen
  });
  return {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
    px: spacing(0.5),
    py: spacing(0),
    mb: spacing(0.25),
    transition: transitionPadding,
    '&:hover': {
      '& .nav-link': {
        fontWeight: typography.fontWeightBold,
        background: grey[200],
        borderRadius: spacing(0.25)
      }
    },
    '& .nav-link': {
      transition: transitionPadding,
      px: spacing(open ? 0.75 : 0.5),
      py: spacing(0.5),
      background: palette.background.default,
      color: palette.text.primary,
      fontWeight: typography.fontWeightRegular,

      '&.active': {
        fontWeight: typography.fontWeightBold,
        background: grey[200],
        borderRadius: spacing(0.25)
      }
    }
  };
};
