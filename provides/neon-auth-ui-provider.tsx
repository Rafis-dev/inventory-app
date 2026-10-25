'use client';

import { createAuthClient } from '@neondatabase/auth/next';
import { NeonAuthUIProvider } from '@neondatabase/auth-ui';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const authClient = createAuthClient();

export function NeonAuthProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      defaultTheme="light"
      redirectTo="/dashboard"
      social={{
        providers: ['google'],
      }}

      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        router.refresh();
      }}

      Link={Link}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
