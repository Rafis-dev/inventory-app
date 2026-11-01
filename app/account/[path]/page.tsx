'use client';
import Sidebar from '@/components/sidebar';
// import { getCurrentUser } from '@/lib/auth';
import { AccountView } from '@neondatabase/auth/react';
import { usePathname } from 'next/navigation';

export default function SettingsPage() {
  const pathname = usePathname();
  // const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <AccountView pathname={pathname} />
          </div>
        </div>
      </main>
    </div>
  );
}
