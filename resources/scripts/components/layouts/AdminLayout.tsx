import { AppDispatch } from '@store/index';
import { Outlet } from 'react-router-dom';
import { adminRoutes } from '../../configs/routes';
import { selectOpenSidebar, setOpenSidebar } from '@store/slices/metaSlice';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import SideNav from '@components/SideNav';
import SideNavItem from '@components/SideNav/components/SideNavItem';
import Typography from '@mui/material/Typography';

const ContainerProps = {
  container: true,
  spacing: 0,
  sx: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  }
};

const ContentProps = {
  item: true,
  sx: {
    flexGrow: 1,
    overflow: 'auto'
  }
};

const AdminLayout = () => {
  const openSidebar = selectOpenSidebar();
  const dispatch: AppDispatch = useDispatch();

  const renderSideLinks = Object.keys(adminRoutes).map((key: string) => {
    const route = adminRoutes[key];
    return (
      <SideNavItem
        key={key}
        label={key}
        to={route.path}
        icon={route.icon}
      />
    );
  });

  const handleIconClick = () => dispatch(setOpenSidebar({ openSidebar: !openSidebar }));

  return (
    <Grid {...ContainerProps}>
      <Grid item xs="auto" zeroMinWidth>
        <SideNav open={openSidebar}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '12px', marginBottom: '12px' }}>
            { openSidebar && (
              <Typography
                variant="h5"
                component="h5"
                sx={{ flexGrow: 1, mx: 2, fontWeight: 'bold' }}
              >Sidehand</Typography>
            )}
            <IconButton onClick={handleIconClick} sx={{ mx: 1 }}>
              {openSidebar ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <List>{renderSideLinks}</List>
        </SideNav>
      </Grid>
      <Grid {...ContentProps}><Outlet /></Grid>
    </Grid>
  );
};

export default AdminLayout;
