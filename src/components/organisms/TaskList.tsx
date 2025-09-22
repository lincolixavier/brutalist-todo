'use client';

import { motion } from 'framer-motion';
import React from 'react';

import Button from '@/components/atoms/Button';
import TaskItem from '@/components/molecules/TaskItem';
import { Task } from '@/models/task';

import styles from './TaskList.module.css';


interface TaskListProps {
  tasks: Task[];
  editingTask: string | null;
  editingText: string;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onEditTextChange: (text: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onClearCompleted: () => void;
}

const TaskList = ({
  tasks,
  editingTask,
  editingText,
  onToggleTask,
  onDeleteTask,
  onStartEdit,
  onEditTextChange,
  onSaveEdit,
  onCancelEdit,
  onClearCompleted,
}: TaskListProps) => {
  const completedCount = tasks.filter(task => task.completed).length;

  const renderEmptyState = () => (
    <motion.div 
      className={styles.emptyState}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3 
        className={styles.emptyTitle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        NO TASKS
      </motion.h3>
      <motion.p 
        className={styles.emptyDescription}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        CREATE YOUR FIRST TASK
      </motion.p>
    </motion.div>
  );

  const renderTaskItem = (task: Task) => (
    <TaskItem
      key={task.id}
      task={task}
      isEditing={editingTask === task.id}
      editingText={editingText}
      onToggle={onToggleTask}
      onDelete={onDeleteTask}
      onStartEdit={onStartEdit}
      onEditTextChange={onEditTextChange}
      onSaveEdit={onSaveEdit}
      onCancelEdit={onCancelEdit}
    />
  );

  const renderClearButton = () => {
    if (completedCount === 0) {
      return null;
    }

    return (
      <motion.div 
        className={styles.actions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button variant='secondary' onClick={onClearCompleted}>
          CLEAR DONE ({completedCount})
        </Button>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div 
        className={styles.taskList}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {tasks.length === 0 ? renderEmptyState() : tasks.map(renderTaskItem)}
      </motion.div>
      {renderClearButton()}
    </>
  );
};

export default TaskList;
