# 🎓 EnglishUp – Trang Web Tự Học Tiếng Anh Cho Người Mất Gốc

## Tổng Quan

Xây dựng một **Full-Stack Web Application** giúp người Việt Nam mất gốc tiếng Anh có thể tự học từ con số 0. Ứng dụng tập trung vào trải nghiệm học tập thú vị, trực quan, có lộ trình rõ ràng, và gamification để giữ động lực học.

### Cấu trúc dự án

```
learn-english/
├── FE/          # Angular 22 Frontend
├── BE/          # NestJS Backend (API + Admin)
└── REQUIREMENTS.md
```

---

## 🖥️ FRONTEND

### Tech Stack FE

| Thành phần | Công nghệ |
|-----------|-----------|
| **Framework** | Angular 22 (Standalone Components) |
| **UI Library** | PrimeNG 21+ |
| **CSS Framework** | TailwindCSS 3 |
| **State Management** | Angular Signals |
| **Storage (Guest)** | LocalStorage / IndexedDB |
| **Storage (Logged in)** | API calls (+ LocalStorage fallback) |
| **Routing** | Angular Router với lazy loading |
| **Deployment** | Vercel |

### Phân Tích Đối Tượng Người Dùng

| Đặc điểm | Mô tả |
|-----------|--------|
| **Đối tượng** | Người Việt Nam mất gốc tiếng Anh (học sinh, sinh viên, người đi làm) |
| **Trình độ** | Từ A0 (hoàn toàn mất gốc) đến B1 (sơ-trung cấp) |
| **Nhu cầu** | Lộ trình rõ ràng, bài học ngắn gọn, không áp lực, có phản hồi tức thì |
| **Pain points** | Sợ tiếng Anh, không biết bắt đầu từ đâu, dễ nản, thiếu động lực |
| **Thiết bị** | Chủ yếu điện thoại và laptop |

### Tính Năng FE

#### 1. 🏠 Trang Chủ (Dashboard)
- Hero Section với animation chào mừng, slogan động lực
- Thống kê nhanh: Streak ngày học liên tiếp, tổng từ đã học, cấp độ hiện tại
- Tiến trình học tập hiển thị bằng progress bar/chart (PrimeNG Chart)
- Bài học đề xuất dựa trên tiến trình hiện tại
- Từ vựng của ngày (Word of the Day) với phát âm + ví dụ

#### 2. 🗺️ Lộ Trình Học (Learning Path)
Chia thành **4 cấp độ** với giao diện roadmap trực quan (giống Duolingo):
- **Cấp 1 – Nền Tảng (A0):** Bảng chữ cái, chào hỏi, số đếm, màu sắc, đại từ
- **Cấp 2 – Xây Dựng (A1):** Cấu trúc câu, Present Simple, gia đình, nghề nghiệp
- **Cấp 3 – Phát Triển (A2):** Present Continuous, Past Simple, Modal verbs
- **Cấp 4 – Nâng Cao (B1):** Present Perfect, Conditionals, viết đoạn văn

#### 3. 📚 Bài Học (Lesson Page)
```
[Lý Thuyết] → [Từ Vựng] → [Bài Tập] → [Kết Quả & Phần Thưởng]
```
- 4 loại bài tập: MCQ, Fill-blank, Matching, Sentence Ordering
- Điểm số + sao (1-3 sao) + XP nhận được

#### 4. 📝 Luyện Tập (Practice Center)
- Flashcard Mode với Spaced Repetition (SM-2 algorithm)
- Quiz Mode: Bài kiểm tra tổng hợp theo cấp độ
- Sentence Builder: Kéo thả từ để xếp thành câu

#### 5. 📐 Ngữ Pháp Chi Tiết (Grammar)
4 categories: Các Thì | Cấu Trúc Câu | Từ Loại | Ngữ Pháp Đặc Biệt
- 12+ chủ đề ngữ pháp với giải thích bằng tiếng Việt
- Công thức, ví dụ song ngữ, lỗi sai thường gặp, bài tập nhanh

#### 6. 📊 Tiến Trình (Progress Tracker)
- Biểu đồ tiến trình theo tuần/tháng
- Calendar view đánh dấu ngày đã học
- Thành tích (Achievements)

#### 7. 🎮 Gamification System
| Tính năng | Mô tả |
|-----------|--------|
| **XP** | Nhận XP khi hoàn thành bài học/bài tập |
| **Streak** | Đếm ngày học liên tiếp, fire animation 🔥 |
| **Levels** | Lên level dựa trên tổng XP |
| **Achievements** | Huy hiệu cho các mốc quan trọng |
| **Stars** | 1-3 sao cho mỗi bài học |

