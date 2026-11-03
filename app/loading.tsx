'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Package, Plus, Settings } from 'lucide-react';
import { UserButton } from '@neondatabase/auth/react';

// Skeleton component for loading states
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
}

// Sidebar component for loading state

function LoadingSidebar() {
  const navigation = [
    { name: 'Главная панель', href: '/dashboard', icon: BarChart3 },
    { name: 'Инвентарь', href: '/inventory', icon: Package },
    { name: 'Добавить продукт', href: '/add-product', icon: Plus },
    { name: 'Настройки', href: '/account/settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 bg-gray-900 text-white w-full md:w-64 h-auto md:min-h-screen md:h-screen p-4 md:p-6 z-10 flex flex-col md:block">
      <div className="mb-4 md:mb-8 shrink-0">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-7 h-7" />
          <span className="text-lg font-semibold">Учет запасов</span>
        </div>
      </div>

      <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible whitespace-nowrap shrink-0">
        {navigation.map(item => {
          const IconComponent = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-800 text-gray-300 shrink-0"
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 md:mt-0 md:absolute md:bottom-0 md:left-0 md:right-0 p-4 md:p-6 border-t border-gray-700 shrink-0">
        <div className="flex items-center justify-between">
          <UserButton />
        </div>
      </div>
    </div>
  );
}

// Main content skeleton
function MainContentSkeleton({
  showSidebar = true,
}: {
  showSidebar?: boolean;
}) {
  return (
    <main className={showSidebar ? 'ml-64 p-8' : 'p-8'}>
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Key Metrics skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Skeleton className="h-6 w-24 mb-6" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto mb-1" />
                <div className="flex items-center justify-center">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-3 ml-1 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      </div>

      {/* Bottom Row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stock levels skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-48 h-48 rounded-full" />
          </div>
          <div className="mt-6 space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Loading() {
  const pathname = usePathname();

  // Don't show sidebar on public routes
  const showSidebar = !['/', '/sign-in', '/sign-up'].includes(pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showSidebar && <LoadingSidebar />}
      <MainContentSkeleton showSidebar={showSidebar} />
    </div>
  );
}
