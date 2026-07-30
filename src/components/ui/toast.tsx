'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        style: {
          background: '#1a1a2e',
          color: '#ffffff',
          border: 'none',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontSize: '14px',
          borderRadius: '12px',
        },
      }}
    />
  );
}
