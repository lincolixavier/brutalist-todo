'use client';

import React from 'react';

import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import Input from '@/components/atoms/Input';
import { Task } from '@/models/task';

import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  editingText: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onEditTextChange: (text: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
}

const TaskItem = ({
  task,
  isEditing,
  editingText,
  onToggle,
  onDelete,
  onStartEdit,
  onEditTextChange,
  onSaveEdit,
  onCancelEdit,
}: TaskItemProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSaveEdit(task.id);
    }
    if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  const handleEditTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEditTextChange(e.target.value);
  };

  return (
    <div
      className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
    >
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />

      {isEditing ? (
        <div className={styles.editContainer}>
          <Input
            value={editingText}
            onChange={handleEditTextChange}
            onKeyPress={handleKeyPress}
            autoFocus
            className={styles.inputEdit}
          />
          <Button onClick={() => onSaveEdit(task.id)}>SAVE</Button>
          <Button variant='danger' onClick={onCancelEdit}>CANCEL</Button>
        </div>
      ) : (
        <div className={styles.displayContainer}>
          <span 
            className={styles.taskName}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.6 : 1,
            }}
          >
            {task.name}
          </span>
          <div className={styles.actions}>
            <Button onClick={() => onStartEdit(task)}>EDIT</Button>
            <Button variant='danger' onClick={() => onDelete(task.id)}>
              DELETE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
