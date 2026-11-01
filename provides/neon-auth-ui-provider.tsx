'use client';

import { createAuthClient } from '@neondatabase/auth/next';
import { NeonAuthUIProvider } from '@neondatabase/auth-ui';

export const authClient = createAuthClient();

export function NeonAuthProviders({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      defaultTheme="light"
      social={{
        providers: ['google'],
      }}
      localization={{
        // Общие кнопки и элементы управления
        SAVE: 'Сохранить изменения',
        NAME: 'Имя',
        SETTINGS: 'Настройки',
        EMAIL_DESCRIPTION: 'Введите почту для входа',
        NAME_DESCRIPTION: 'Введите ваше имя',

        // Поля управления аккаунтом (AccountView)
        ACCOUNT: 'Настройки аккаунта',
        SECURITY: 'Безопасность',
        SESSIONS: 'Активные сессии',
        SESSIONS_DESCRIPTION: 'Управляйте сессиями и доступом',
        REVOKE: 'Отозвать доступ',
        SIGN_OUT: 'Выйти',
        PROVIDERS: 'Провайдеры',
        LINK: 'Подключить',
        UNLINK: 'Отключить',
        PROVIDERS_DESCRIPTION: 'Подключите ваш аккаунт к стороннему сервису',

        SET_PASSWORD: 'Сменить пароль',
        SET_PASSWORD_DESCRIPTION:
          'Нажмите кнопку, чтобы установить пароль для вашего аккаунта',
        CURRENT_PASSWORD: 'Текущий пароль',
        NEW_PASSWORD: 'Новый пароль',
        CONFIRM_PASSWORD: 'Подтвердите новый пароль',

        // Тексты для форм авторизации (если используются AuthView / SignInForm)
        SIGN_IN: 'Войти в аккаунт',
        SIGN_IN_DESCRIPTION: 'Добро пожаловать назад',
        SIGN_UP: 'Регистрация',
        OR_CONTINUE_WITH: 'Или продолжить через',
      }}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
