import { ReactNode } from 'react';
import { ToolbarProps } from '@mui/material';

export interface PageContainerProps {
  title: string;
  loading?: boolean;
  children?: ReactNode;
  ToolbarProps?: ToolbarProps;
};