#### 8. 👤 Auth (Guest & Logged-in Mode)
- **Guest Mode:** Dùng app không cần đăng nhập, dữ liệu lưu LocalStorage
- **Đăng ký/Đăng nhập:** Email+Password, Google, Facebook
- **Sync:** Khi đăng nhập lần đầu, tự động sync LocalStorage → Server

#### 9. ⚙️ Cài Đặt (Settings)
- Toggle Dark/Light mode
- Mục tiêu học tập hàng ngày
- Reset tiến trình
- Xuất/Nhập dữ liệu (JSON backup)

### Design System FE

| Token | Value |
|-------|-------|
| **Primary** | Indigo-600 (#4F46E5) |
| **Secondary** | Emerald-500 (#10B981) |
| **Accent** | Amber-500 (#F59E0B) |
| **Font** | Inter (Google Fonts) |
| **Border Radius** | 12px-16px |

### Cấu Trúc Thư Mục FE

```
FE/
├── src/app/
│   ├── core/
│   │   ├── models/         # lesson, progress, grammar, achievement
│   │   └── services/       # storage, lesson, gamification, theme, tts, api, auth
│   ├── features/
│   │   ├── dashboard/
│   │   ├── learning-path/
│   │   ├── lesson/
│   │   ├── practice/
│   │   ├── grammar/
│   │   ├── progress/
│   │   ├── settings/
│   │   └── auth/           # login, register, callback pages
│   ├── shared/
│   └── data/               # levels.data.ts, grammar.data.ts
├── angular.json
└── package.json
```

### Routes FE

| Route | Component |
|-------|-----------|
| `/dashboard` | Dashboard |
| `/learning-path` | Learning Path |
| `/lesson/:id` | Lesson |
| `/practice` | Practice Center |
| `/grammar` | Grammar List |
| `/grammar/:id` | Grammar Detail |
| `/progress` | Progress Tracker |
| `/settings` | Settings |
| `/login` | Login Page |
| `/register` | Register Page |
| `/auth/callback` | OAuth Callback |

---

## 🔧 BACKEND

### Tech Stack BE

| Thành phần | Công nghệ |
|-----------|-----------|
| **Runtime** | Node.js 20 LTS |
| **Framework** | NestJS 11 |
| **ORM** | Prisma 6 |
| **Database** | PostgreSQL 16 |
| **Auth** | JWT (15m) + Refresh Token (7d) |
| **OAuth** | Google + Facebook (Passport.js) |
| **Validation** | class-validator + class-transformer |
| **API Docs** | Swagger (`@nestjs/swagger`) |
| **Deployment** | Vercel (Serverless Functions) |
| **DB Hosting** | Neon / Supabase (PostgreSQL serverless) |

> **Tại sao Vercel cho BE?**
> - Cùng platform với FE, quản lý đơn giản
> - Auto scaling, zero config CI/CD từ git push
> - NestJS được build thành serverless function qua `@vercel/node`
> - DB dùng Neon (PostgreSQL serverless, free tier rộng rãi, connection pooling sẵn)

### Tính Năng BE

#### 🔐 Authentication
- Đăng ký / Đăng nhập bằng Email + Password
- Google OAuth2 login
- Facebook OAuth2 login
- JWT Access Token (15 phút) + Refresh Token (7 ngày)
- Tự động rotate refresh token

#### 👤 Guest Mode
- FE hoạt động offline với LocalStorage khi chưa đăng nhập
- Khi đăng ký/đăng nhập: bulk sync LocalStorage → Server (API `/progress/sync`)
- Merge conflict resolution: so sánh `updatedAt`, hỏi user nếu conflict

#### 📊 Progress Sync
- Đồng bộ toàn bộ tiến trình (XP, streak, lesson progress, flashcards, grammar read)
- Hỗ trợ export/import JSON cho backup thủ công

#### 🔧 Admin Panel (API)
- CRUD bài học (Lessons) + nội dung (theory, vocabulary, exercises)
- CRUD chủ đề ngữ pháp (Grammar topics)
- Dashboard stats (số user, bài học hoàn thành, v.v.)
- Role-based: chỉ `ADMIN` role mới được phép

#### 📦 Content API (Public)
- Serve lesson data, grammar data, achievements definitions
- Guest cũng có thể gọi (không cần auth)

### Database Schema (Prisma)

```
User ─┬─── UserProgress (1:1)
      ├─── LessonProgress[] (1:N)
      ├─── DailyActivity[] (1:N)
      ├─── AchievementUnlock[] (1:N)
      ├─── GrammarRead[] (1:N)
      ├─── FlashcardReview[] (1:N)
      └─── RefreshToken[] (1:N)

LessonContent  (Admin-managed, public-served)
GrammarContent (Admin-managed, public-served)
```

### API Endpoints

#### 🔐 Auth
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | ❌ |
| POST | `/api/auth/login` | ❌ |
| POST | `/api/auth/refresh` | ❌ |
| POST | `/api/auth/logout` | ✅ |
| GET | `/api/auth/google` | ❌ |
| GET | `/api/auth/google/callback` | ❌ |
| GET | `/api/auth/facebook` | ❌ |
| GET | `/api/auth/facebook/callback` | ❌ |
| GET | `/api/auth/me` | ✅ |

#### 📊 Progress
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/progress` | ✅ |
| GET | `/api/progress/dashboard` | ✅ |
| POST | `/api/progress/sync` | ✅ |
| GET | `/api/progress/export` | ✅ |
| POST | `/api/progress/import` | ✅ |
| DELETE | `/api/progress/reset` | ✅ |

#### 📚 Lessons, 🎮 Gamification, 📐 Grammar, 🃏 Flashcards
- `POST /api/lessons/:id/complete`
- `GET /api/gamification/stats`, `POST /api/gamification/checkin`
- `POST /api/grammar/:id/read`, `GET /api/grammar/read-status`
- `POST /api/flashcards/review`, `GET /api/flashcards/due`

#### 📦 Content (Public)
- `GET /api/content/levels`
- `GET /api/content/grammar`
- `GET /api/content/achievements`

#### 🔧 Admin (Role: ADMIN)
- CRUD `/api/admin/lessons`
- CRUD `/api/admin/grammar`
- GET `/api/admin/stats`

### Cấu Trúc Thư Mục BE

```
BE/
├── src/
│   ├── main.ts              # Entry point
│   ├── app.module.ts
│   ├── auth/                # JWT + OAuth strategies + guards
│   ├── users/
│   ├── progress/            # Sync, export, dashboard
│   ├── lessons/             # Lesson completion tracking
│   ├── gamification/        # XP, streak, achievements
│   ├── grammar/             # Grammar read tracking
│   ├── flashcards/          # SM-2 spaced repetition
│   ├── content/             # Public static content API
│   ├── admin/               # Admin CRUD
│   ├── prisma/              # PrismaService
│   └── common/              # Decorators, filters, interceptors
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── vercel.json              # Vercel serverless config
├── Dockerfile               # Local dev
├── docker-compose.yml
├── .env.example
└── package.json
```

### Auth Flow

```
[Register/Login] → JWT (15m) + Refresh Token (7d) → lưu FE localStorage
[Request] → Authorization: Bearer <token> → NestJS validate
[Token expired] → POST /auth/refresh → JWT mới
[Google/Facebook] → OAuth redirect → callback → tạo/tìm user → JWT → redirect FE
```

### Guest → Login Sync Flow

```
Guest học bài → data LocalStorage
    ↓ Đăng ký tài khoản
POST /api/progress/sync { localData }
    ↓ Server merge data
Tiến trình được bảo toàn ✅
```

### Deployment (Vercel)

| Thành phần | Platform | Ghi chú |
|-----------|----------|---------|
| **FE** | Vercel (Static/SPA) | Angular build → dist/ |
| **BE** | Vercel (Serverless Functions) | NestJS via `@vercel/node` |
| **Database** | Neon (PostgreSQL serverless) | Free tier: 0.5 GB, pooling sẵn |

**Cách deploy:**
1. Push code lên GitHub
2. Vercel tự detect + deploy FE và BE
3. Neon cung cấp `DATABASE_URL` → điền vào Vercel env vars
4. Set các env vars (JWT secrets, OAuth credentials) trên Vercel dashboard

### Environment Variables BE

```env
DATABASE_URL=postgresql://...@neon.tech/englishup?sslmode=require
JWT_SECRET=...
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=...
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=https://api.englishup.vercel.app/api/auth/google/callback
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
FACEBOOK_CALLBACK_URL=https://api.englishup.vercel.app/api/auth/facebook/callback
FRONTEND_URL=https://englishup.vercel.app
PORT=3000
NODE_ENV=production
ADMIN_EMAIL=admin@englishup.com
ADMIN_PASSWORD=...
```

---

## 📋 Implementation Phases

| Phase | Mô tả | Status |
|-------|--------|--------|
| **FE Phase 1-7** | Angular app đầy đủ (Dashboard → Grammar) | ✅ Done |
| **BE Phase 1** | NestJS setup + Auth (JWT + OAuth) | 🔄 In Progress |
| **BE Phase 2** | Progress + Lesson + Gamification APIs | ⏳ Pending |
| **BE Phase 3** | Grammar + Flashcard + Content APIs | ⏳ Pending |
| **BE Phase 4** | Admin Panel APIs | ⏳ Pending |
| **FE Phase 8** | FE integration (api.service, auth pages, sync) | ⏳ Pending |
| **Deploy** | Vercel (FE + BE) + Neon (DB) | ⏳ Pending |
