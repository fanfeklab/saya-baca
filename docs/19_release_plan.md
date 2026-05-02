# 19_release_plan.md

## Release Plan: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Dokumen ini mendefinisikan rencana rilis bertahap (milestone) untuk SAYA BACA. Setiap milestone mengelompokkan fitur berdasarkan prioritas MoSCoW, dilengkapi dengan feature flags, strategi deployment, dan rollback plan. Dokumen ini menjadi acuan bagi Agent Coder dan tim untuk mengelola ekspektasi dan jadwal.

---

### 2. Prinsip Rilis

| Prinsip | Implementasi |
|---------|-------------|
| **Iteratif & Inkremental** | Rilis bertahap: MVP (v1.0), Enhancement (v1.1), Social (v1.2). |
| **Feature Flags** | Fitur Should dan Could di belakang toggle. Bisa diaktifkan/dinonaktifkan tanpa deploy ulang. |
| **Zero-Downtime** | Setiap rilis production melalui Vercel — otomatis zero-downtime. |
| **Rollback Cepat** | Vercel menyimpan deployment history. Rollback ke versi sebelumnya < 1 menit. |
| **Dogfooding** | Tim internal menggunakan aplikasi sebelum dirilis ke publik. |

---

### 3. Milestone

#### 3.1 Milestone 1: MVP (v1.0) — "SAYA BACA Basic"

| Atribut | Detail |
|---------|--------|
| **Target** | Rilis ke publik terbatas (beta tester orang tua). |
| **Fokus** | Core system + 3 Modul Belajar + Gamifikasi dasar. |
| **Fitur** | Semua fitur **Must** (lihat MoSCoW di PRD). |

| Fitur | Status |
|-------|--------|
| 4 Engine (Bank Data, Quiz, Masking, Result) | ✅ |
| 3 Modul Belajar (Abjad, Vokal, Kalimat) | ✅ |
| Login Firebase (Google + Anonim) | ✅ |
| Multi-profil anak | ✅ |
| PIN orang tua | ✅ |
| XP, Bintang, Streak | ✅ |
| Audio Feedback (TTS & SFX) | ✅ |
| Timer Belajar | ✅ |
| Dashboard Orang Tua (basic) | ✅ |
| Text Control (basic) | ✅ |
| PWA (installable, offline-ready) | ✅ |

| Feature Flag | Default | Keterangan |
|--------------|---------|------------|
| `ENABLE_ANONYMOUS_LOGIN` | `true` | Bisa dimatikan jika ada masalah abuse. |
| `ENABLE_TIMER` | `true` | Timer bisa dimatikan untuk testing. |
| `ENABLE_STREAK` | `true` | Streak bisa dimatikan untuk testing. |

---

#### 3.2 Milestone 2: Enhancement (v1.1) — "SAYA BACA Plus"

| Atribut | Detail |
|---------|--------|
| **Target** | Rilis ke publik luas. |
| **Fokus** | Leaderboard, Mini Games, Dashboard Lanjutan, Admin Panel Basic. |
| **Fitur** | Semua fitur **Should** (lihat MoSCoW). |

| Fitur | Status |
|-------|--------|
| Global Leaderboard | ✅ |
| Leaderboard Misi Harian | ✅ |
| Mini Games (Single Player) | ✅ |
| Stiker & Badge Reward | ✅ |
| Dashboard Analitik Lanjutan | ✅ |
| Text Control Lanjutan | ✅ |
| Admin Panel Basic (CRUD bank data) | ✅ |

| Feature Flag | Default | Keterangan |
|--------------|---------|------------|
| `ENABLE_LEADERBOARD` | `true` | Bisa dimatikan untuk mode belajar fokus. |
| `ENABLE_DAILY_LEADERBOARD` | `true` | Bisa dimatikan terpisah. |
| `ENABLE_MINI_GAMES` | `true` | Mini games bisa dimatikan jika ada bug. |
| `ENABLE_STICKERS` | `true` | Reward stiker bisa dimatikan. |
| `ENABLE_ADMIN_PANEL` | `false` | Hanya untuk admin, diaktifkan via env. |

---

#### 3.3 Milestone 3: Social (v1.2) — "SAYA BACA Teman"

