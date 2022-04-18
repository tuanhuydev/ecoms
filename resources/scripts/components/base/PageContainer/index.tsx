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
  return (
    <Box>
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
    </Box>
  );
};

export default PageContainer;
