# 06_user_stories.md

## User Stories: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Dokumen ini mendaftarkan seluruh User Story (US) untuk SAYA BACA secara lengkap. Setiap story memiliki ID unik, prioritas MoSCoW, persona target, dan Acceptance Criteria yang terkait. Dokumen ini menjadi kontrak untuk Agent Coder — setiap story harus bisa diuji melalui Acceptance Criteria yang tercantum.

---

### 2. Struktur ID

- **US-0XX** : Autentikasi & Manajemen Profil
- **US-1XX** : Modul Belajar & Kuis
- **US-2XX** : Gamifikasi & Reward
- **US-3XX** : Engine Konten & Soal
- **US-4XX** : Kontrol Orang Tua & Dashboard
- **US-5XX** : Sosial & Mini Games (Should/Could)
- **US-6XX** : Admin Panel (Should/Could)

---

### 3. Daftar User Stories — Must (MVP)

#### 3.1 Autentikasi & Manajemen Profil

| Story ID | Prioritas | Persona | User Story | Acceptance Criteria |
|----------|-----------|---------|------------|---------------------|
| **US-001** | Must | Orang Tua | Sebagai **orang tua**, saya ingin login menggunakan akun Google saya agar saya bisa mengakses aplikasi dengan cepat tanpa mengingat password baru. | AC-001 |
| **US-002** | Must | Orang Tua | Sebagai **orang tua**, saya ingin bisa langsung menggunakan aplikasi tanpa login (mode anonim) agar saya bisa mencoba SAYA BACA tanpa hambatan. | AC-002 |
| **US-003** | Must | Orang Tua | Sebagai **orang tua**, saya ingin membuat beberapa profil anak dalam satu akun agar setiap anak memiliki progress, XP, dan riwayat belajar yang terpisah. | AC-003, AC-004 |
| **US-004** | Must | Orang Tua | Sebagai **orang tua**, saya ingin menghapus profil anak yang sudah tidak digunakan agar daftar profil tetap rapi. | AC-005 |
| **US-005** | Must | Orang Tua | Sebagai **orang tua**, saya ingin setiap aksi krusial (membuka menu orang tua, menambah teman, chat) dilindungi PIN 4 digit agar anak saya tidak bisa mengaksesnya tanpa izin. | AC-006, AC-007, AC-008 |
| **US-006** | Should | Orang Tua | Sebagai **orang tua** yang awalnya login anonim, saya ingin bisa menautkan akun anonim saya ke akun Google agar data belajar anak tidak hilang jika saya ganti perangkat. | AC-009 |

#### 3.2 Modul Belajar & Kuis

| Story ID | Prioritas | Persona | User Story | Acceptance Criteria |
|----------|-----------|---------|------------|---------------------|
| **US-101** | Must | Anak | Sebagai **anak**, saya ingin melihat halaman home yang menyambut saya dengan nama saya dan menampilkan pelajaran hari ini agar saya tahu harus mulai dari mana. | AC-101 |
| **US-102** | Must | Anak | Sebagai **anak**, saya ingin belajar mengenal huruf abjad A-Z melalui halaman belajar yang menampilkan huruf besar dengan suara yang jelas agar saya bisa mengingat bentuk dan bunyinya. | AC-102, AC-103 |
| **US-103** | Must | Anak | Sebagai **anak**, saya ingin mengikuti kuis "Cari Huruf yang Disebut" di mana saya mendengar suara menyebutkan satu huruf lalu memilih huruf yang benar dari beberapa pilihan agar saya bisa menguji ingatan saya. | AC-104, AC-105 |
| **US-104** | Must | Anak | Sebagai **anak**, saya ingin belajar suku kata (konsonan+vokal: ba bi bu be bo, ca ci cu ce co, dst.) melalui tabel suku kata interaktif dengan suara agar saya bisa membaca kata sederhana. | AC-106, AC-107 |
| **US-105** | Must | Anak | Sebagai **anak**, saya ingin mengikuti kuis "Susun Suku Kata" di mana saya mendengar sebuah kata lalu menyusun suku kata yang tepat dari pilihan yang tersedia agar saya bisa merangkai kata. | AC-108, AC-109 |
| **US-106** | Must | Anak | Sebagai **anak**, saya ingin belajar menyusun kalimat sederhana (2 kata: subjek+predikat) melalui halaman "Ayo Membaca" yang menampilkan suku kata dan kata utuh agar saya bisa membaca rangkaian kata. | AC-110, AC-111 |
| **US-107** | Must | Anak | Sebagai **anak**, saya ingin mengikuti kuis "Susun Kalimat" di mana saya mendengar sebuah kalimat pendek lalu menyusun kata-kata dalam urutan yang benar agar saya bisa menguji pemahaman membaca saya. | AC-112, AC-113 |
| **US-108** | Must | Anak | Sebagai **anak**, saya ingin modul berikutnya terkunci sampai saya menyelesaikan modul sebelumnya agar saya belajar secara bertahap dan tidak tersesat. | AC-114 |

