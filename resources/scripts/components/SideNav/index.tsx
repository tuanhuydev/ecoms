import { SxProps, useTheme } from '@mui/material';
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import React from 'react';

const DRAWER_WIDTH = 240;

const drawerStyles = (open: boolean = false): SxProps => {
  const { transitions, spacing } = useTheme();
  const transitionWidth = transitions.create('width', {
    easing: transitions.easing.sharp,
    duration: transitions.duration.leavingScreen
  });
  const widthCondition = open ? DRAWER_WIDTH : `calc(${spacing(3.5)} + 1px)`;
  return {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    width: widthCondition,
    transition: transitionWidth,
    '& .MuiDrawer-paper': {
      overflowX: 'hidden',
      transition: transitionWidth,
      width: widthCondition
    }
  };
};

const SideNav = (props: MuiDrawerProps) => {
  const { open = true, children = <></> } = props;
  return (
    <MuiDrawer sx={drawerStyles(open)} variant="permanent" open={open}>
      <div className="content">{children}</div>
    </MuiDrawer>
  );
};

export default SideNav;