| Atribut | Detail |
|---------|--------|
| **Target** | Rilis dengan fitur sosial penuh. |
| **Fokus** | Chat, Match, Multiplayer Mini Games, Notifikasi. |
| **Fitur** | Semua fitur **Could** (lihat MoSCoW). |

| Fitur | Status |
|-------|--------|
| Chat dengan teman (stiker & template) | ✅ |
| Match bareng teman | ✅ |
| Mini Games Multiplayer | ✅ |
| Notifikasi Orang Tua | ✅ |
| Avatar Kustom | ✅ |
| Admin Panel Advanced | ✅ |

| Feature Flag | Default | Keterangan |
|--------------|---------|------------|
| `ENABLE_CHAT` | `false` | Diaktifkan bertahap setelah uji keamanan ketat. |
| `ENABLE_MULTIPLAYER` | `false` | Diaktifkan bertahap. |
| `ENABLE_NOTIFICATIONS` | `false` | Diaktifkan setelah opt-in user. |

---

### 4. Feature Flag Implementation

#### 4.1 Prinsip

- Feature flags dikelola sebagai environment variable di Vercel.
- Untuk fitur yang sering berubah, bisa gunakan service seperti **GrowthBook** atau **LaunchDarkly** (opsional, untuk v1.1+).
- Untuk MVP, environment variable cukup.

#### 4.2 Penggunaan di Kode (Pola)

```typescript
// Feature flag check (pseudocode, bukan implementasi)
// const isLeaderboardEnabled = process.env.NEXT_PUBLIC_ENABLE_LEADERBOARD === "true";
// if (!isLeaderboardEnabled) return null; // Sembunyikan komponen
```

#### 4.3 Aturan

- Flag hanya untuk fitur Should dan Could. Fitur Must selalu aktif.
- Flag diuji dalam keadaan ON dan OFF sebelum rilis.
- Flag yang sudah stabil dihapus setelah 2 rilis.

---

### 5. Strategi Deployment

| Lingkungan | Trigger | URL | Pengguna |
|------------|---------|-----|----------|
| **Preview** | Setiap push ke PR | `<branch>--sayabaca.vercel.app` | Developer, Reviewer |
| **Staging** | Merge ke branch `staging` (opsional) | `staging.sayabaca.vercel.app` | Internal team, beta tester |
| **Production** | Merge ke `main` | `sayabaca.vercel.app` | Publik |

---

### 6. Rollback Plan

#### 6.1 Rollback Cepat (< 1 menit)

| Langkah | Tindakan |
|---------|----------|
| 1 | Deteksi masalah (health check gagal, error spike di monitoring). |
| 2 | Buka Vercel Dashboard → Deployments. |
| 3 | Klik "..." pada deployment sebelumnya → "Promote to Production". |
| 4 | Vercel otomatis mengarahkan traffic ke deployment sebelumnya. |

#### 6.2 Rollback dengan Feature Flag

| Langkah | Tindakan |
|---------|----------|
| 1 | Deteksi masalah di fitur tertentu (misal: mini games error). |
| 2 | Ubah environment variable `ENABLE_MINI_GAMES=false` di Vercel dashboard. |
| 3 | Vercel otomatis redeploy dengan flag mati (durasi ~30 detik). |
| 4 | Perbaiki bug, aktifkan kembali flag setelah fix di-merge. |

#### 6.3 Database Rollback

| Langkah | Tindakan |
|---------|----------|
| 1 | Jika migration gagal, jangan deploy. Prisma migration harus reversible. |
| 2 | Gunakan `prisma migrate down` untuk rollback migration (dengan hati-hati). |
| 3 | Backup database sebelum migration production. |

---

### 7. Jadwal Estimasi

| Milestone | Estimasi | Fitur Kunci |
|-----------|----------|-------------|
| **v1.0 MVP** | Minggu 1-8 | Core Engine, 3 Modul, Auth, PIN, Timer, PWA |
| **v1.0 Beta** | Minggu 9-10 | Uji coba terbatas (10-20 orang tua) |
| **v1.0 Release** | Minggu 11-12 | Perbaikan dari feedback beta → rilis publik |
| **v1.1** | Minggu 13-18 | Leaderboard, Mini Games, Dashboard Lanjutan |
| **v1.2** | Minggu 19-26 | Chat, Multiplayer, Notifikasi |