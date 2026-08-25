'use client';

import React, { ReactNode } from 'react';
import { NotificationProvider } from './NotificationContext';
import { ThemeProvider } from './ThemeContext';
import { ToastProvider } from './ToastContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default Providers;
