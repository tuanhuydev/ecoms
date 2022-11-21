import { ReactNode } from 'react';
import { ToolbarProps } from '@mui/material';

export interface PageContainerProps {
  title: string;
  routes: any;
  loading?: boolean;
  children?: ReactNode;
  ToolbarProps?: ToolbarProps;
}
