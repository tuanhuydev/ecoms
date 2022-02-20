import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
      <Toolbar
        {...ToolbarProps}
        disableGutters
        sx={{
          background: 'white',
          mb: 0.5,
          px: 1.5
        }}>
        <Typography variant="h6" component="h6"
          sx={{
            fontWeight: 'bold',
            fontFamily: "'Open Sans',sans-serif"
          }} >{title}</Typography>
      </Toolbar>
      <Box>
        <Card sx={{ px: 1, mx: 0.5 }}> {children}</Card>
      </Box>
    </Box>
  );
};

export default PageContainer;
