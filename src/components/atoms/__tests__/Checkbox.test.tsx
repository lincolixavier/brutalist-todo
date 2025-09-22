import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Checkbox from '../Checkbox';

describe('Checkbox Component', () => {
  it('renders with correct checked state', () => {
    render(<Checkbox checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders unchecked when checked is false', () => {
    render(<Checkbox checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies correct id when provided', () => {
    render(<Checkbox checked={false} onChange={vi.fn()} id="test-checkbox" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'test-checkbox');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox checked={false} onChange={vi.fn()} disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('is not disabled by default', () => {
    render(<Checkbox checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeDisabled();
  });

  it('has correct type attribute', () => {
    render(<Checkbox checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox');
  });
});
