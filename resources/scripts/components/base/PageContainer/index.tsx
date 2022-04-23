import { ROUTE_PATHS } from 'scripts/configs/constants';
import { adminRoutes } from 'scripts/configs/routes';
import { matchPath, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '@store/slices/userSlice';
import AvatarMenu from '../AvatarMenu';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import React, { ReactNode } from 'react';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
      ? (<Box>
        {loading && (<LinearProgress />)}
        <Toolbar
          {...ToolbarProps}
          disableGutters
          sx={{
            background: 'white',
            mb: 0.25,
            px: 1.5
          }}>
          <Typography variant="h6" component="h6"
            sx={{
              fontWeight: 'bold',
              fontFamily: "'Open Sans',sans-serif"
            }} >{title}</Typography>
          <Box sx={{ ml: 'auto' }}>
            <AvatarMenu />
          </Box>
        </Toolbar>
        {children}
      </Box>)
      : (<h1>Permission Denied</h1>)
  );
};

export default PageContainer;
