import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders loading text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
  });

  it('renders spinner element', () => {
    render(<LoadingSpinner />);
    const spinner = document.querySelector('[class*="spinner"]');
    expect(spinner).toBeInTheDocument();
  });

  it('has correct structure', () => {
    render(<LoadingSpinner />);
    const container = document.querySelector('[class*="loadingContainer"]');
    expect(container).toBeInTheDocument();
  });
});
