'use client';

import { motion } from 'framer-motion';
import React from 'react';

import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <motion.div
      className={styles.loadingContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.p
        className={styles.loadingText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Loading tasks...
      </motion.p>
    </motion.div>
  );
};

export default LoadingSpinner;
