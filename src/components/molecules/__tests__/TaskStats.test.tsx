import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import TaskStats from '../TaskStats';

describe('TaskStats Component', () => {
  it('renders all stat items with correct values', () => {
    render(<TaskStats total={10} completed={7} pending={3} />);

    expect(screen.getByText('10 TOTAL')).toBeInTheDocument();
    expect(screen.getByText('7 DONE')).toBeInTheDocument();
    expect(screen.getByText('3 PENDING')).toBeInTheDocument();
  });

  it('renders zero values correctly', () => {
    render(<TaskStats total={0} completed={0} pending={0} />);

    expect(screen.getByText('0 TOTAL')).toBeInTheDocument();
    expect(screen.getByText('0 DONE')).toBeInTheDocument();
    expect(screen.getByText('0 PENDING')).toBeInTheDocument();
  });

  it('renders large numbers correctly', () => {
    render(<TaskStats total={1000} completed={750} pending={250} />);

    expect(screen.getByText('1000 TOTAL')).toBeInTheDocument();
    expect(screen.getByText('750 DONE')).toBeInTheDocument();
    expect(screen.getByText('250 PENDING')).toBeInTheDocument();
  });

  it('handles all completed tasks', () => {
    render(<TaskStats total={5} completed={5} pending={0} />);

    expect(screen.getByText('5 TOTAL')).toBeInTheDocument();
    expect(screen.getByText('5 DONE')).toBeInTheDocument();
    expect(screen.getByText('0 PENDING')).toBeInTheDocument();
  });

  it('handles all pending tasks', () => {
    render(<TaskStats total={3} completed={0} pending={3} />);

    expect(screen.getByText('3 TOTAL')).toBeInTheDocument();
    expect(screen.getByText('0 DONE')).toBeInTheDocument();
    expect(screen.getByText('3 PENDING')).toBeInTheDocument();
  });
});
