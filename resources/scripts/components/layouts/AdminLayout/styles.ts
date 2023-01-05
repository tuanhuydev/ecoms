import { useTheme } from '@mui/material';

export const containerStyles = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden'
};

export const contentStyles = {
  flexGrow: 1,
  overflow: 'auto'
};

export const titleStyles = {
  flexGrow: 1,
  mx: 2,
  fontWeight: 'bold'
};

export const titleContainerStyles = () => {
  const theme = useTheme();
  return {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(0.75),
    marginBottom: theme.spacing(0.75)
  };
};
