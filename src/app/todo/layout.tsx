import { ReactNode } from 'react';

import Header from '@/components/molecules/Header';

export default function TodoLayout({ children }: { children: ReactNode }) {
  return(
    <>
      <Header title="TASK" subtitle="Just do it" />
      {children}
    </>
  );
}