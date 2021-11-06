import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';

export interface NavbarProps {
  AppBarProps?: AppBarProps;
  ToolbarProps?: ToolbarProps;
  children?: ReactNode;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => {
  const { zIndex, shadows, palette, transitions } = theme;
  return {
    zIndex: zIndex.drawer + 1,
    backgroundColor: palette.background.paper,
    boxShadow: shadows[0], // none
    transition: transitions.create(['width', 'margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: transitions.create(['width', 'margin'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen
      })
    })
  };
});

const Navbar = (props: AppBarProps) => {
  return (
    <AppBar open={props.open}>
      <Toolbar>{props?.children}</Toolbar>
    </AppBar>
  );
};

export default Navbar;
