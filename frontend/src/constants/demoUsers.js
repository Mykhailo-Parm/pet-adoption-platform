// Реальна автентифікація відсутня (спрощено за SPEC) — обираємо тестового
// користувача на сторінці "Автентифікація". Перші два відповідають рядкам,
// які вставив DataSeeder на бекенді; адмін — суто для демонстрації навігації
// (окремого backend-користувача під нього не заведено, бо не потрібен).
export const DEMO_USERS = [
  {
    id: 1,
    fullName: 'Олена Коваль',
    email: 'olena.guardian@example.com',
    role: 'GUARDIAN',
    shelterId: null,
    shelterName: null,
  },
  {
    id: 2,
    fullName: 'Іван Бондар',
    email: 'ivan.shelter@example.com',
    role: 'SHELTER_REP',
    shelterId: 1,
    shelterName: 'Притулок "Промінь"',
  },
  {
    id: null,
    fullName: 'Адміністратор (демо)',
    email: 'admin@example.com',
    role: 'ADMIN',
    shelterId: null,
    shelterName: null,
  },
];

export const ROLE_LABELS = {
  GUARDIAN: 'опікун',
  SHELTER_REP: 'притулок',
  ADMIN: 'адмін',
};