#### 3.3 Gamifikasi & Reward

| Story ID | Prioritas | Persona | User Story | Acceptance Criteria |
|----------|-----------|---------|------------|---------------------|
| **US-201** | Must | Anak | Sebagai **anak**, saya ingin mendapatkan XP setiap kali saya menjawab benar atau menyelesaikan modul agar level saya naik dan saya merasa maju. | AC-201, AC-202 |
| **US-202** | Must | Anak | Sebagai **anak**, saya ingin melihat nilai saya dalam bentuk bintang (1-5) setelah menyelesaikan kuis agar saya tahu seberapa baik hasil saya dengan cara yang mudah dimengerti. | AC-203 |
| **US-203** | Must | Anak | Sebagai **anak**, saya ingin mendapatkan "Streak" (api/hari berturut-turut) jika saya belajar setiap hari agar saya semangat untuk kembali besok. | AC-204, AC-205 |
| **US-204** | Should | Anak | Sebagai **anak**, saya ingin mengoleksi stiker digital setelah mencapai target tertentu (misal: menyelesaikan 5 kuis) agar saya punya koleksi yang bisa dibanggakan. | AC-206 |
| **US-205** | Should | Anak | Sebagai **anak**, saya ingin mendapatkan badge spesial (misal: "Master Abjad", "Raja Suku Kata") setelah menyelesaikan seluruh modul dalam satu kategori agar saya merasa prestasi saya diakui. | AC-207 |

#### 3.4 Engine Konten & Soal

| Story ID | Prioritas | Persona | User Story | Acceptance Criteria |
|----------|-----------|---------|------------|---------------------|
| **US-301** | Must | Admin | Sebagai **admin**, saya ingin memasukkan data bank kata melalui form yang menerima kata, level kesulitan (1-5), kategori, dan emoji terkait agar semua modul bisa menggunakan data ini. | AC-301, AC-302 |
| **US-302** | Must | Admin | Sebagai **admin**, saya ingin memasukkan data bank kalimat melalui form yang menerima kalimat utuh, level kesulitan, dan kategori agar modul "Merakit Kalimat" bisa menggunakannya. | AC-303 |
| **US-303** | Must | Sistem | Sebagai **sistem**, saya ingin sebuah Quiz Engine yang bisa mengambil data dari Bank Data Engine, lalu menghasilkan soal lengkap beserta jawaban benar dan pilihan distractor secara otomatis sesuai aturan modul yang meminta. | AC-304, AC-305, AC-306 |
| **US-304** | Must | Sistem | Sebagai **sistem**, saya ingin sebuah Masking Engine yang bisa menyembunyikan bagian tertentu dari kata atau kalimat (huruf pertama, suku kata, seluruh kata) berdasarkan aturan dari modul agar soal bisa bervariasi tanpa membuat data manual. | AC-307, AC-308 |
| **US-305** | Must | Sistem | Sebagai **sistem**, saya ingin sebuah Result Engine yang bisa membandingkan jawaban anak dengan jawaban benar, menghitung skor bintang (1-5) dan XP, serta menentukan apakah anak lulus atau perlu mengulang, semuanya berdasarkan aturan dari modul. | AC-309, AC-310 |
| **US-306** | Must | Sistem | Sebagai **sistem**, saya ingin semua data soal sudah terproses (matang) sebelum ditampilkan ke UI agar anak tidak melihat flicker atau loading saat bermain. | AC-311 |

#### 3.5 Kontrol Orang Tua & Dashboard

