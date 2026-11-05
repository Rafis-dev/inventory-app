import ProductsChart from '@/components/products-chart';
import Sidebar from '@/components/sidebar';
import { getCurrentUser } from '@/lib/auth';

import { prisma } from '@/lib/prisma';
import { TrendingUp } from 'lucide-react';
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user?.id;

  const [totalProducts, lowStock, allProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: {
        userId,
        lowStockAt: { not: null },
        quantity: { lte: 5 },
      },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true, createdAt: true },
    }),
  ]);

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  const inStockCount = allProducts.filter(p => Number(p.quantity) > 5).length;
  const lowStockCount = allProducts.filter(
    p => Number(p.quantity) <= 5 && Number(p.quantity) >= 1,
  ).length;
  const outOfStockCount = allProducts.filter(
    p => Number(p.quantity) === 0,
  ).length;

  const inStockPercentage =
    totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
  const lowStockPercentage =
    totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
  const outOfStockPercentage =
    totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

  const now = new Date();
  const weeklyProductsData = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, '0')} / ${String(weekStart.getDate() + 1).padStart(2, '0')}`;

    const weekProducts = allProducts.filter(product => {
      const productDate = new Date(product.createdAt);

      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="pt-53 p-4 md:pt-8 md:ml-64  md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Главная панель
              </h1>
              <p className="text-sm text-gray-500">
                Добро пожаловать! Вот обзор ваших запасов
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
          {/* Key metrics */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Ключевые метрики
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center min-w-0">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {totalProducts}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Всего продуктов
                </div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalProducts}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>

              <div className="text-center min-w-0">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${Number(totalValue).toFixed(0)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Общая цена
                </div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +${Number(totalValue).toFixed(0)}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>

              <div className="text-center min-w-0">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {lowStock}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Низкое количество
                </div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">+{lowStock}</span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Inventory over time */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>Новые товары в неделю</h2>
            </div>

            <div className="h-48">
              <ProductsChart data={weeklyProductsData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
          {/* Stock levels */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Уровни запасов
              </h2>
            </div>

            <div className="space-y-3">
              {recent.map((product, key) => {
                const stockLevel =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                      ? 1
                      : 2;

                const bgColors = [
                  'bg-red-600',
                  'bg-yellow-600',
                  'bg-green-600',
                ];

                const textColors = [
                  'text-red-600',
                  'text-yellow-600',
                  'text-green-600',
                ];

                return (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-2 p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-3 h-3 rounded-full shrink-0 ${bgColors[stockLevel]}`}
                      />

                      <span className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </span>
                    </div>

                    <div
                      className={`text-sm font-medium shrink-0 ${textColors[stockLevel]}`}
                    >
                      {product.quantity} units
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Efficiency section */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Эффективность
              </h2>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                {/* Круговая диаграмма на conic-gradient */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#7c3aed 0% ${inStockPercentage}%, #e5e7eb ${inStockPercentage}% 100%)`,
                  }}
                />

                {/* Внутренний белый круг */}
                <div className="absolute inset-[8px] bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {inStockPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">В наличии</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-200" />
                  <span>В наличии ({inStockPercentage}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600" />
                  <span>Мало в наличии ({lowStockPercentage}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <span>Нет в наличии ({outOfStockPercentage}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
