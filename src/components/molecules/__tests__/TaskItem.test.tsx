import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Task } from '@/models/task';

import TaskItem from '../TaskItem';

const mockTask: Task = {
  id: '1',
  name: 'Test task',
  completed: false,
  createdAt: new Date(),
};

describe('TaskItem Component', () => {
  const defaultProps = {
    task: mockTask,
    isEditing: false,
    editingText: '',
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onStartEdit: vi.fn(),
    onEditTextChange: vi.fn(),
    onSaveEdit: vi.fn(),
    onCancelEdit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task name', () => {
    render(<TaskItem {...defaultProps} />);
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('renders checkbox with correct checked state', () => {
    render(<TaskItem {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem {...defaultProps} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(defaultProps.onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onStartEdit when edit button is clicked', () => {
    render(<TaskItem {...defaultProps} />);
    fireEvent.click(screen.getByText('EDIT'));
    expect(defaultProps.onStartEdit).toHaveBeenCalledWith(mockTask);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TaskItem {...defaultProps} />);
    fireEvent.click(screen.getByText('DELETE'));
    expect(defaultProps.onDelete).toHaveBeenCalledWith('1');
  });

  it('shows editing mode when isEditing is true', () => {
    render(
      <TaskItem {...defaultProps} isEditing={true} editingText='Editing text' />
    );
    expect(screen.getByDisplayValue('Editing text')).toBeInTheDocument();
    expect(screen.getByText('SAVE')).toBeInTheDocument();
    expect(screen.getByText('CANCEL')).toBeInTheDocument();
  });

  it('calls onEditTextChange when editing input changes', () => {
    render(<TaskItem {...defaultProps} isEditing={true} editingText='' />);
    fireEvent.change(screen.getByDisplayValue(''), {
      target: { value: 'new text' },
    });
    expect(defaultProps.onEditTextChange).toHaveBeenCalledWith('new text');
  });

  it('calls onSaveEdit when save button is clicked', () => {
    render(<TaskItem {...defaultProps} isEditing={true} editingText='test' />);
    fireEvent.click(screen.getByText('SAVE'));
    expect(defaultProps.onSaveEdit).toHaveBeenCalledWith('1');
  });

  it('calls onCancelEdit when cancel button is clicked', () => {
    render(<TaskItem {...defaultProps} isEditing={true} editingText='test' />);
    fireEvent.click(screen.getByText('CANCEL'));
    expect(defaultProps.onCancelEdit).toHaveBeenCalled();
  });

  it('applies completed styling when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem {...defaultProps} task={completedTask} />);
    const taskName = screen.getByText('Test task');
    expect(taskName).toHaveStyle({
      textDecoration: 'line-through',
      opacity: '0.6',
    });
  });

  it('applies completed class when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem {...defaultProps} task={completedTask} />);
    // Look for the outermost div that should have the completed class
    const taskItem = screen
      .getByText('Test task')
      .closest('div')?.parentElement;
    expect(taskItem?.className).toContain('completed');
  });
});