| Story ID | Prioritas | Persona | User Story | Acceptance Criteria |
|----------|-----------|---------|------------|---------------------|
| **US-401** | Must | Orang Tua | Sebagai **orang tua**, saya ingin mengatur timer belajar (pilihan: 20/30/45/60 menit) untuk setiap profil anak agar screen time anak tetap terkendali. | AC-401, AC-402 |
| **US-402** | Must | Orang Tua | Sebagai **orang tua**, saya ingin mengubah skala teks (kecil/sedang/besar) yang berlaku di seluruh aplikasi untuk anak agar sesuai dengan kemampuan visual anak saya. | AC-403 |
| **US-403** | Must | Orang Tua | Sebagai **orang tua**, saya ingin menyalakan atau mematikan suara Text-to-Speech (TTS) agar sesuai dengan situasi belajar anak (misal: mute saat di tempat umum). | AC-404 |
| **US-404** | Must | Orang Tua | Sebagai **orang tua**, saya ingin melihat dashboard ringkasan belajar anak yang mencakup: modul yang sudah diselesaikan, skor rata-rata bintang, total XP, total waktu belajar minggu ini, dan streak hari ini. | AC-405, AC-406 |
| **US-405** | Should | Orang Tua | Sebagai **orang tua**, saya ingin melihat detail per modul: huruf/kata mana yang sudah dikuasai anak dan mana yang masih sering salah agar saya bisa membantu belajar di rumah. | AC-407 |
| **US-406** | Should | Orang Tua | Sebagai **orang tua**, saya ingin mengubah font family (termasuk font ramah disleksia), mengaktifkan uppercase-only, dan menyembunyikan hint soal sebagai bagian dari Text Control lanjutan. | AC-408 |

#### 3.6 PWA & Offline

| Story ID | Prioritas | Persona | User Story | Acceptance Criteria |
|----------|-----------|---------|------------|---------------------|
| **US-501** | Must | Semua | Sebagai **pengguna**, saya ingin aplikasi bisa diinstal di homescreen smartphone saya (PWA) agar saya bisa membukanya seperti aplikasi biasa tanpa membuka browser. | AC-501 |
| **US-502** | Must | Semua | Sebagai **pengguna**, saya ingin konten belajar yang sudah pernah saya buka tetap bisa diakses tanpa koneksi internet agar anak tetap bisa belajar di mana saja. | AC-502 |

---

### 4. Daftar User Stories — Should (v1.1)

| Story ID | Prioritas | Persona | User Story | Acceptance Criteria |
|----------|-----------|---------|------------|---------------------|
| **US-601** | Should | Anak | Sebagai **anak**, saya ingin melihat papan peringkat global yang menampilkan XP tertinggi agar saya termotivasi untuk belajar lebih banyak. | AC-601 |
| **US-602** | Should | Anak | Sebagai **anak**, saya ingin melihat papan peringkat misi harian yang reset setiap hari agar saya punya kesempatan baru setiap hari. | AC-602 |
| **US-603** | Should | Anak | Sebagai **anak**, saya ingin bermain mini game berbasis kata (drag-and-drop, balon kata) yang menggunakan data dari engine yang sama agar belajar terasa seperti bermain. | AC-603 |
| **US-604** | Should | Admin | Sebagai **admin**, saya ingin mengakses dashboard basic untuk melihat statistik penggunaan (total pengguna, modul paling populer, rata-rata skor) dan mengelola bank data (CRUD kata dan kalimat). | AC-604, AC-605 |

---

### 5. Daftar User Stories — Could (v1.2+)

| Story ID | Prioritas | Persona | User Story | Acceptance Criteria |
|----------|-----------|---------|------------|---------------------|
| **US-701** | Could | Anak | Sebagai **anak**, saya ingin menambah teman (dengan persetujuan PIN orang tua) agar saya bisa belajar bersama. | AC-701 |
| **US-702** | Could | Anak | Sebagai **anak**, saya ingin mengobrol dengan teman yang sudah disetujui orang tua (chat terbatas: stiker dan pesan template) agar tetap aman. | AC-702 |
| **US-703** | Could | Anak | Sebagai **anak**, saya ingin bermain mini game multiplayer melawan teman secara online agar lebih seru. | AC-703 |
| **US-704** | Could | Orang Tua | Sebagai **orang tua**, saya ingin menerima notifikasi mingguan (push/email) yang berisi ringkasan perkembangan belajar anak agar saya tetap terinformasi. | AC-704 |
| **US-705** | Could | Orang Tua | Sebagai **orang tua**, saya ingin memberikan izin pertemanan dan chat melalui PIN agar saya tetap memegang kendali penuh. | AC-705 |
| **US-706** | Could | Admin | Sebagai **admin**, saya ingin dashboard advanced dengan monitoring real-time, reporting custom, dan analitik prediktif agar saya bisa mengambil keputusan berdasarkan data. | AC-706 |

---

### 6. Ringkasan Jumlah Story

| Prioritas | Jumlah Story |
|-----------|--------------|
| **Must** | 23 story |
| **Should** | 10 story |
| **Could** | 6 story |
| **Total** | 39 story |