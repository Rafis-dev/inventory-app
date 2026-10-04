import { AuthView } from '@neondatabase/auth/react';
import Link from 'next/link';

export default async function AuthPage({
  params,
}: {
  params: Promise<{ pathname: string }>;
}) {
  const { pathname } = await params;
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-md w-full space-y-8">
        <AuthView pathname={pathname} />
        <Link href="/">Go back home</Link>
      </div>
    </div>
  );
}
