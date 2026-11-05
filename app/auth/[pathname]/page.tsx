import { getCurrentUser } from '@/lib/auth';
import { AuthView } from '@neondatabase/auth/react/ui';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export default async function AuthPage({
  params,
}: {
  params: Promise<{ pathname: string }>;
}) {
  const { pathname } = await params;

  const user = await getCurrentUser();

  // Перенаправляем авторизованного пользователя
  // только со страниц входа и регистрации.
  if (user && ['sign-in', 'sign-up'].includes(pathname)) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-md w-full space-y-8">
        <AuthView path={pathname} redirectTo="/dashboard" />
      </div>
    </div>
  );
}
