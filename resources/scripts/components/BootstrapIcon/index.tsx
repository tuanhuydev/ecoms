import React from 'react';
import styles from './styles.module.scss';
export interface BootstrapIconProps {
  icon: string;
  name: string;
}

const BootstrapIcon = (props: BootstrapIconProps) => {
  const { icon = '', name = 'icon' } = props;
  return (
    <div className={styles.container}>
      <img src={icon} alt={name} className={styles.img} />
    </div>
  );
};

export default BootstrapIcon;
