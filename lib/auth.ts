import { createNeonAuth } from '@neondatabase/auth/next/server';
import { redirect } from 'next/navigation';

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});

export async function getCurrentUser() {
  const { data } = await auth.getSession();
  const user = data?.user;

  if (!user) {
    redirect('/auth/sign-in');
  }

  return user;
}
