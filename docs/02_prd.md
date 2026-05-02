# 02_prd.md

## Product Requirements Document (PRD): SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen
Dokumen ini menjabarkan seluruh kebutuhan fungsional dan non-fungsional dari **SAYA BACA** untuk rilis MVP (Minimum Viable Product). Semua requirement ditulis dalam format User Story (US) dan diberi prioritas MoSCoW. Dokumen ini **hanya** membahas WHAT (apa yang harus dilakukan sistem), bukan HOW (bagaimana implementasinya).

---

### 2. Daftar User Stories (Must - MVP)

#### 2.1 Autentikasi & Manajemen Profil

| Story ID | Prioritas | User Story | Acceptance Criteria ID |
|----------|-----------|------------|------------------------|
| **US-001** | Must | Sebagai **orang tua**, saya ingin login menggunakan akun Google atau secara anonim agar saya bisa mengakses aplikasi tanpa hambatan. | AC-001, AC-002, AC-003 |
| **US-002** | Must | Sebagai **orang tua**, saya ingin membuat dan mengelola beberapa profil anak dalam satu akun agar setiap anak memiliki progress belajarnya sendiri. | AC-004, AC-005 |
| **US-003** | Must | Sebagai **orang tua**, saya ingin setiap aksi krusial (menambah teman, chat, akses pengaturan) dilindungi PIN 4 digit agar anak tidak bisa melakukan aksi tersebut sendirian. | AC-006, AC-007 |
| **US-004** | Should | Sebagai **orang tua**, saya ingin bisa menautkan akun anonim ke akun Google agar data belajar anak tidak hilang. | AC-008 |

#### 2.2 Modul Belajar & Kuis

| Story ID | Prioritas | User Story | Acceptance Criteria ID |
|----------|-----------|------------|------------------------|
| **US-010** | Must | Sebagai **anak**, saya ingin belajar mengenal huruf abjad dari A sampai Z dengan tampilan visual dan suara yang jelas agar saya bisa mengingat bentuk dan bunyi setiap huruf. | AC-010, AC-011 |
| **US-011** | Must | Sebagai **anak**, saya ingin mengikuti kuis "Cari Huruf yang Disebut" untuk menguji pengetahuan saya tentang abjad. | AC-012, AC-013 |
| **US-012** | Must | Sebagai **anak**, saya ingin belajar menggabungkan konsonan dan vokal menjadi suku kata agar saya bisa membaca kata sederhana. | AC-014, AC-015 |
| **US-013** | Must | Sebagai **anak**, saya ingin mengikuti kuis "Susun Suku Kata" untuk menguji kemampuan saya menyusun suku kata menjadi kata yang benar. | AC-016, AC-017 |
| **US-014** | Must | Sebagai **anak**, saya ingin belajar menyusun suku kata menjadi kalimat sederhana agar saya bisa membaca rangkaian kata. | AC-018, AC-019 |
| **US-015** | Must | Sebagai **anak**, saya ingin mengikuti kuis "Susun Kalimat" untuk menguji kemampuan saya merangkai kata. | AC-020, AC-021 |

#### 2.3 Gamifikasi & Reward

| Story ID | Prioritas | User Story | Acceptance Criteria ID |
|----------|-----------|------------|------------------------|
| **US-020** | Must | Sebagai **anak**, saya ingin mendapatkan XP setiap kali saya menjawab benar atau menyelesaikan modul agar level saya naik. | AC-030, AC-031 |
| **US-021** | Must | Sebagai **anak**, saya ingin melihat skor saya dalam bentuk bintang (1-5) setelah menyelesaikan kuis agar saya tahu seberapa baik hasil saya. | AC-032 |
| **US-022** | Must | Sebagai **anak**, saya ingin mendapatkan "Streak" jika saya belajar setiap hari berturut-turut agar saya termotivasi untuk kembali. | AC-033, AC-034 |
| **US-023** | Should | Sebagai **anak**, saya ingin mengoleksi stiker dan badge digital sebagai reward atas pencapaian tertentu. | AC-035, AC-036 |

#### 2.4 Engine Penyedia Konten & Soal

