import { AppDispatch, User } from 'scripts/utils/interfaces';
import { Outlet } from 'react-router-dom';
import { containerStyles, contentStyles, titleContainerStyles, titleStyles } from './styles';
import { selectCurrentUser } from 'scripts/store/slices/userSlice';
import { selectOpenSidebar, setOpenSidebar } from 'scripts/store/slices/metaSlice';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import NavItem from 'scripts/components/SideNav/NavItem';
import React from 'react';
import SideNav from 'scripts/components/SideNav';
import Typography from '@mui/material/Typography';

const AdminLayout = ({ routes }: any) => {
  const openSidebar = selectOpenSidebar();
  const dispatch: AppDispatch = useDispatch();
  const currentUser: User = selectCurrentUser();
  const userPerrmission = currentUser.permission.toUpperCase();

  // Filter sidebar links base on user's permissions
  const renderSideLinks = Object.keys(routes)
    .filter((key: string) => routes[key].permissions.includes(userPerrmission))
    .map((key: string) => {
      const route = routes[key];
      return (
        <NavItem key={key} to={route.path} label={key} icon={route?.icon} />
      );
    });
  const toggleSideNav = () => dispatch(setOpenSidebar({ openSidebar: !openSidebar }));

  return (
    <Grid container spacing={0} sx={containerStyles} wrap="nowrap">
      <SideNav open={openSidebar}>
        <Box sx={titleContainerStyles()}>
          {openSidebar && (
            <Typography variant="h5" component="h5" sx={titleStyles}>
              Sidehand
            </Typography>
          )}
          <IconButton onClick={toggleSideNav} sx={{ mx: 0.5 }} aria-label="Toggle SideNav">
            {openSidebar ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <List>{renderSideLinks}</List>
      </SideNav>
      <Grid item sx={contentStyles}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
