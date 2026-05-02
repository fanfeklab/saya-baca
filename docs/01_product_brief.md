# 01_product_brief.md

## Product Brief: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | **SAYA BACA** |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Ringkasan Eksekutif
**SAYA BACA** adalah Progressive Web Application (PWA) pembelajaran literasi untuk anak usia PAUD dan TK (3-6 tahun). Aplikasi ini menyediakan modul belajar interaktif, latihan soal, dan kuis gamifikasi untuk membantu anak mengenal huruf, suku kata, dan kalimat dalam Bahasa Indonesia. Melalui sistem XP, bintang, dan reward digital, SAYA BACA bertujuan membangun kebiasaan membaca yang menyenangkan.

Orang tua memiliki kontrol penuh melalui PIN keamanan, dapat memantau perkembangan belajar anak di dashboard analitik, serta mengelola pengalaman belajar seperti timer dan ukuran teks. Aplikasi ini 100% gratis, tanpa iklan, dan akan terus dikembangkan dengan modul-modul baru.

---

### 2. Target Pengguna

| Persona | Deskripsi |
|---------|-----------|
| **Anak PAUD/TK (3-6 tahun)** | Pengguna akhir yang belajar membaca melalui modul interaktif dan kuis sederhana. Membutuhkan UX yang sangat sederhana, umpan balik visual/audio yang kaya, dan navigasi intuitif. |
| **Orang Tua / Wali** | Akun pengelola. Membuat profil anak, mengatur timer belajar, melihat dashboard analitik. Bertindak sebagai "gerbang keamanan" untuk fitur sosial dan pengaturan sensitif. |

> **Catatan**: Tidak ada persona guru/sekolah untuk fase awal. Aplikasi digunakan secara pribadi antara orang tua dan anak.

---

### 3. Masalah yang Dipecahkan

| Masalah | Solusi SAYA BACA |
|---------|------------------|
| **Konten belajar monoton** — Buku fisik kurang interaktif, anak mudah bosan. | Modul belajar interaktif dengan audio (TTS), animasi, dan gamifikasi. |
| **Keterlibatan orang tua rendah** — Sulit memantau kemajuan belajar anak. | Dashboard analitik harian/mingguan yang mudah diakses. |
| **Keamanan fitur sosial anak** — Kekhawatiran interaksi tidak pantas. | PIN wajib untuk semua aksi krusial (tambah teman, chat, pengaturan). |
| **Akses offline terbatas** — Tidak semua keluarga punya internet stabil. | PWA dengan offline mode untuk konten yang sudah diunduh. |

---

### 4. Proposisi Nilai Unik

> **Belajar Membaca Jadi Petualangan Seru, Aman, dan Gratis.**
>
> *"SAYA BACA" menggabungkan metode belajar dari kurikulum PAUD/TK nasional dengan gamifikasi khas game anak modern. Setiap huruf yang dikenali, setiap kata yang disusun, adalah langkah menuju level baru dan koleksi reward. Semua gratis, tanpa iklan, dalam genggaman anak dan pantauan orang tua.*

---

### 5. Fitur Utama (MoSCoW)

#### ✅ Must (MVP)
- 4 Engine Inti: Bank Data, Quiz, Masking, Result
- 3 Modul Belajar: Mengenal Abjad, Huruf Vokal, Merakit Kalimat
- Login Firebase (Google + Anonim) & Multi-Profil Anak
- PIN Orang Tua untuk aksi krusial
- XP, Skor, Bintang (1-5)
- Audio Feedback (TTS & SFX)
- Timer Belajar (diatur orang tua)
- Streak Harian
- Dashboard Orang Tua (basic)
- Text Control (basic)
- PWA (installable, offline-ready)

#### 🔶 Should (v1.1)
- Global Leaderboard
- Mini Games (single player)
- Reward Visual (stiker, badge)
- Dashboard Analitik Lanjutan
- Text Control Lanjutan
- Admin Panel Basic

#### 🔷 Could (v1.2+)
- Chat & Match dengan Teman
- Mini Games (multiplayer)
- Notifikasi Orang Tua
- Avatar Kustom
- Admin Panel Advanced

#### ❌ Won't
- Dashboard Guru/Sekolah
- Aplikasi Native (selain PWA)
- Multi-bahasa
- Pembayaran/Subscription

---

### 6. Risiko Utama & Mitigasi

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| **Orang tua tidak mendampingi** | Anak kehilangan arah, belajar tidak efektif. | Timer belajar default, notifikasi ke orang tua, UX yang memandu anak. |
| **UX terlalu rumit** | Anak frustasi, orang tua enggan membuka kembali. | Uji coba dengan anak usia target, desain "Dumb UI", tombol besar, audio jelas. |
| **Konten kurang variatif** | Anak bosan, churn rate tinggi. | Arsitektur plug-in untuk tambah modul mudah, admin panel untuk konten baru. |
| **Keamanan data anak** | Kebocoran data pribadi anak. | Enkripsi, autentikasi ketat, PIN untuk aksi sensitif, comply COPPA/GDPR-like. |

---

### 7. Metrik Keberhasilan

| Metrik | Target |
|--------|--------|
| **Retensi Hari ke-7** | ≥ 60% anak kembali dalam 7 hari. |
| **Penyelesaian Modul Pertama** | ≥ 80% anak menyelesaikan modul "Mengenal Abjad". |
| **Keterlibatan Orang Tua** | ≥ 50% orang tua cek dashboard minimal 1x/minggu. |
| **Waktu Belajar Rata-rata** | 20-30 menit/sesi. |

---

### 8. Batasan Proyek

- **Hanya PWA**: Tidak native Android/iOS.
- **Hanya Bahasa Indonesia**: Tidak ada rencana multi-bahasa.
- **Gratis**: Tidak ada monetisasi, tidak ada iklan.
- **B2C**: Tidak ada fitur guru/kelas/sekolah.