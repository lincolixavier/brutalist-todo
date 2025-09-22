import { Task } from '@/models/task';

export const createTask = (name: string): Task => ({
  id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name: name.trim(),
  completed: false,
  createdAt: new Date(),
});

export const toggleTask = (task: Task): Task => ({
  ...task,
  completed: !task.completed,
});

export const updateTaskName = (task: Task, name: string): Task => ({
  ...task,
  name: name.trim(),
});

export const getTaskStats = (tasks: Task[]) => ({
  total: tasks.length,
  completed: tasks.filter(task => task.completed).length,
  pending: tasks.filter(task => !task.completed).length,
});
