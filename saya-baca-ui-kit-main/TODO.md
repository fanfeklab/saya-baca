# Project Blueprint & Task Checklist

## 1. Arsitektur & Infrastruktur
- [x] Next.js App Router Setup
- [x] Tailwind CSS + PostCSS Configuration
- [x] Basic shadcn/ui integration
- [x] Layout grouping (`(marketing)`, `(main-app)`, `(dashboard)`)
- [x] Global Layout Root (`app/layout.tsx`)
- [x] DX Tools: Implement Floating Route Navigator & Dev Panel
- [x] Context/State Visualizer untuk Dev Tools
- [x] DX Tools: Make sidebar route navigator scrollable (ScrollArea)
- [x] Fix Hydration Error and Nested Button problems.
- [ ] **Implementasi Responsivitas Fluid** (Flex/Grid wrap, Portrait/Landscape orientation, 4K screen scaling, prevent overflow)
- [ ] **Panduan & Implementasi Aksesibilitas** (WAI-ARIA, Semantic HTML, Screen Readers support, focus visible)
- [x] **Arsitektur UI Kit Showcase**: Halaman Docs dengan Sidebar (Grouping Komponen per tipe, variasi terisolasi per halaman)

## 2. System Design (Atomic Design)

### Atoms (Dasar)
- [x] NeoText (Typography system)
- [x] IconButton
- [x] ThemeToggle
- [x] AudioButton
- [x] ConfettiBurst
- [x] Avatar/Illustration Holder
- [x] Base Icons (Lucide)
- [x] Base Colors & CSS Variables Mapping
- [x] Decorative Shapes (Stars, Bubbles, dll)
- [x] Feedback & Loading Elements (SkeletonNeo, ProgressNeo, BadgeNeo)

### Molecules (Gabungan)
- [x] Content Card (Hero Mission, etc)
- [x] Floating Bottom Navigation (Main App) - Extract to molecule
- [x] Sidebar Menu Item (Admin)
- [x] Top App Bar Profile (Main App)
- [x] Form Input Field (Input + Label)
- [x] Komponen Navigasi Tambahan (Breadcrumbs, Tabs)
- [x] Komponen Data (StatCard, UserBadge, NotificationBell, EmptyState)

### Organisms (Kompleks)
- [x] Main App Layout Header (Top & Bottom bars)
- [x] Admin Sidebar Panel
- [x] Game/Module Selection Grid
- [x] Parent Report Chart Panel
- [x] Analytics Summary (Admin)
- [x] Social & Profile (ProfileSwitcher, Leaderboard, FriendList)

### Templates (Pola Halaman)
- [x] Marketing Layout
- [x] Main App Layout (Edu-App Style)
- [x] Admin Dashboard Layout (ERP Style)
- [x] UI Kit Docs Template (Sidebar + Content Area)

## 3. Pages (Example Pages)

### UI Kit Showcase & Docs
- [x] Halaman Showcase dengan Sidebar Grouping (Atoms, Molecules, Forms, Organisms)
- [x] Page khusus `Form Field` (variasi validation, sizes, types)
- [x] Page khusus `Buttons` & `Icons`

### Marketing
- [x] `/` (Landing Page)

### Auth Pages
- [x] `/login` (Welcome & Switch Account)

### Main App (Edu-App)
- [x] `/home` (Dashboard Anak / Misi Harian)
- [x] `/game/membaca` (Contoh Modul Belajar)
- [x] `/game/berhitung` (Contoh Modul Belajar)
- [x] `/game/menyanyi` (Contoh Modul Belajar)
- [x] `/game/menggambar` (Contoh Modul Mewarnai)
- [x] `/parent` (Dashboard Orang Tua, Laporan)
- [x] `/prestasi` (Galeri Piala/Badge)
- [x] `/profil` (Ganti Avatar, Pengaturan Dasar)

### Dashboard (Admin ERP)
- [x] `/dashboard` (Analytics Overview)
- [x] `/dashboard/users` (User Management)
- [x] `/dashboard/content` (Content/Curriculum Management)

## 4. State & Interactions
- [x] Pindah halaman animasi (Framer Motion page transitions) / CSS Transitions
- [x] Global Store / Context untuk Mock Data (Misi hari ini, level, badge) // Zustand
- [x] Sound Effects (onClick/onTrigger)

## 5. UI/UX Final Polish
- [x] Mobile Responsiveness (Responsive padding, touch target 44px)
- [x] Neo-brutalism design style consistency (shadow, border)
- [x] Color Palette Harmonization
- [x] Dark Mode Support Verification

