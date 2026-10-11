import Sidebar from '@/components/sidebar';
import { getCurrentUser } from '@/lib/auth';

import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;

  const totalProducts = await prisma.product.count({ where: { userId } });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-=sm text-gray-500">
                Welcome back! Here is an overvie of your inventory
              </p>
            </div>
          </div>
        </div>

        {/* Key metrics */}
      </main>
    </div>
  );
}
