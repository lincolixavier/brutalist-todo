'use client';

import { motion } from 'framer-motion';
import React from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  type?: 'button' | 'submit';
  className?: string;
}

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
}: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return (
    <motion.button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ 
        scale: disabled ? 1 : 0.95,
        transition: { duration: 0.1 },
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
