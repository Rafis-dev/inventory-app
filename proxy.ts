import { auth } from './lib/auth';

export default auth.middleware({
  loginUrl: '/auth/sign-in',
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/inventory/:path*',
    '/add-product/:path*',
    '/settings/:path*',
  ],
};
