import Pagination from '@/components/pagination';
import Sidebar from '@/components/sidebar';
import { deleteProduct } from '@/lib/actions/products';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user?.id;

  const params = await searchParams;
  const q = (params.q ?? '').trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 10;
  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
  };

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="pt-53 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Инвентарь
              </h1>
              <p className="text-sm text-gray-500">
                Управляйте товарами и отслеживайте уровень запасов
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* search */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <form
              className="flex flex-col sm:flex-row gap-2"
              action="/inventory"
              method="GET"
            >
              <input
                type="text"
                name="q"
                placeholder="Искать продукты"
                className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
              />

              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">
                Поиск
              </button>
            </form>
          </div>

          {/* products table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Имя
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Артикул
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Цена
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Кол-во
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Низкое количество при
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Действия
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((product, key) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {product.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {product.sku || '-'}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        ${Number(product.price).toFixed(2)}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {product.quantity}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {product.lowStockAt}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        <form
                          action={async (formData: FormData) => {
                            'use server';
                            await deleteProduct(formData);
                          }}
                        >
                          <input type="hidden" name="id" value={product.id} />

                          <button className="text-red-600 hover:text-red-900 cursor-pointer">
                            Удалить
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 overflow-x-auto">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/inventory"
                searchParams={{
                  q,
                  pageSize: String(pageSize),
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
