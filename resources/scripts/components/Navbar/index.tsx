import React from 'react';
import styles from './styles.module.scss';
import MenuIcon from '@assets/icons/list.svg'; // TODO: Built URL not beautiful
import BootstrapIcon from '@components/BootstrapIcon';

export interface NavbarClassesType {
  root: string;
  logo?: string;
}
export interface NavbarProps {
  logo?: any;
  classes?: NavbarClassesType;
}

const Navbar = (props: NavbarProps) => {
  const { logo = 'Let build something amazing here' } = props;
  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <BootstrapIcon icon={MenuIcon} name="menu" />
      </div>

      <span className={styles.logo}>{logo}</span>
    </div>
  );
};

export default Navbar;
