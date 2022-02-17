import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export interface PageContainerProps {
  title: string;
  children?: ReactNode;
  ToolbarProps?: ToolbarProps;
}

const PageContainer = ({ children, title = '', ToolbarProps }: PageContainerProps) => {
  return (
    <Box>
      <Toolbar {...ToolbarProps} sx={{ background: 'white', mb: 1 }}>
        <Typography variant="h6" component="h6"
          sx={{ fontWeight: 'bold', fontFamily: "'Open Sans',sans-serif" }} >{title}</Typography>
      </Toolbar>
      <Box sx={{ px: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default PageContainer;
