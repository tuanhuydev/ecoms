import { AppDispatch } from '@store/index';
import { selectOpenSidebar, setOpenSidebar } from '@store/slices/metaSlice';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import styles from './styles.module.scss';

export interface NavbarProps extends MuiAppBarProps {
  open?: boolean;
};

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
      transition: transitions.create(['width', 'margin'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen
      })
    })
  };
});

const Navbar = (props: NavbarProps) => {
  const openSidebar = selectOpenSidebar();
  const dispatch: AppDispatch = useDispatch();

  const handleIconClick = () => {
    dispatch(setOpenSidebar({ openSidebar: !openSidebar }));
  };

  return (
    <AppBar position="static" open={openSidebar} sx={{ mb: 2 }}>
      <Toolbar classes={{ root: styles.toolbar }}>
        <IconButton onClick={handleIconClick}>
          {openSidebar ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        {props?.children}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
