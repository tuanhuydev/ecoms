import { Box, SxProps, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

const DRAWER_WIDTH = 240;

const drawerStyles = (open: boolean = false): SxProps => {
  const { transitions, spacing, palette } = useTheme();
  const transitionWidth = transitions.create('width', {
    easing: transitions.easing.sharp,
    duration: transitions.duration.leavingScreen
  });
  const widthCondition = open ? DRAWER_WIDTH : `calc(${spacing(3.5)} + 1px)`;
  return {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: palette.background.default,
    width: widthCondition,
    transition: transitionWidth,
    overflow: 'hidden',
    borderRight: `1px solid ${grey[200]}`,
    '& .MuiDrawer-paper': {
      overflowX: 'hidden',
      transition: transitionWidth,
      width: widthCondition
    }
  };
};

type Props = {
  open: boolean,
  children?: JSX.Element |JSX.Element[]
}

const SideNav = ({ open, children }: Props) => {
  return (
    <Box sx={drawerStyles(open)}>
      <div className="content">{children}</div>
    </Box>
  );
};

export default SideNav;
