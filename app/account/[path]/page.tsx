'use client';
import Sidebar from '@/components/sidebar';

import { AccountView } from '@neondatabase/auth/react';
import { usePathname } from 'next/navigation';

export default function SettingsPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-2xl font-semibold text-gray-900">
                Настройки
              </h1>
              <p className="text-sm text-gray-500">
                Управляйте настройками аккаунта
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
