'use client';

import { motion } from 'framer-motion';
import React from 'react';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

import styles from './TaskForm.module.css';

interface TaskFormProps {
  newTask: string;
  onTaskChange: (task: string) => void;
  onAddTask: (task: string) => void;
}

const TaskForm = ({
  newTask,
  onTaskChange,
  onAddTask,
}: TaskFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTaskChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddTask(newTask);
    }
  };

  const handleSubmit = () => {
    onAddTask(newTask);
  };

  const isDisabled = !newTask.trim();

  return (
    <motion.div 
      className={styles.taskForm}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Input
        placeholder='ENTER TASK NAME...'
        value={newTask}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button variant='primary' onClick={handleSubmit} disabled={isDisabled}>
        ADD TASK
      </Button>
    </motion.div>
  );
};

export default TaskForm;
