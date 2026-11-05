'use client';
import Sidebar from '@/components/sidebar';

import { AccountView } from '@neondatabase/auth/react';
import { usePathname } from 'next/navigation';

export default function SettingsPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="pt-53 p-2 md:ml-64 md:pt-8 lg:p-4">
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
          <div className="p-2 bg-white rounded-lg overflow-auto border border-gray-200 md:p-4">
            <AccountView pathname={pathname} />
          </div>
        </div>
      </main>
    </div>
  );
}
