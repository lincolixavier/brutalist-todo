'use client';

import { motion } from 'framer-motion';
import React, { ChangeEvent, KeyboardEvent } from 'react';

import styles from './Input.module.css';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
}

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyPress,
  autoFocus = false,
  disabled = false,
}: InputProps) => {
  return (
    <motion.div
      className={styles.inputContainer}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        autoFocus={autoFocus}
        disabled={disabled}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default Input;
