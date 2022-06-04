import { ROUTE_PATHS } from 'scripts/configs/constants';
import { adminRoutes } from 'scripts/configs/routes';
import { matchPath, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '@store/slices/userSlice';
import AvatarMenu from '../AvatarMenu';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { ReactNode } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import getStyles from './styles';

export interface PageContainerProps {
  title: string;
  loading?: boolean;
  children?: ReactNode;
  ToolbarProps?: ToolbarProps;
};

const PageContainer = ({
  title = '',
  loading = false,
  children,
  ToolbarProps
}: PageContainerProps) => {
  const { pathname } = useLocation();
  const styles = getStyles();
  const { permission: userPermission } = selectCurrentUser();

  /**
   * Check current path match defined path
   * Check current path match defined route with path
   * Check user able to access current path by their permission
   */
  const isRouteAvailable = Object.values(ROUTE_PATHS).some((path) => {
    if (matchPath(pathname, path)) {
      return !!Object.values(adminRoutes).find((adminRoute) =>
        adminRoute.path === path && adminRoute.permissions.includes(userPermission.toUpperCase()));
    }
    return false;
  });

  // <Box sx={{ px: 2 }}>
  //   <Skeleton animation="pulse"></Skeleton>
  //   <Skeleton animation="pulse"></Skeleton>
  //   <Skeleton animation="pulse"></Skeleton>
  //   <Skeleton animation="pulse"></Skeleton>
  //   <Skeleton animation="pulse"></Skeleton>
  // </Box>;

  return (
    isRouteAvailable
      ? (<Box sx={styles.pageWrapper}>
        <Toolbar
          {...ToolbarProps}
          disableGutters
          sx={styles.toolbarStyles}>
          <Typography variant="h6" component="h6"
            sx={styles.titleStyles} >
            {title}
            {loading && <CircularProgress color="inherit" size={20} sx={styles.spinnerStyles} />}
          </Typography>
          <Box sx={styles.avatarStyles}>
            <AvatarMenu />
          </Box>
        </Toolbar>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</Box>
      </Box>)
      : (<h1>Permission Denied</h1>)
  );
};

export default PageContainer;
