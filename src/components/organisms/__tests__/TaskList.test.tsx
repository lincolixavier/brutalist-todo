import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Task } from '@/models/task';

import TaskList from '../TaskList';

const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Task 1',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Task 2',
    completed: true,
    createdAt: new Date(),
  },
];

describe('TaskList Component', () => {
  const defaultProps = {
    tasks: mockTasks,
    editingTask: null,
    editingText: '',
    onToggleTask: vi.fn(),
    onDeleteTask: vi.fn(),
    onStartEdit: vi.fn(),
    onEditTextChange: vi.fn(),
    onSaveEdit: vi.fn(),
    onCancelEdit: vi.fn(),
    onClearCompleted: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all tasks', () => {
    render(<TaskList {...defaultProps} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('renders empty state when no tasks', () => {
    render(<TaskList {...defaultProps} tasks={[]} />);

    expect(screen.getByText('NO TASKS')).toBeInTheDocument();
    expect(screen.getByText('CREATE YOUR FIRST TASK')).toBeInTheDocument();
  });

  it('shows clear completed button when there are completed tasks', () => {
    render(<TaskList {...defaultProps} />);

    expect(screen.getByText('CLEAR DONE (1)')).toBeInTheDocument();
  });

  it('does not show clear completed button when no completed tasks', () => {
    const allPendingTasks = mockTasks.map(task => ({
      ...task,
      completed: false,
    }));
    render(<TaskList {...defaultProps} tasks={allPendingTasks} />);

    expect(screen.queryByText(/CLEAR DONE/)).not.toBeInTheDocument();
  });

  it('calls onToggleTask when task is toggled', () => {
    render(<TaskList {...defaultProps} />);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(defaultProps.onToggleTask).toHaveBeenCalledWith('1');
  });

  it('calls onDeleteTask when task is deleted', () => {
    render(<TaskList {...defaultProps} />);

    const deleteButtons = screen.getAllByText('DELETE');
    fireEvent.click(deleteButtons[0]);

    expect(defaultProps.onDeleteTask).toHaveBeenCalledWith('1');
  });

  it('calls onStartEdit when edit is clicked', () => {
    render(<TaskList {...defaultProps} />);

    const editButtons = screen.getAllByText('EDIT');
    fireEvent.click(editButtons[0]);

    expect(defaultProps.onStartEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it('calls onClearCompleted when clear button is clicked', () => {
    render(<TaskList {...defaultProps} />);

    fireEvent.click(screen.getByText('CLEAR DONE (1)'));

    expect(defaultProps.onClearCompleted).toHaveBeenCalled();
  });

  it('shows correct completed count in clear button', () => {
    const tasksWithMoreCompleted = [
      ...mockTasks,
      { id: '3', name: 'Task 3', completed: true, createdAt: new Date() },
    ];
    render(<TaskList {...defaultProps} tasks={tasksWithMoreCompleted} />);

    expect(screen.getByText('CLEAR DONE (2)')).toBeInTheDocument();
  });

  it('renders task in editing mode when editingTask matches task id', () => {
    render(
      <TaskList {...defaultProps} editingTask='1' editingText='Editing task' />,
    );

    expect(screen.getByDisplayValue('Editing task')).toBeInTheDocument();
    expect(screen.getByText('SAVE')).toBeInTheDocument();
    expect(screen.getByText('CANCEL')).toBeInTheDocument();
  });

  it('calls onEditTextChange when editing text changes', () => {
    render(<TaskList {...defaultProps} editingTask='1' editingText='test' />);

    fireEvent.change(screen.getByDisplayValue('test'), {
      target: { value: 'new text' },
    });

    expect(defaultProps.onEditTextChange).toHaveBeenCalledWith('new text');
  });

  it('calls onSaveEdit when save is clicked', () => {
    render(<TaskList {...defaultProps} editingTask='1' editingText='test' />);

    fireEvent.click(screen.getByText('SAVE'));

    expect(defaultProps.onSaveEdit).toHaveBeenCalledWith('1');
  });

  it('calls onCancelEdit when cancel is clicked', () => {
    render(<TaskList {...defaultProps} editingTask='1' editingText='test' />);

    fireEvent.click(screen.getByText('CANCEL'));

    expect(defaultProps.onCancelEdit).toHaveBeenCalled();
  });
});
