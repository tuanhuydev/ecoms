import React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Box from '@mui/system/Box';
import styles from './styles.module.scss';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { setOpenSidebar } from '../../slices/metaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

export interface NavbarProps extends MuiAppBarProps {
  open?: boolean;
  onToggle?: any;
};

export const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<NavbarProps>(({ theme, open }) => {
  const { zIndex, palette, shadows, transitions } = theme;
  return {
    zIndex: zIndex.drawer + 1,
    background: palette.background.paper,
    boxShadow: shadows[0], // None
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

const boxStyles = {
  display: 'flex'
};

const toggleStyles = {
  marginRight: '32px'
};

const Navbar = (props: NavbarProps) => {
  const openSidebar = useSelector((state: RootState) => state.meta.openSidebar);
  const dispatch = useDispatch();

  const handleIconClick = () => {
    dispatch(setOpenSidebar({ openSidebar: !openSidebar }));
  };

  return (
    <Box sx={boxStyles}>
      <AppBar position="fixed" open={openSidebar}>
        <Toolbar classes={{ root: styles.toolbar }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleIconClick}
            edge="start"
            sx={toggleStyles}
          >
            {openSidebar ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          {props?.children}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
