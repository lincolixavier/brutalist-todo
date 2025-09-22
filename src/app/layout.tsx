import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Brutalist Task Manager - Minimalist Todo List',
    template: '%s | Brutalist Task Manager',
  },
  description:
    'A minimalist, brutalist todo list application built with Next.js. Organize your tasks with a clean, distraction-free interface.',
  keywords: [
    'todo list',
    'task manager',
    'productivity',
    'minimalist',
    'brutalist design',
    'next.js',
  ],
  authors: [{ name: 'Lincoli Xavier' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
