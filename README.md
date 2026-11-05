# 📦 Inventory Management System

Веб-приложение для управления товарными запасами , построенное на стеке Next.js (App Router) + TypeScript + Prisma + Neon (PostgreSQL) + Neon Auth.

Веб-приложение для управления товарными запасами на Next.js + Prisma + Neon.

## Стек

- Next.js (App Router) + TypeScript
- Prisma + Neon (PostgreSQL)
- Neon Auth (аутентификация)
- Tailwind CSS

## ✨ Возможности

- 🔐 **Аутентификация** — вход/регистрация через Neon Auth (готовый UI)
- 📊 **Дашборд** — ключевые метрики, график новых товаров по неделям, круговая диаграмма эффективности
- 📋 **Инвентарь** — список товаров с поиском, пагинацией и удалением
- ➕ **Добавление товара** — форма с валидацией (имя, количество, цена, SKU, порог низкого остатка)
- ⚙️ **Настройки аккаунта** — управление профилем через `AccountView`
- 👤 **Изоляция данных** — каждый пользователь видит только свои товары

## Запуск

```bash
npm install
```

DATABASE_URL="postgresql://..."
NEON_AUTH_URL="https://..."

npx prisma generate
npx prisma migrate dev
npm run dev
