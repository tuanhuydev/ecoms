import { PageContainerProps } from './interfaces';
import { ROUTE_PATHS } from '@configs/constants';
import { matchPath, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '@store/slices/userSlice';
import AvatarMenu from '../AvatarMenu';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import getStyles from './styles';

const PageContainer = ({ title = '', loading = false, routes, children, ToolbarProps }: PageContainerProps) => {
  const { pathname } = useLocation();
  const styles = getStyles();
  const { permission: userPermission } = selectCurrentUser();

  /**
   * Check current path match defined path
   * Check current path match defined route with path
   * Must allow wildcard pass the validation
   * Check user able to access current path by their permission
   */
  const isRouteAvailable = Object.values(ROUTE_PATHS).some((path) => {
    /**
     * case sensitive to escapse full match
     * end to avoid path's end checking
     */
    if (matchPath({ path: path, caseSensitive: true, end: false }, pathname)) {
      return !!Object.values(routes).find(
        (adminRoute: any) => adminRoute.path === path && adminRoute.permissions.includes(userPermission.toUpperCase())
      );
    }
    return false;
  });

  return isRouteAvailable
    ? (
      <Box sx={styles.pageWrapper}>
        <Toolbar {...ToolbarProps} disableGutters sx={styles.toolbarStyles}>
          <Typography variant="h6" component="h6" sx={styles.titleStyles}>
            {title}
            {loading && <CircularProgress color="inherit" size={20} sx={styles.spinnerStyles} />}
          </Typography>
          <Box sx={styles.avatarStyles}>
            <AvatarMenu />
          </Box>
        </Toolbar>

        <Box sx={styles.contentStyles}>{children}</Box>
      </Box>
    )
    : (
      <h1>Permission Denied</h1>
    );
};

export default PageContainer;
