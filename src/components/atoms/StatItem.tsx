import React from 'react';

import styles from './StatItem.module.css';

interface StatItemProps {
  value: number;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => {
  return (
    <span className={styles.statItem}>
      {value} {label}
    </span>
  );
};

export default StatItem;
