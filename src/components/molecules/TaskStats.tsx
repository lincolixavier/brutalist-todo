'use client';

import { motion } from 'framer-motion';
import React from 'react';

import StatItem from '@/components/atoms/StatItem';

import styles from './TaskStats.module.css';

interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
}

const TaskStats = ({ total, completed, pending }: TaskStatsProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className={styles.taskStats}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <StatItem value={total} label="TOTAL" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <StatItem value={completed} label="DONE" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <StatItem value={pending} label="PENDING" />
      </motion.div>
    </motion.div>
  );
};

export default TaskStats;
