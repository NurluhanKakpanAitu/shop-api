# Shop API — Backend для мини-маркетплейса

Backend на NestJS для мини-маркетплейса с JWT авторизацией, ролевым доступом и управлением товарами.

## Стек технологий

- **NestJS** — фреймворк
- **PostgreSQL** — база данных
- **Prisma** — ORM
- **JWT** — аутентификация
- **Docker** — контейнер PostgreSQL
- **Swagger** — документация API

## Запуск проекта

### 1. Клонировать и установить зависимости

```bash
git clone https://github.com/NurluhanKakpanAitu/shop-api.git
cd shop-api
npm install
```

### 2. Настроить переменные окружения

Создать `.env` в корне проекта:

```env
DATABASE_URL="postgresql://shop-user:sPksqLYXTKBJ@localhost:5433/shop_db?schema=public"
JWT_SECRET="your-secret-key"
```

### 3. Запустить PostgreSQL

```bash
docker compose up -d
```

### 4. Выполнить миграции и сгенерировать Prisma клиент

```bash
cd src/infrastructure
npx prisma migrate dev
npx prisma generate
cd ../..
```

### 5. Запустить сервер

```bash
npm run start:dev
```

### 6. Открыть Swagger

```
http://localhost:3000/api
```

## API эндпоинты

### Авторизация

| Метод | URL              | Авторизация | Описание                          |
|-------|------------------|-------------|-----------------------------------|
| POST  | /auth/register   | -           | Регистрация нового пользователя   |
| POST  | /auth/login      | -           | Логин и получение JWT токена      |
| GET   | /auth/get-info   | JWT         | Информация о текущем пользователе |

**Тело запроса регистрации:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "SELLER"
}
```

**Ответ логина:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Пользователи

| Метод | URL         | Авторизация | Описание                  |
|-------|-------------|-------------|---------------------------|
| GET   | /users/:id  | JWT         | Получить пользователя по ID |

### Товары

| Метод  | URL            | Авторизация  | Описание                              |
|--------|----------------|--------------|---------------------------------------|
| POST   | /products      | JWT / SELLER | Создать товар                         |
| GET    | /products      | -            | Список товаров (пагинация + поиск)    |
| GET    | /products/:id  | -            | Получить товар по ID                  |
| PATCH  | /products/:id  | JWT / SELLER | Обновить товар (только владелец)      |
| DELETE | /products/:id  | JWT / SELLER | Удалить товар (только владелец)       |

**Query параметры для GET /products:**

| Параметр  | Тип    | По умолчанию | Описание                    |
|-----------|--------|--------------|-----------------------------|
| page      | number | 1            | Номер страницы              |
| limit     | number | 10           | Количество на странице      |
| search    | string | -            | Поиск по названию товара    |
| sortOrder | string | asc          | Сортировка по цене: asc / desc |

## Структура проекта

```
src/
  domain/                  # Доменный слой (модели, интерфейсы)
    users/
    products/
    value-objects/
  infrastructure/          # Инфраструктурный слой (Prisma, репозитории)
    prisma/
    repositories/
  application/             # Слой приложения (модули, сервисы, контроллеры)
    auth/
    users/
    products/
```

## Роли

- **USER** — может просматривать товары и пользователей
- **SELLER** — может создавать, редактировать и удалять свои товары

## Что можно улучшить

- Валидация входных данных с `class-validator`
- Refresh токены
- Загрузка изображений для товаров
- Unit и e2e тесты
- Dockerfile для самого приложения
- Логирование
