import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { data } = await auth.getSession();

  if (data?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Управление запасами
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Оптимизируйте учет товарных запасов с помощью нашей мощной и простой
            в использовании системы управления. Отслеживайте товары,
            контролируйте уровень запасов и получайте ценную аналитическую
            информацию.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/sign-in"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Войти или создать акаунт
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
