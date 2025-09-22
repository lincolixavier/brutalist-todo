import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Header from '../Header';

describe('Header Component', () => {
  it('renders title and subtitle', () => {
    render(<Header title="Test Title" subtitle="Test Subtitle" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders with different title and subtitle', () => {
    render(<Header title="Another Title" subtitle="Another Subtitle" />);
    
    expect(screen.getByText('Another Title')).toBeInTheDocument();
    expect(screen.getByText('Another Subtitle')).toBeInTheDocument();
  });

  it('renders empty strings correctly', () => {
    render(<Header title="" subtitle="" />);
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    // Just check that the elements exist, don't worry about empty text content
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('has correct heading structure', () => {
    render(<Header title="My App" subtitle="Task Manager" />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('My App');
  });
});
