import { describe, it, expect } from 'vitest';

import {
  createTask,
  toggleTask,
  updateTaskName,
  getTaskStats,
} from '../taskUtils';

describe('Task Utils - Core Business Logic', () => {
  describe('createTask', () => {
    it('should create a valid task with unique ID', () => {
      const taskName = 'Buy groceries';

      const task = createTask(taskName);

      expect(task.name).toBe(taskName);
      expect(task.completed).toBe(false);
      expect(task.id).toBeTruthy();
      expect(typeof task.id).toBe('string');
      expect(task.createdAt).toBeInstanceOf(Date);
    });

    it('should generate different IDs for multiple tasks', () => {
      const task1 = createTask('Task 1');
      const task2 = createTask('Task 2');

      expect(task1.id).not.toBe(task2.id);
    });
  });

  describe('toggleTask', () => {
    it('should mark incomplete task as complete', () => {
      const incompleteTask = {
        id: '1',
        name: 'Learn React',
        completed: false,
        createdAt: new Date(),
      };

      const result = toggleTask(incompleteTask);

      expect(result.completed).toBe(true);
      expect(result.id).toBe(incompleteTask.id);
      expect(result.name).toBe(incompleteTask.name);
    });

    it('should mark complete task as incomplete', () => {
      const completeTask = {
        id: '1',
        name: 'Learn React',
        completed: true,
        createdAt: new Date(),
      };

      const result = toggleTask(completeTask);

      expect(result.completed).toBe(false);
    });
  });

  describe('updateTaskName', () => {
    it('should update task name while preserving other properties', () => {
      const originalTask = {
        id: '1',
        name: 'Old name',
        completed: true,
        createdAt: new Date('2023-01-01'),
      };

      const result = updateTaskName(originalTask, 'New name');

      expect(result.name).toBe('New name');
      expect(result.id).toBe(originalTask.id);
      expect(result.completed).toBe(originalTask.completed);
      expect(result.createdAt).toBe(originalTask.createdAt);
    });
  });

  describe('getTaskStats', () => {
    it('should return zero stats for empty list', () => {
      const emptyTasks: any[] = [];

      const stats = getTaskStats(emptyTasks);

      expect(stats).toEqual({
        total: 0,
        completed: 0,
        pending: 0,
      });
    });

    it('should calculate correct stats for mixed tasks', () => {
      const tasks = [
        { id: '1', name: 'Done task', completed: true, createdAt: new Date() },
        {
          id: '2',
          name: 'Pending task',
          completed: false,
          createdAt: new Date(),
        },
        {
          id: '3',
          name: 'Another done',
          completed: true,
          createdAt: new Date(),
        },
      ];

      const stats = getTaskStats(tasks);

      expect(stats.total).toBe(3);
      expect(stats.completed).toBe(2);
      expect(stats.pending).toBe(1);
    });

    it('should handle all completed tasks', () => {
      const allCompletedTasks = [
        { id: '1', name: 'Task 1', completed: true, createdAt: new Date() },
        { id: '2', name: 'Task 2', completed: true, createdAt: new Date() },
      ];

      const stats = getTaskStats(allCompletedTasks);

      expect(stats.total).toBe(2);
      expect(stats.completed).toBe(2);
      expect(stats.pending).toBe(0);
    });

    it('should handle all pending tasks', () => {
      const allPendingTasks = [
        { id: '1', name: 'Task 1', completed: false, createdAt: new Date() },
        { id: '2', name: 'Task 2', completed: false, createdAt: new Date() },
      ];

      const stats = getTaskStats(allPendingTasks);

      expect(stats.total).toBe(2);
      expect(stats.completed).toBe(0);
      expect(stats.pending).toBe(2);
    });
  });
});
