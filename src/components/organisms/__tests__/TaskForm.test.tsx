import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import TaskForm from '../TaskForm';

describe('TaskForm Component', () => {
  const defaultProps = {
    newTask: '',
    onTaskChange: vi.fn(),
    onAddTask: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button', () => {
    render(<TaskForm {...defaultProps} />);

    expect(
      screen.getByPlaceholderText('ENTER TASK NAME...')
    ).toBeInTheDocument();
    expect(screen.getByText('ADD TASK')).toBeInTheDocument();
  });

  it('calls onTaskChange when input value changes', () => {
    render(<TaskForm {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText('ENTER TASK NAME...'), {
      target: { value: 'New task' },
    });

    expect(defaultProps.onTaskChange).toHaveBeenCalledWith('New task');
  });

  it('calls onAddTask when add button is clicked', () => {
    render(<TaskForm {...defaultProps} newTask='Test task' />);

    fireEvent.click(screen.getByText('ADD TASK'));

    expect(defaultProps.onAddTask).toHaveBeenCalledWith('Test task');
  });

  it('disables button when task is empty', () => {
    render(<TaskForm {...defaultProps} newTask='' />);

    expect(screen.getByText('ADD TASK')).toBeDisabled();
  });

  it('enables button when task has content', () => {
    render(<TaskForm {...defaultProps} newTask='Valid task' />);
    expect(screen.getByText('ADD TASK')).not.toBeDisabled();
  });

  it('shows current task value in input', () => {
    render(<TaskForm {...defaultProps} newTask='Current task' />);

    expect(screen.getByDisplayValue('Current task')).toBeInTheDocument();
  });

  it('does not call onAddTask when Enter is pressed with empty task', () => {
    render(<TaskForm {...defaultProps} newTask='' />);

    fireEvent.keyPress(screen.getByPlaceholderText('ENTER TASK NAME...'), {
      key: 'Enter',
    });

    expect(defaultProps.onAddTask).not.toHaveBeenCalled();
  });
});
