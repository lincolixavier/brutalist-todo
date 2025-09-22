'use client';

import { motion } from 'framer-motion';
import React from 'react';

import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <motion.header 
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {title}
      </motion.h1>
      <motion.p 
        className={styles.subtitle}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      >
        {subtitle}
      </motion.p>
    </motion.header>
  );
};

export default Header;
