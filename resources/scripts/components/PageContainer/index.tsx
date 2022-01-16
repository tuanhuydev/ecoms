import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import React, { ReactNode } from 'react';

export interface PageContainerProps {
  title: string;
  children?: ReactNode;
  ToolbarProps?: ToolbarProps;
}

const PageContainer = ({ children, title = '', ToolbarProps }: PageContainerProps) => {
  return (
    <Box>
      <Toolbar {...ToolbarProps} sx={{ background: 'white', mb: 1 }}>
        <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold' }} >{title}</Typography>
      </Toolbar>
      <Box sx={{ px: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default PageContainer;
