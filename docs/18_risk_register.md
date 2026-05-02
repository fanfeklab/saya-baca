# 18_risk_register.md

## Risk Register: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Dokumen ini mencatat seluruh risiko proyek **SAYA BACA** yang telah teridentifikasi. Mencakup risiko keamanan (OWASP), risiko operasional (SPOF, cascading failure), dan risiko skalabilitas. Setiap risiko dilengkapi dengan tingkat dampak, probabilitas, dan strategi mitigasi. Dokumen ini menjadi acuan bagi Agent Coder untuk implementasi yang aman dan tangguh.

---

### 2. Matriks Risiko

| Level | Probabilitas | Dampak | Tindakan |
|-------|-------------|--------|----------|
| **Kritis** | Tinggi | Tinggi | Harus dimitigasi sebelum MVP rilis. |
| **Tinggi** | Tinggi/Sedang | Sedang/Tinggi | Mitigasi wajib, pemantauan berkala. |
| **Sedang** | Sedang/Rendah | Sedang | Mitigasi jika resources tersedia. |
| **Rendah** | Rendah | Rendah | Dicatat, dipantau. |

---

### 3. Risiko Keamanan (OWASP Top 10)

| ID | Risiko | OWASP | Probabilitas | Dampak | Level | Mitigasi |
|----|--------|-------|-------------|--------|-------|----------|
| **RSK-001** | **Broken Access Control** — Anak mengakses dashboard orang tua atau admin panel tanpa PIN. | A01:2021 | Sedang | Tinggi | **Tinggi** | Middleware verifikasi token + PIN di setiap endpoint parental/admin. Row-Level Security di database. |
| **RSK-002** | **Cryptographic Failure** — PIN orang tua tersimpan plaintext atau token Firebase bocor. | A02:2021 | Rendah | Kritis | **Tinggi** | PIN di-hash dengan bcrypt. Firebase Admin SDK disimpan di environment variable. HTTPS diwajibkan (HSTS). |
| **RSK-003** | **Injection** — SQL Injection via parameter API atau raw query. | A03:2021 | Rendah | Kritis | **Tinggi** | Gunakan Prisma ORM (parameterized query). Tidak ada raw query. Validasi input dengan Zod. |
| **RSK-004** | **Insecure Design** — Logika PIN bypass-able, atau timer bisa dimatikan anak. | A04:2021 | Rendah | Tinggi | **Sedang** | Review arsitektur sebelum implementasi. Setiap kontrol orang tua harus server-side validated, bukan hanya client-side. |
| **RSK-005** | **Security Misconfiguration** — Environment variable tidak di-set di production, CORS terlalu terbuka. | A05:2021 | Rendah | Sedang | **Rendah** | Vercel environment variable wajib di-set via dashboard. CORS hanya allow domain sendiri. Security headers via `next.config.js`. |
| **RSK-006** | **Vulnerable Components** — Dependency usang dengan CVE. | A06:2021 | Sedang | Sedang | **Sedang** | `npm audit` di CI/CD. Dependabot untuk auto-update. Update dependency rutin. |
| **RSK-007** | **Auth Failure** — Firebase token bisa dipalsukan atau kadaluarsa. | A07:2021 | Rendah | Tinggi | **Sedang** | Verifikasi token di server via Firebase Admin SDK. Token expiry ≤ 1 jam. Refresh token dikelola Firebase. |

---

### 4. Risiko Operasional

| ID | Risiko | Probabilitas | Dampak | Level | Mitigasi |
|----|--------|-------------|--------|-------|----------|
| **RSK-010** | **Single Point of Failure (SPOF)** — Vercel down, aplikasi tidak bisa diakses. | Rendah | Tinggi | **Sedang** | PWA offline-ready (konten di-cache). Status page monitoring. Belum perlu multi-cloud untuk MVP. |
| **RSK-011** | **Database Outage** — Supabase/PlanetScale down, semua data tidak bisa diakses. | Rendah | Kritis | **Tinggi** | Pilih provider dengan SLA ≥ 99.9%. Backup harian. Read replica untuk v1.1. |
| **RSK-012** | **Firebase Outage** — Auth service down, login gagal. | Rendah | Tinggi | **Sedang** | Firebase SLA 99.95%. Anonim login bisa fallback ke local-only session untuk existing user. |
| **RSK-013** | **Cascading Failure** — Error di Quiz Engine menyebabkan seluruh API crash. | Sedang | Sedang | **Sedang** | Circuit breaker pattern. Timeout 5 detik per engine. Graceful degradation: modul lain tetap berfungsi. |
| **RSK-014** | **Data Loss** — Penghapusan profil tidak sengaja atau kegagalan database. | Rendah | Kritis | **Tinggi** | Soft delete untuk konten, konfirmasi eksplisit untuk hapus profil. Backup database harian (Supabase managed). |
| **RSK-015** | **Zero-Day Exploit** — Kerentanan baru di Next.js atau dependency. | Rendah | Sedang | **Rendah** | Dependabot alert. Proses update keamanan ≤ 24 jam untuk critical CVE. |

---

### 5. Risiko Skalabilitas

| ID | Risiko | Probabilitas | Dampak | Level | Mitigasi |
|----|--------|-------------|--------|-------|----------|
| **RSK-020** | **Lonjakan Trafik** — Aplikasi viral, user naik 10x dalam seminggu. | Rendah | Sedang | **Sedang** | Vercel auto-scales serverless functions. Supabase skalabel. Rate limiting di API. Stress test sebelum rilis. |
| **RSK-021** | **Bank Data Membesar** — Ribuan kata/kalimat memperlambat query Quiz Engine. | Sedang | Sedang | **Sedang** | Indexing di kolom `level`, `category`. Pagination di admin panel. Cache query (React Query + SWR). |
| **RSK-022** | **Cold Start** — Serverless function lambat saat pertama kali dipanggil. | Sedang | Rendah | **Rendah** | Vercel warming function. SSG untuk halaman statis. Bundle size minimal. |
| **RSK-023** | **Audio File Membesar** — Banyak audio URL di bank data membebani storage/bandwidth. | Rendah | Rendah | **Rendah** | TTS client-side untuk soal, tidak perlu audio file. Audio URL hanya untuk kata spesifik. CDN caching. |

---

### 6. Risiko Bisnis & Proyek

| ID | Risiko | Probabilitas | Dampak | Level | Mitigasi |
|----|--------|-------------|--------|-------|----------|
| **RSK-030** | **Orang Tua Tidak Mendampingi** — Anak kehilangan arah, orang tua tidak melihat nilai aplikasi. | Tinggi | Tinggi | **Kritis** | Timer belajar, notifikasi streak ke orang tua, onboarding jelas tentang pentingnya pendampingan. UX ramah anak. |
| **RSK-031** | **Konten Kurang Variatif** — Hanya 3 modul, anak cepat bosan. | Sedang | Tinggi | **Tinggi** | Arsitektur plug-in memudahkan penambahan modul. Admin panel untuk konten baru. Rilis modul baru secara berkala. |
| **RSK-032** | **UX Terlalu Rumit** — Anak frustasi, orang tua uninstall. | Sedang | Tinggi | **Tinggi** | Uji coba dengan anak target. Dumb UI principle. Maksimal 3 tap ke konten. Audio feedback wajib. |
| **RSK-033** | **Regulasi Baru** — Aturan privasi data anak dari pemerintah yang mengharuskan perubahan besar. | Rendah | Sedang | **Sedang** | Arsitektur compliance-friendly (data terpisah per bounded context). Konsultasi hukum jika diperlukan. |