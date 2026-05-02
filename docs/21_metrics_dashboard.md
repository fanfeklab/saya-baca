# 21_metrics_dashboard.md

## Metrics Dashboard: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Dokumen ini mendefinisikan **Key Performance Indicators (KPI)** bisnis dan teknis yang akan dipantau secara kontinu untuk mengukur kesehatan dan keberhasilan **SAYA BACA**. Metrik ini akan ditampilkan di dashboard monitoring (Vercel Analytics, Sentry, dan custom dashboard jika diperlukan).

---

### 2. Struktur Metrik

| Kategori | Tujuan |
|----------|--------|
| **Metrik Bisnis** | Mengukur engagement, retensi, dan nilai produk ke pengguna. |
| **Metrik Teknis** | Mengukur performa, keandalan, dan kesehatan sistem. |

---

### 3. Metrik Bisnis

| ID | Metrik | Deskripsi | Target | Sumber |
|----|--------|-----------|--------|--------|
| **B-001** | **Daily Active Users (DAU)** | Jumlah profil anak unik yang melakukan aktivitas per hari. | ≥ 50 (3 bulan pasca-ristis) | Database query / Firebase Analytics |
| **B-002** | **Weekly Active Users (WAU)** | Jumlah profil anak unik per minggu. | ≥ 200 | Database query |
| **B-003** | **Retention Rate (Day 7)** | % anak yang kembali dalam 7 hari setelah sesi pertama. | ≥ 60% | Firebase Analytics / Query |
| **B-004** | **Retention Rate (Day 30)** | % anak yang kembali dalam 30 hari. | ≥ 30% | Firebase Analytics |
| **B-005** | **Sesi Belajar per Hari** | Rata-rata jumlah sesi belajar/kuis yang diselesaikan per anak per hari. | ≥ 1.5 sesi | Database `quiz_sessions` |
| **B-006** | **Durasi Belajar Rata-rata** | Rata-rata menit belajar per anak per hari. | 20-30 menit | Database + client event |
| **B-007** | **Penyelesaian Modul 1** | % anak yang menyelesaikan modul "Mengenal Abjad" minimal 1x. | ≥ 80% | Database `learning_progress` |
| **B-008** | **Rata-rata Bintang** | Rata-rata bintang dari seluruh sesi kuis. | ≥ 3.5 | Database `quiz_sessions` |
| **B-009** | **Streak Rate** | % anak dengan streak ≥ 3 hari. | ≥ 40% | Database `profile_stats` |
| **B-010** | **Orang Tua Dashboard Cek** | % orang tua yang membuka dashboard minimal 1x/minggu. | ≥ 50% | Database log / client event |

---

### 4. Metrik Teknis

| ID | Metrik | Deskripsi | Target | Sumber |
|----|--------|-----------|--------|--------|
| **T-001** | **API Request Rate** | Request/detik ke semua endpoint API. | Baseline, alert > 50 req/s | Vercel Analytics |
| **T-002** | **API Error Rate** | % response 4xx/5xx dari total request. | < 1% | Vercel / Sentry |
| **T-003** | **P95 Latency** | Latency persentil 95 untuk response API. | < 500ms | Vercel Analytics |
| **T-004** | **P99 Latency** | Latency persentil 99 (ekor panjang). | < 1 detik | Vercel Analytics |
| **T-005** | **Cold Start Time** | Waktu inisialisasi serverless function pertama kali. | < 1 detik | Vercel Logs |
| **T-006** | **Database Query Time** | Rata-rata durasi query database. | < 100ms | Prisma / pino log |
| **T-007** | **Database Pool Usage** | % koneksi database aktif dari pool size. | < 80% | Supabase/PlanetScale dashboard |
| **T-008** | **Memory Usage** | Penggunaan memori per serverless function. | < 80% limit (1GB) | Vercel Logs |
| **T-009** | **TTS Playback Success Rate** | % SpeechSynthesis berhasil tanpa error di browser pengguna. | ≥ 95% | Client event (Sentry) |
| **T-010** | **PWA Install Rate** | % pengguna yang menginstal PWA dari prompt. | ≥ 15% | Vercel Analytics (custom event) |
| **T-011** | **Offline Access Rate** | % sesi yang dimulai saat offline (konten cache). | Data baseline | Service Worker event |
| **T-012** | **Lighthouse Score** | Skor performa, aksesibilitas, PWA. | ≥ 90 di setiap kategori | Lighthouse CI |

---

### 5. Dashboard Layout (Custom Dashboard — v1.1)

Jika di masa depan dibangun dashboard admin custom, layout rekomendasi:

```
┌──────────────────────────────────────────────┐
│  SAYA BACA - Metrics Dashboard               │
│  Periode: [7 Hari ▼]  [Refresh]             │
├──────────────────┬───────────────────────────┤
│  METRIK UTAMA    │  TREND (Grafik)           │
│                  │                           │
│  ┌────┐ ┌────┐  │  📈 DAU (7 hari)          │
│  │ DAU│ │WAU │  │  ▁▂▃▄▅▆▇                  │
│  │ 52 │ │ 210│  │                           │
│  └────┘ └────┘  │  📈 Error Rate            │
│                  │  ▁▁▁▂▁▁▁ (0.5%)          │
│  ┌────┐ ┌────┐  │                           │
│  │Ret │ │Str │  │  📈 Latency P95           │
│  │65% │ │45% │  │  ▁▂▁▃▁▂▁ (320ms)         │
│  └────┘ └────┘  │                           │
├──────────────────┴───────────────────────────┤
│  TABEL DETAIL                                │
│  ┌──────────┬──────┬──────┬──────┬──────┐   │
│  │ Modul    │ Sesi │ ⭐Avg│ ✅%  │ Dur  │   │
│  ├──────────┼──────┼──────┼──────┼──────┤   │
│  │ Abjad    │ 1.2K │ 4.1  │ 85%  │ 12m  │   │
│  │ Vokal    │ 890  │ 3.8  │ 72%  │ 9m   │   │
│  │ Kalimat  │ 340  │ 3.2  │ 58%  │ 6m   │   │
│  └──────────┴──────┴──────┴──────┴──────┘   │
└──────────────────────────────────────────────┘
```

---

### 6. Implementasi

| Tool | Metrik | Setup |
|------|--------|-------|
| **Vercel Analytics** | Traffic, page views, PWA install, core web vitals. | Otomatis (terintegrasi Next.js). |
| **Sentry** | Error rate, crash, TTS error, cold start. | `@sentry/nextjs` di root layout. |
| **Pino** | Structured log: API latency, DB query time. | Logger service di setiap API route. |
| **Database View** (opsional) | DAU, WAU, retention, sesi, modul, bintang. | Materialized view di PostgreSQL, direfresh harian. |
| **Firebase Analytics** (opsional v1.1) | User behavior, retention, funnel. | Firebase SDK di frontend (dengan persetujuan privasi). |