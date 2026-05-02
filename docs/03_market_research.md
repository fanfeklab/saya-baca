# 03_market_research.md

## Market Research: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Riset

- Memetakan lanskap kompetitif aplikasi edukasi membaca anak di Indonesia (usia 3-6 tahun).
- Mengidentifikasi celah pasar yang dapat diisi SAYA BACA.
- Menyediakan dasar strategis untuk positioning produk.

---

### 2. Lanskap Pasar

#### 2.1 Kategori Kompetitor

| Tipe | Deskripsi | Contoh |
|------|-----------|--------|
| **Kompetitor Langsung** | Aplikasi khusus belajar membaca untuk anak PAUD/TK dalam Bahasa Indonesia. | Marbel Membaca, Ayo Belajar Membaca, Belajar Membaca Lancar |
| **Kompetitor Tidak Langsung (Lokal)** | Aplikasi edukasi anak umum yang mencakup literasi. | Marbel (Educa Studio), Mombi, Ruangguru (modul anak), Cikal Aksara |
| **Kompetitor Tidak Langsung (Global)** | Aplikasi belajar membaca global yang mungkin digunakan orang tua Indonesia. | Duolingo ABC, Khan Academy Kids, Starfall, ABCmouse, Homer |
| **Substitusi Non-Digital** | Metode belajar tradisional yang masih dominan. | Buku fisik, flashcard, poster abjad, les privat, video YouTube |

#### 2.2 Analisis Kompetitor Utama

| Kompetitor | Kekuatan | Kelemahan |
|------------|----------|-----------|
| **Marbel (Educa Studio)** | Brand lokal terkuat, banyak modul, suara natural Bahasa Indonesia, konten bervariasi, gratis dengan iklan. | Iklan sangat mengganggu (anak klik tidak sengaja), UI padat, tidak ada kontrol orang tua mendalam, banyak modul berbayar. |
| **Aplikasi "Belajar Membaca" independen** | Ringan, fokus pada satu hal, sering gratis. | Kualitas audio rendah, UI tidak konsisten, tidak ada gamifikasi mendalam, konten terbatas, tidak ada PWA. |
| **Khan Academy Kids** | Gratis tanpa iklan, UX kelas dunia, konten kurikulum global, personalisasi, dashboard orang tua solid. | Bahasa Inggris (tidak ada Bahasa Indonesia), konten tidak relevan dengan kurikulum lokal, perlu koneksi internet stabil. |
| **Duolingo ABC** | Gamifikasi adiktif, audio profesional, progress tracking, gratis. | Bahasa Inggris saja, fokus pada alphabet latin untuk penutur asli, tidak cocok untuk belajar membaca kata Bahasa Indonesia. |
| **Starfall** | Teruji puluhan tahun, struktur belajar jelas. | UI jadul, akses penuh berbayar, hanya Bahasa Inggris. |
| **YouTube Kids (konten belajar membaca)** | Gratis, banyak kreator lokal, anak familiar dengan antarmuka. | Tidak ada gamifikasi/XP/leaderboard, tidak ada latihan interaktif (hanya menonton), tidak ada dashboard orang tua, pasif. |

---

### 3. Celah Pasar & Positioning SAYA BACA

| Faktor | Celah Pasar | Positioning SAYA BACA |
|--------|-------------|----------------------|
| **Gratis & Tanpa Iklan** | Khan Academy Kids gratis tanpa iklan, tapi tidak berbahasa Indonesia. Marbel berbahasa Indonesia tapi penuh iklan dan berbayar. | **Satu-satunya aplikasi belajar membaca gratis, tanpa iklan, berbahasa Indonesia.** |
| **Kurikulum Lokal** | Aplikasi global tidak cocok dengan pola belajar membaca Indonesia (suku kata). Aplikasi lokal sering tidak berpedoman kurikulum. | Materi belajar berbasis buku PAUD/TK nasional, mencakup pola baca "ba bi bu be bo" khas Indonesia. |
| **Kontrol Orang Tua** | Kebanyakan aplikasi anak tidak memiliki fitur PIN, timer, dan dashboard analitik. | PIN wajib, timer belajar, dashboard kemajuan, text control. |
| **Arsitektur Konten** | Aplikasi lokal biasanya hardcode materi. Menambah konten baru harus update aplikasi. | 4 Engine (Bank Data, Quiz, Masking, Result) + Arsitektur Microkernel. Admin panel memungkinkan penambahan konten tanpa redeploy. |
| **PWA & Offline** | Banyak aplikasi hanya native Android atau butuh internet terus. | PWA, installable, offline-ready. |
| **Gamifikasi Kompetitif** | Aplikasi lokal minim leaderboard dan streak. | XP, streak harian, leaderboard, reward stiker/badge, mini games. |

---

### 4. Analisis SWOT

| Kekuatan (Strengths) | Kelemahan (Weaknesses) |
|-----------------------|-------------------------|
| Gratis tanpa iklan, fokus total pada pembelajaran. | Belum ada brand awareness. |
| Arsitektur microkernel — konten mudah ditambah tanpa mengubah kode inti. | Tim kecil, pengembangan dan konten tergantung sumber daya internal. |
| Kontrol orang tua lengkap. | Tidak ada aplikasi native (hanya PWA), bisa kurang familiar bagi sebagian pengguna. |
| Kurikulum lokal Bahasa Indonesia. | Konten awal hanya 3 modul, mungkin kurang variatif bagi anak yang sudah mahir. |
| PWA offline-ready. | Ketergantungan pada Firebase (vendor lock-in). |

| Peluang (Opportunities) | Ancaman (Threats) |
|--------------------------|--------------------|
| Pasar PAUD/TK Indonesia sangat besar, penetrasi smartphone tinggi. | Marbel atau Ruangguru bisa meluncurkan produk serupa gratis dengan modal brand besar. |
| Kurangnya aplikasi belajar membaca berkualitas tinggi yang gratis. | Munculnya aplikasi open-source serupa yang dikembangkan komunitas. |
| Potensi kerjasama dengan Kemendikbud atau penerbit buku. | Kebijakan Google Play/regulasi baru tentang aplikasi anak. |
| Komunitas orang tua yang aktif mencari alternatif screen time edukatif. | Perubahan algoritma Firebase atau kebijakan harga layanan cloud. |

---

### 5. Kesimpulan Strategis

Pasar aplikasi belajar membaca anak di Indonesia masih didominasi oleh produk berbayar atau produk gratis dengan iklan yang mengganggu. Produk global berkualitas seperti Khan Academy Kids tidak tersedia dalam Bahasa Indonesia dan tidak mengikuti kurikulum lokal.

**SAYA BACA** menempati posisi unik yang belum terisi:

> **Aplikasi belajar membaca gratis, tanpa iklan, berbahasa Indonesia, dengan gamifikasi modern, kontrol orang tua lengkap, dan arsitektur konten yang siap berkembang.**

Keunggulan arsitektur microkernel dan 4 Engine menjadi pembeda fundamental yang tidak dimiliki kompetitor lokal mana pun saat ini. Kemampuan menambah modul dan konten tanpa menyentuh kode inti memungkinkan SAYA BACA untuk tumbuh secara berkelanjutan seiring terkumpulnya materi dari kurikulum nasional.