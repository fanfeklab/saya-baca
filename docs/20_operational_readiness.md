# 20_operational_readiness.md

## Operational Readiness: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Dokumen ini memastikan **SAYA BACA** siap dioperasikan di production. Mencakup health checks, monitoring (RED metrics), alerting, backup & disaster recovery, dan runbook operasional. Dokumen ini menjadi acuan bagi DevOps dan tim operasional untuk menjaga aplikasi tetap sehat dan responsif.

---

### 2. Health Checks

#### 2.1 Endpoint Health

| Endpoint | Metode | Target | Deskripsi |
|----------|--------|--------|-----------|
| `/api/health` | GET | Semua | Health check dasar. Kembalikan 200 jika server hidup. |
| `/api/health/db` | GET | Admin | Cek koneksi database. Kembalikan 200 + `{ db: "connected" }` atau 503 + error. |
| `/api/health/firebase` | GET | Admin | Cek koneksi Firebase Auth. Kembalikan 200 atau 503. |

#### 2.2 Health Check Response

```json
// GET /api/health → 200
{
  "status": "ok",
  "version": "1.0.0",
  "uptime_seconds": 123456,
  "timestamp": "2026-05-01T10:00:00Z"
}
```

#### 2.3 Vercel Health Check

| Atribut | Detail |
|---------|--------|
| **Type** | Automatis oleh Vercel (tidak perlu konfigurasi khusus untuk serverless). |
| **Custom** | Opsional: set `/api/health` sebagai endpoint health check di Vercel dashboard. |

---

### 3. Monitoring (RED Metrics)

RED = **Rate** (request/detik), **Errors** (error rate), **Duration** (latency).

#### 3.1 Tools

| Tool | Cakupan | Implementasi |
|------|---------|-------------|
| **Vercel Analytics** | Web vitals, traffic, page views. | Bawaan Vercel, aktifkan di dashboard. |
| **Sentry** | Error tracking, crash reporting. | `@sentry/nextjs` di frontend dan API routes. |
| **Pino + Vercel Logs** | Structured logging. | `pino` untuk log terstruktur, Vercel Logs untuk agregasi. |
| **Firebase Analytics** (opsional v1.1) | User behavior, retention. | Firebase SDK di frontend (jika disetujui, tanpa iklan). |

#### 3.2 Metrik yang Dipantau

| Metrik | Deskripsi | Target | Alert Jika |
|--------|-----------|--------|------------|
| **Request Rate** | Request/detik ke API. | Baseline 1-10 req/s. | > 50 req/s (lonjakan tidak wajar atau serangan). |
| **Error Rate** | Persentase response 4xx/5xx. | < 1% dari total request. | > 5% dalam 5 menit. |
| **P95 Latency** | Latency persentil 95 API response. | < 500ms. | > 1 detik dalam 5 menit. |
| **Database Connection Pool** | Koneksi aktif ke PostgreSQL. | < 80% pool size. | > 90% pool utilization. |
| **Memory Usage** | Penggunaan memori serverless function. | < 80% memory limit. | > 90% memory. |
| **Cold Start Duration** | Waktu inisialisasi function pertama kali. | < 1 detik. | > 3 detik. |

---

### 4. Alerting

#### 4.1 Level Alert

| Level | Deskripsi | Respon |
|-------|-----------|--------|
| **CRITICAL** | Aplikasi down, error rate > 10%, database tidak bisa diakses. | Notifikasi real-time (Slack/Telegram) + PagerDuty (jika ada). Response < 15 menit. |
| **WARNING** | Error rate > 5%, latency > 1s, memory > 80%. | Notifikasi ke channel monitoring. Response < 1 jam. |
| **INFO** | Cold start lambat, disk usage naik, traffic spike terdeteksi. | Notifikasi ringan, cek saat ada waktu. |

#### 4.2 Konfigurasi Alert (Sentry + Vercel)

| Alert | Trigger | Channel |
|-------|---------|---------|
| **API Error Spike** | Error rate > 5% dalam 5 menit. | Slack `#monitoring` |
| **Database Connection Failure** | Health check `/api/health/db` gagal 3x berturut-turut. | Slack `#critical` |
| **Production Deployment** | Setiap deployment production berhasil. | Slack `#deployments` |
| **New Critical Issue** | Sentry mendeteksi issue baru level `fatal` atau `error`. | Slack `#bugs` |

---

### 5. Backup & Disaster Recovery

#### 5.1 Database Backup (Supabase/PlanetScale)