| Story ID | Prioritas | User Story | Acceptance Criteria ID |
|----------|-----------|------------|------------------------|
| **US-030** | Must | Sebagai **admin**, saya ingin memasukkan data bank kata dan kalimat (beserta level, kategori, emoji, dan audio) melalui satu sumber terpusat agar semua modul bisa menggunakannya. | AC-040, AC-041 |
| **US-031** | Must | Sebagai **sistem**, saya ingin sebuah Quiz Engine yang bisa menghasilkan soal latihan dan kuis secara otomatis berdasarkan data dari Bank Data Engine agar tidak perlu membuat soal manual. | AC-042, AC-043, AC-044 |
| **US-032** | Must | Sebagai **sistem**, saya ingin sebuah Masking Engine yang bisa menyembunyikan bagian tertentu dari kata atau kalimat untuk dijadikan soal tebak-tebakan. | AC-045, AC-046 |
| **US-033** | Must | Sebagai **sistem**, saya ingin sebuah Result Engine yang bisa memeriksa jawaban anak, menghitung skor bintang dan XP, serta memberikan umpan balik yang sesuai. | AC-047, AC-048 |

#### 2.5 Pengalaman & Kontrol Belajar

| Story ID | Prioritas | User Story | Acceptance Criteria ID |
|----------|-----------|------------|------------------------|
| **US-040** | Must | Sebagai **orang tua**, saya ingin mengatur timer belajar (durasi maksimal) agar anak tidak bermain terlalu lama. | AC-050, AC-051 |
| **US-041** | Must | Sebagai **orang tua**, saya ingin mengubah skala teks (kecil, sedang, besar) agar sesuai dengan kemampuan visual anak saya. | AC-052 |
| **US-042** | Must | Sebagai **orang tua**, saya bisa mematikan atau menyalakan suara Text-to-Speech (TTS) sesuai kebutuhan belajar anak. | AC-053 |
| **US-043** | Must | Sebagai **anak**, saya ingin setiap soal dan tombol interaktif mengeluarkan suara yang jelas untuk memandu saya. | AC-054, AC-055 |
| **US-044** | Must | Sebagai **orang tua**, saya ingin melihat dashboard yang menunjukkan modul yang sudah diselesaikan anak, skor rata-rata, dan total waktu belajar. | AC-056, AC-057 |

---

### 3. Daftar User Stories (Should & Could - Rilis Selanjutnya)

| Story ID | Prioritas | User Story |
|----------|-----------|------------|
| **US-050** | Should | Sebagai **anak**, saya ingin melihat papan peringkat global agar saya bisa membandingkan XP saya dengan anak lain. |
| **US-051** | Should | Sebagai **anak**, saya ingin bermain mini games berbasis kata (seperti drag-and-drop) agar belajar terasa seperti bermain. |
| **US-052** | Could | Sebagai **anak**, saya ingin menambah teman dan mengobrol (dengan persetujuan PIN orang tua) agar bisa belajar bersama. |
| **US-053** | Could | Sebagai **orang tua**, saya ingin menerima notifikasi ringkasan mingguan tentang perkembangan belajar anak. |
| **US-054** | Should | Sebagai **admin**, saya ingin dashboard basic untuk mengelola bank data dan melihat statistik penggunaan. |

---

### 4. Persyaratan Non-Fungsional

| ID | Aspek | Requirement | Prioritas |
|----|-------|-------------|-----------|
| **NFR-001** | Performa | UI harus merender soal dalam <500ms setelah data diterima, tanpa flicker. | Must |
| **NFR-002** | Offline | Konten yang sudah diunduh harus tetap bisa diakses tanpa koneksi internet. | Must |
| **NFR-003** | Keamanan | Semua transmisi data harus melalui HTTPS, data pribadi anak dienkripsi. | Must |
| **NFR-004** | Aksesibilitas | Target skor Lighthouse minimal 90 untuk Performa, Aksesibilitas, dan PWA. | Must |
| **NFR-005** | Skalabilitas | Sistem harus bisa menambah modul belajar baru tanpa mengubah kode inti (engine). | Must |
| **NFR-006** | UX | Durasi interaksi maksimal 3 langkah dari halaman utama ke konten belajar. | Must |