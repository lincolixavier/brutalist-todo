# Brutalist Task Manager

A minimalist todo app built with NextJs and Atomic Design principles.
Brutalist style inspired by [Brutalist Websites](https://brutalistwebsites.com/).

## Requirements

- Node.js 18+
- npm, yarn, pnpm or bun (I recommend Bun)

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint errors automatically
bun run format       # Format code with Prettier
bun run format:check # Check code formatting
bun run test         # Run unit tests
```

## Features

- Add tasks
- List with checkbox
- Mark as completed
- Remove completed tasks
- Edit task names
- Persistence in Local Storage

## Atomic Design Decisions

### Atoms

- **Button** - Reusable button with variants
- **Input** - Form input with focus states and validation
- **Checkbox** - Custom checkbox for task completion
- **StatItem** - Stat label content

### Molecules

- **Header** - Title and subtitle combination
- **TaskItem** - Individual task display with edit/delete actions
- **TaskStats** - Stats gather together

### Organisms

- **TaskForm** - Complete form for adding new tasks
- **TaskList** - Task collection with empty states and clear actions

### Templates

- Native Layout.tsx of Next, its has pretty much same use as template of atomic design.

## Key Decisions

**CSS Modules**: Each component has its own stylesheet for better encapsulation and maintainability.

**TypeScript**: Simple task model with essential utilities only.

**Custom Hook**: `useLocalStorage` hook for automatic persistence without complex state management.

**Brutalist Design**: Raw, unpolished aesthetic with thick borders, bold typography, and high contrast colors.

**Framer Motion**: Enhance the UX/UI experience with smoothless animations
