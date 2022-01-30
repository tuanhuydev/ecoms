import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { LinkProps, NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import styles from './styles.module.scss';

export interface SideNavItemProps {
  icon?: ReactNode;
  label?: string;
  open?: string;
  to?: string;
}

function CustomNavLink({ children, to, className = '', ...props }: LinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });
  const navLinkClasses = clsx(className, { [styles['navlink--active']]: match });

  return (
    <div>
      <NavLink
        {...props}
        className={navLinkClasses}
        to={to}
      >
        {children}
      </NavLink>
    </div>
  );
}

const SideNavItem = (props: SideNavItemProps) => {
  const { icon, label = 'label', to = '/' } = props;
  // handle match link

  return (<CustomNavLink to={to} className={styles.navlink}>
    <ListItem button key={label}>
      {icon && <ListItemIcon sx={{ minWidth: 42 }}>{icon}</ListItemIcon>}
      <ListItemText primary={label} sx={{ textTransform: 'capitalize' }} />
    </ListItem>
  </CustomNavLink>);
};

export default SideNavItem;