| Atribut | Detail |
|---------|--------|
| **Backup Otomatis** | Supabase menyediakan backup harian (managed). PlanetScale memiliki fitur safe migrations. |
| **Backup Manual** | `pg_dump` dijadwalkan mingguan via GitHub Actions, disimpan di cloud storage. |
| **Retensi** | 7 hari untuk backup harian, 4 minggu untuk backup mingguan. |
| **Recovery Time Objective (RTO)** | < 1 jam untuk restore dari backup. |
| **Recovery Point Objective (RPO)** | < 24 jam (backup harian). |

#### 5.2 Disaster Recovery Plan

| Skenario | Tindakan |
|----------|----------|
| **Vercel down** | Tidak ada tindakan otomatis. Vercel memiliki SLA 99.99%. Status page: `vercel-status.com`. Komunikasikan ke pengguna via social media. |
| **Database corrupt** | 1. Hentikan traffic (maintenance mode). 2. Restore dari backup terbaru. 3. Verifikasi integritas data. 4. Aktifkan kembali. |
| **Firebase Auth down** | Login gagal untuk pengguna baru. Pengguna yang sudah login tetap bisa akses PWA offline. Firebase SLA 99.95%. |
| **Data breach** | 1. Rotasi semua kredensial. 2. Investigasi sumber breach. 3. Notifikasi pengguna terdampak sesuai regulasi. 4. Perbaiki kerentanan. |

---

### 6. Runbook

#### 6.1 Rutinitas Harian

| Waktu | Tindakan | Penanggung Jawab |
|-------|----------|-----------------|
| Pagi (09:00) | Cek dashboard monitoring (Vercel + Sentry). Verifikasi tidak ada error spike semalam. | DevOps / Developer |
| Sore (17:00) | Cek usage metrics. Catat jika ada anomali. | DevOps |

#### 6.2 Rutinitas Mingguan

| Hari | Tindakan |
|------|----------|
| Senin | Cek backup database berhasil. Verifikasi restore test (opsional). |
| Jumat | Review error log, prioritas bug fix untuk minggu depan. Cek dependency update (Dependabot). |

#### 6.3 Insiden: API Error Spike > 5%

1.  **Deteksi**: Alert dari Sentry/Slack.
2.  **Triage**: Cek Sentry untuk lihat stack trace. Identifikasi endpoint yang error.
3.  **Mitigasi**: Jika terkait deployment baru → rollback (lihat Release Plan). Jika terkait database → cek koneksi pool.
4.  **Resolusi**: Fix di branch baru, test, merge, deploy.
5.  **Postmortem**: Tulis ringkasan insiden di `docs/postmortem/YYYY-MM-DD.md`.

#### 6.4 Insiden: Aplikasi Tidak Bisa Diakses

1.  **Cek Vercel Status**: `vercel-status.com`.
2.  **Cek Domain**: Pastikan DNS resolver berfungsi.
3.  **Cek Log**: Vercel Logs untuk error function runtime.
4.  **Rollback**: Jika deployment terakhir mencurigakan, rollback ke versi sebelumnya.
5.  **Komunikasi**: Jika downtime > 5 menit, beri tahu pengguna (via social media atau halaman maintenance).

---

### 7. Maintenance Mode

| Atribut | Detail |
|---------|--------|
| **Aktivasi** | Set environment variable `MAINTENANCE_MODE=true` di Vercel. |
| **Perilaku** | Semua request API mengembalikan 503 + `{ message: "SAYA BACA sedang istirahat sebentar. Kembali lagi ya!" }` |
| **Pengecualian** | `/api/health` tetap bisa diakses untuk monitoring. |
| **Durasi Maks** | < 30 menit. |

---

### 8. Checklist Go-Live

Sebelum rilis production pertama, pastikan:

| No | Item | Status |
|----|------|--------|
| 1 | Environment variable production di-set di Vercel. | ☐ |
| 2 | Database migration production berhasil. | ☐ |
| 3 | Health check endpoint berfungsi. | ☐ |
| 4 | Sentry SDK terpasang dan menerima error. | ☐ |
| 5 | Alert Slack terkonfigurasi. | ☐ |
| 6 | Backup database otomatis aktif. | ☐ |
| 7 | Feature flags sesuai (Must ON, Should OFF jika belum siap). | ☐ |
| 8 | PWA manifest valid, Lighthouse score ≥ 90. | ☐ |
| 9 | Rollback plan diuji (test rollback). | ☐ |
| 10 | Runbook dibagikan ke tim. | ☐ |