import { describe, it, expect } from 'vitest'
import { createTask, toggleTask, updateTaskName, getTaskStats } from '../taskUtils'

describe('Task Utils - Core Business Logic', () => {
  describe('createTask', () => {
    it('should create a valid task with unique ID', () => {
      // Arrange
      const taskName = 'Buy groceries'
      
      // Act
      const task = createTask(taskName)
      
      // Assert
      expect(task.name).toBe(taskName)
      expect(task.completed).toBe(false)
      expect(task.id).toBeTruthy()
      expect(typeof task.id).toBe('string')
      expect(task.createdAt).toBeInstanceOf(Date)
    })

    it('should generate different IDs for multiple tasks', () => {
      // Arrange & Act
      const task1 = createTask('Task 1')
      const task2 = createTask('Task 2')
      
      // Assert
      expect(task1.id).not.toBe(task2.id)
    })
  })

  describe('toggleTask', () => {
    it('should mark incomplete task as complete', () => {
      // Arrange
      const incompleteTask = {
        id: '1',
        name: 'Learn React',
        completed: false,
        createdAt: new Date()
      }
      
      // Act
      const result = toggleTask(incompleteTask)
      
      // Assert
      expect(result.completed).toBe(true)
      expect(result.id).toBe(incompleteTask.id)
      expect(result.name).toBe(incompleteTask.name)
    })

    it('should mark complete task as incomplete', () => {
      // Arrange
      const completeTask = {
        id: '1',
        name: 'Learn React',
        completed: true,
        createdAt: new Date()
      }
      
      // Act
      const result = toggleTask(completeTask)
      
      // Assert
      expect(result.completed).toBe(false)
    })
  })

  describe('updateTaskName', () => {
    it('should update task name while preserving other properties', () => {
      // Arrange
      const originalTask = {
        id: '1',
        name: 'Old name',
        completed: true,
        createdAt: new Date('2023-01-01')
      }
      
      // Act
      const result = updateTaskName(originalTask, 'New name')
      
      // Assert
      expect(result.name).toBe('New name')
      expect(result.id).toBe(originalTask.id)
      expect(result.completed).toBe(originalTask.completed)
      expect(result.createdAt).toBe(originalTask.createdAt)
    })
  })

  describe('getTaskStats', () => {
    it('should return zero stats for empty list', () => {
      // Arrange
      const emptyTasks: any[] = []
      
      // Act
      const stats = getTaskStats(emptyTasks)
      
      // Assert
      expect(stats).toEqual({
        total: 0,
        completed: 0,
        pending: 0
      })
    })

    it('should calculate correct stats for mixed tasks', () => {
      // Arrange
      const tasks = [
        { id: '1', name: 'Done task', completed: true, createdAt: new Date() },
        { id: '2', name: 'Pending task', completed: false, createdAt: new Date() },
        { id: '3', name: 'Another done', completed: true, createdAt: new Date() }
      ]
      
      // Act
      const stats = getTaskStats(tasks)
      
      // Assert
      expect(stats.total).toBe(3)
      expect(stats.completed).toBe(2)
      expect(stats.pending).toBe(1)
    })

    it('should handle all completed tasks', () => {
      // Arrange
      const allCompletedTasks = [
        { id: '1', name: 'Task 1', completed: true, createdAt: new Date() },
        { id: '2', name: 'Task 2', completed: true, createdAt: new Date() }
      ]
      
      // Act
      const stats = getTaskStats(allCompletedTasks)
      
      // Assert
      expect(stats.total).toBe(2)
      expect(stats.completed).toBe(2)
      expect(stats.pending).toBe(0)
    })

    it('should handle all pending tasks', () => {
      // Arrange
      const allPendingTasks = [
        { id: '1', name: 'Task 1', completed: false, createdAt: new Date() },
        { id: '2', name: 'Task 2', completed: false, createdAt: new Date() }
      ]
      
      // Act
      const stats = getTaskStats(allPendingTasks)
      
      // Assert
      expect(stats.total).toBe(2)
      expect(stats.completed).toBe(0)
      expect(stats.pending).toBe(2)
    })
  })
})
