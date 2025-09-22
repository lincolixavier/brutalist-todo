import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import StatItem from '../StatItem';

describe('StatItem Component', () => {
  it('renders value and label', () => {
    render(<StatItem value={5} label='tasks' />);
    expect(screen.getByText('5 tasks')).toBeInTheDocument();
  });

  it('renders zero value correctly', () => {
    render(<StatItem value={0} label='completed' />);
    expect(screen.getByText('0 completed')).toBeInTheDocument();
  });

  it('renders large numbers correctly', () => {
    render(<StatItem value={1000} label='items' />);
    expect(screen.getByText('1000 items')).toBeInTheDocument();
  });

  it('renders with different labels', () => {
    const { rerender } = render(<StatItem value={3} label='pending' />);
    expect(screen.getByText('3 pending')).toBeInTheDocument();

    rerender(<StatItem value={7} label='total' />);
    expect(screen.getByText('7 total')).toBeInTheDocument();
  });
});
