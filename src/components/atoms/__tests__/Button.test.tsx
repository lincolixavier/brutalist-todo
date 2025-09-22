import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Button from '../Button';

describe('Button Component', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies correct variant class', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button');
    expect(button.className).toContain('primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button').className).toContain('secondary');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button').className).toContain('danger');

    rerender(<Button variant="success">Success</Button>);
    expect(screen.getByRole('button').className).toContain('success');
  });

  it('applies correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('defaults to primary variant and button type', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button');
    expect(button.className).toContain('primary');
    expect(button).toHaveAttribute('type', 'button');
  });
});
