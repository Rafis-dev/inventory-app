import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@neondatabase/auth/react/ui';

export default function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>
        {/* Все страницы внутри группы (dashboard) отрендерятся здесь, 
          только если пользователь вошел в систему */}
        {children}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
