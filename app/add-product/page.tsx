import Sidebar from '@/components/sidebar';
import { createProduct } from '@/lib/actions/products';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';

export default async function AddProductPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="pt-53 p-4 md:ml-64 md:pt-8 md:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-2xl font-semibold text-gray-900">
                Добавить Продукт
              </h1>
              <p className="text-sm text-gray-500">
                Добавьте новый товар в свой ассортимент
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form className="space-y-6" action={createProduct}>
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Имя продукта *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter Product Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Количество *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Цена *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                    placeholder="0.0"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Артикул (не обязательно)
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"

                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter SKU"
                />
              </div>

              <div className="">
                <label
                  htmlFor="lowStockAt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Низкий остаток при (не обязательно)
                </label>
                <input
                  type="number"
                  id="lowStockAt"
                  name="lowStockAt"
                  min="0"

                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter low stock threshold"
                />
              </div>

              <div className="block md:flex gap-5">
                <button
                  type="submit"
                  className="w-full mb-5 md:mb-0 md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Добавить продукт
                </button>
                <Link
                  href="/inventory"
                  className="inline-block text-center w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Отмена
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
