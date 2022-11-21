import { ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { navItemStyles } from './styles';
import React from 'react';

export interface NavItemProps {
  to: string;
  label: string;
  icon?: any;
}

const NavItem = ({ to = '', label = '', icon = null }: NavItemProps) => {
  return (
    <ListItem sx={navItemStyles()}>
      <NavLink to={to} className="flex items-center w-100 nav-link">
        {icon && (<div className='flex items-center mr-4'>{ icon }</div>)}
        <div className='line-height-1'>{label}</div>
      </NavLink>
    </ListItem>
  );
};

export default NavItem;
