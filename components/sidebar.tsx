'use client';

import { UserButton } from '@neondatabase/auth/react';
import { BarChart3, Package, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
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
        {navigation.map((item, key) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              href={item.href}
              key={key}
              className={`flex items-center space-x-3 py-2 px-3 rounded-lg shrink-0 ${isActive ? 'bg-purple-100 text-gray-800' : 'hover:bg-gray-800 text-gray-300'}`}
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
