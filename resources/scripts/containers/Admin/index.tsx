import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import styles from './styles.module.scss';
import { adminRoutes } from '../../configs/routes';
import { NavLink, Switch } from 'react-router-dom';
import { makeRouteElements } from '@components/Router';
import { APP_URL } from '../../configs/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Navbar from '@components/Navbar';
import { Login } from '../../services/Auth';
import SideNav from '@components/SideNav';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flext-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const menuStyles = {
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0
  }
};

const makeLinks = () =>
  Object.keys(adminRoutes).map((route) => (
    <NavLink key={route} to={adminRoutes[route].path} activeClassName={styles.selected}>
      <ListItem button key={route} sx={{ background: 'transparent', borderBottom: 1, borderColor: 'grey.100' }}>
        <ListItemIcon>{adminRoutes[route]?.icon}</ListItemIcon>
        <ListItemText primary={route} sx={{ textTransform: 'capitalize' }} />
      </ListItem>
    </NavLink>
  ));

const Admin = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const openSidebar = useSelector((state: RootState) => state.meta.openSidebar);

  const handleClose = () => setAnchorEl(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleLogout = () => {
    Login.clearAuth();
    window.location.href = APP_URL;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar>
        <IconButton onClick={handleClick} size="small" sx={{ ml: 'auto' }}>
          <Avatar sx={{ width: 32, height: 32 }}>H</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: menuStyles
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Navbar>
      <SideNav open={openSidebar}>
        <DrawerHeader>
          <div className={styles.logo}>Sidehand</div>
        </DrawerHeader>
        <Divider />
        <List>{makeLinks()}</List>
      </SideNav>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Switch>{makeRouteElements()}</Switch>
      </Box>
    </Box>
  );
};

export default Admin;
