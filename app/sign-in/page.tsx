import { AuthView } from '@neondatabase/auth-ui';

export default function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <AuthView pathname="sign-in" />
      </div>
    </div>
  );
}
