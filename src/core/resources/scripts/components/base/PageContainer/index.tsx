import { ROUTE_PATHS } from 'scripts/configs/constants';
import { adminRoutes } from 'scripts/configs/routes';
import { matchPath, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '@store/slices/userSlice';
import AvatarMenu from '../AvatarMenu';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { ReactNode } from 'react';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import getStyles from './style';

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
  const { toolbarStyles, typoStyles, wrapperStyles } = getStyles();
  const { pathname } = useLocation();
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

  return (
    isRouteAvailable
      ? (<Box sx={wrapperStyles}>
        <Toolbar
          {...ToolbarProps}
          disableGutters
          sx={toolbarStyles}>
          <Typography variant="h6" component="h6" sx={typoStyles}>{title}</Typography>
          {loading && (<CircularProgress color="inherit" size={18} />)}
          <Box sx={{ ml: 'auto' }}>
            <AvatarMenu />
          </Box>
        </Toolbar>
        <div className="flex-1">{children}</div>
      </Box>)
      : (<h1>Permission Denied</h1>)
  );
};

export default PageContainer;
