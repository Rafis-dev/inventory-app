'use client';

import { createAuthClient } from '@neondatabase/auth/next';
import { NeonAuthUIProvider } from '@neondatabase/auth-ui';

export const authClient = createAuthClient();

export function NeonAuthProviders({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      defaultTheme="light"
      social={{
        providers: ['google'],
      }}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
