'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import TaskStats from '@/components/molecules/TaskStats';
import TaskForm from '@/components/organisms/TaskForm';
import TaskList from '@/components/organisms/TaskList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Task } from '@/models/task';
import {
  createTask,
  toggleTask,
  updateTaskName,
  getTaskStats,
} from '@/utils/taskUtils';

import styles from './TodoApp.module.css';

const TodoPage = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('brutalist-tasks', []);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addTask = (name: string) => {
    if (!name.trim()) {
      return;
    }
    setTasks(currentTasks => [createTask(name), ...currentTasks]);
    setNewTask('');
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task => (task.id === id ? toggleTask(task) : task)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(currentTasks => currentTasks.filter(task => !task.completed));
  };

  const startEdit = (task: Task) => {
    setEditingTask(task.id);
    setEditingText(task.name);
  };

  const saveEdit = (id: string) => {
    if (!editingText.trim()) {
      return;
    }
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id ? updateTaskName(task, editingText) : task,
      ),
    );
    setEditingTask(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditingText('');
  };

  const stats = getTaskStats(tasks);

  if (isLoading) {
    return (
      <main className="app" role="main">
        <div className={styles.todoApp}>
          <LoadingSpinner />
        </div>
      </main>
    );
  }

  return (
    <motion.main 
      className="app" 
      role="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.todoApp}>

        <motion.section 
          aria-label="Add new task"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TaskForm
            newTask={newTask}
            onTaskChange={setNewTask}
            onAddTask={addTask}
          />
        </motion.section>

        <motion.section 
          aria-label="Task statistics"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TaskStats
            total={stats.total}
            completed={stats.completed}
            pending={stats.pending}
          />
        </motion.section>

        <motion.section 
          aria-label="Task list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TaskList
            tasks={tasks}
            editingTask={editingTask}
            editingText={editingText}
            onToggleTask={toggleTaskComplete}
            onDeleteTask={deleteTask}
            onStartEdit={startEdit}
            onEditTextChange={setEditingText}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onClearCompleted={clearCompleted}
          />
        </motion.section>
      </div>
    </motion.main>
  );
};

export default TodoPage;