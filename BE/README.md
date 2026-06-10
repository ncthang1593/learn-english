# EnglishUp API

Backend API cho ứng dụng học tiếng Anh EnglishUp, xây dựng với NestJS + Prisma + PostgreSQL.

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd BE
npm install
```

### 2. Cấu hình môi trường

```bash
cp .env.example .env
# Điền đầy đủ các giá trị trong .env
```

### 3. Tạo database và migrate

```bash
# Cần PostgreSQL hoặc Neon đang chạy
npx prisma migrate dev --name init
npm run db:seed
```

### 4. Chạy local dev

```bash
npm run start:dev
# API: http://localhost:3000
# Swagger: http://localhost:3000/api/docs
```

### Hoặc dùng Docker Compose

```bash
docker compose up
# API: http://localhost:3000
# PostgreSQL: localhost:5432
```

---

## 📁 Cấu Trúc

```
BE/
├── src/
│   ├── auth/          # JWT + Google + Facebook OAuth
│   ├── users/         # Profile, settings
│   ├── progress/      # Sync, dashboard, export
│   ├── lessons/       # Lesson completion tracking
│   ├── gamification/  # XP, streak, achievements
│   ├── grammar/       # Grammar read tracking
│   ├── flashcards/    # SM-2 spaced repetition
│   ├── content/       # Public content API
│   ├── admin/         # Admin CRUD (Role: ADMIN)
│   ├── prisma/        # PrismaService
│   └── common/        # Decorators, filters
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── prisma.config.ts   # Prisma 7 config
├── vercel.json        # Vercel deployment
├── Dockerfile
└── docker-compose.yml
```

---

## 🌐 API Endpoints

| Module | Endpoints |
|--------|-----------|
| **Auth** | POST /api/auth/register, /login, /refresh, /logout; GET /api/auth/me, /google, /facebook |
| **Users** | PATCH /api/users/profile, /settings; DELETE /api/users/account |
| **Progress** | GET /api/progress, /dashboard, /export; POST /sync, /import; DELETE /reset |
| **Lessons** | GET /api/lessons/progress; POST /api/lessons/:id/complete |
| **Gamification** | GET /api/gamification/stats, /achievements; POST /checkin |
| **Grammar** | GET /api/grammar/read-status; POST /api/grammar/:id/read |
| **Flashcards** | GET /api/flashcards/due, /stats; POST /review |
| **Content** | GET /api/content/levels, /grammar, /achievements (Public) |
| **Admin** | CRUD /api/admin/lessons, /grammar; GET /stats (ADMIN only) |

---

## 🚀 Deploy lên Vercel + Neon

### 1. Tạo Neon database

- Vào [neon.tech](https://neon.tech) → New Project
- Copy `DATABASE_URL` (pooled connection)

### 2. Deploy BE lên Vercel

```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET
# ... (xem .env.example để biết đầy đủ danh sách)
```

### 3. Run migration trên production

```bash
DATABASE_URL=<neon-url> npx prisma migrate deploy
DATABASE_URL=<neon-url> npm run db:seed
```

### 4. Deploy FE lên Vercel

```bash
cd ../FE
vercel
```

---

## 🛠️ Scripts

```bash
npm run start:dev     # Dev server với hot reload
npm run build         # Build production
npm run db:migrate    # Migrate database
npm run db:generate   # Generate Prisma client
npm run db:seed       # Seed admin user
npm run db:studio     # Prisma Studio GUI
npm test              # Unit tests
```

---

## 🔧 Admin Account

Sau khi seed, login với:
- **Email:** `admin@englishup.com` (hoặc ADMIN_EMAIL trong .env)
- **Password:** `Admin@123456` (hoặc ADMIN_PASSWORD trong .env)

---

## 📖 Swagger Docs

Truy cập `http://localhost:3000/api/docs` khi chạy ở development mode.
