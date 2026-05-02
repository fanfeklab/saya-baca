# 07_acceptance_criteria.md

## Acceptance Criteria: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Dokumen ini mendaftarkan seluruh Acceptance Criteria (AC) untuk SAYA BACA. Setiap AC memiliki ID unik `AC-XXX`, mengacu ke User Story terkait (`US-XXX`), dan ditulis dalam format terukur yang bisa langsung dijadikan dasar pengujian (test case) oleh QA Agent dan kontrak implementasi oleh Agent Coder.

---

### 2. Struktur ID

- **AC-0XX** : Autentikasi & Manajemen Profil
- **AC-1XX** : Modul Belajar & Kuis
- **AC-2XX** : Gamifikasi & Reward
- **AC-3XX** : Engine Konten & Soal
- **AC-4XX** : Kontrol Orang Tua & Dashboard
- **AC-5XX** : PWA & Offline
- **AC-6XX** : Sosial & Mini Games (Should)
- **AC-7XX** : Admin Panel & Lanjutan (Should/Could)

---

### 3. Acceptance Criteria — Must (MVP)

#### 3.1 Autentikasi & Manajemen Profil

| AC ID | User Story | Kriteria |
|-------|-----------|----------|
| **AC-001** | US-001 | **Given** orang tua membuka halaman login, **when** mereka mengklik "Masuk dengan Google", **then** popup Google sign-in muncul. Setelah berhasil, mereka langsung masuk ke Home tanpa langkah tambahan. |
| **AC-002** | US-002 | **Given** orang tua membuka halaman login, **when** mereka mengklik "Langsung Belajar" (Anonim), **then** sesi anonim langsung dibuat, tidak ada form apapun, dan mereka langsung masuk ke Home. |
| **AC-003** | US-003 | **Given** orang tua sudah login, **when** mereka mengklik "Tambah Profil Anak", **then** form berisi input nama (teks pendek) dan 6 pilihan avatar muncul. Profil baru tersimpan dan muncul di daftar profil. |
| **AC-004** | US-003 | **Given** orang tua memiliki 2 profil anak, **when** mereka berganti profil, **then** seluruh data yang ditampilkan (progress, XP, streak) hanya milik profil yang aktif. Tidak ada campur data antar profil. |
| **AC-005** | US-004 | **Given** orang tua memiliki profil anak yang ingin dihapus, **when** mereka mengklik "Hapus Profil" dan mengonfirmasi, **then** profil beserta seluruh data progressnya terhapus permanen. Profil lain tidak terpengaruh. |
| **AC-006** | US-005 | **Given** orang tua membuat PIN 4 digit pertama kali, **when** mereka input 4 digit dan konfirmasi ulang, **then** PIN tersimpan. Setiap akses ke menu Orang Tua sekarang wajib memasukkan PIN ini. |
| **AC-007** | US-005 | **Given** PIN sudah disetel, **when** seseorang mengklik ikon gembok "Orang Tua" di Home, **then** layar input PIN (numeric keypad besar) muncul. Tidak ada cara bypass. |
| **AC-008** | US-005 | **Given** PIN sudah disetel, **when** pengguna salah memasukkan PIN 3 kali berturut-turut, **then** input PIN dikunci selama 60 detik dengan pesan "Coba lagi nanti". |
| **AC-009** | US-006 | **Given** orang tua memiliki akun anonim dengan data anak, **when** mereka mengklik "Tautkan ke Google" di menu, **then** setelah login Google berhasil, seluruh data anonim berpindah ke akun Google tersebut dan sesi anonim sebelumnya ditutup. |

#### 3.2 Modul Belajar & Kuis

| AC ID | User Story | Kriteria |
|-------|-----------|----------|
| **AC-101** | US-101 | **Given** profil anak aktif, **when** Home ditampilkan, **then** layar menunjukkan: sapaan "Selamat datang, [nama anak]!" + daftar modul pelajaran hari ini. Semua teks terbacakan oleh TTS. |
| **AC-102** | US-102 | **Given** anak masuk modul "Mengenal Abjad", **when** halaman belajar pertama muncul, **then** satu huruf besar ditampilkan di tengah layar + suara mengucapkan huruf tersebut. Anak bisa tap panah kanan/kiri atau swipe untuk navigasi antar huruf. |
| **AC-103** | US-102 | **Given** anak sudah melihat semua halaman belajar (a-z), **then** tombol "Mulai Kuis" yang sebelumnya terkunci (disabled) berubah menjadi aktif (enabled) dengan animasi. |
| **AC-104** | US-103 | **Given** kuis "Cari Huruf yang Disebut" dimulai, **when** soal pertama tampil, **then** suara berkata "Cari huruf... [nama huruf]!" dan 6 opsi huruf muncul di layar sebagai tombol besar. Tidak ada teks instruksi tertulis. |
| **AC-105** | US-103 | **Given** kuis sedang berlangsung, **when** anak memilih huruf yang benar, **then** suara "Heba! Jawabanmu Benar!" diputar, XP bertambah, dan soal berikutnya muncul dalam <500ms. **When** anak salah, **then** suara "Yuk, coba lagi!" diputar, opsi yang salah diredupkan (tidak dihilangkan), dan anak bisa mencoba lagi. |
| **AC-106** | US-104 | **Given** anak masuk modul "Huruf Vokal", **when** halaman "Suku Kata" ditampilkan, **then** tabel suku kata (ba bi bu be bo, ca ci cu ce co, dst) muncul dengan setiap sel bisa di-tap untuk mendengar suaranya. |
| **AC-107** | US-104 | **Given** anak berada di halaman "Latihan" modul Huruf Vokal, **when** mereka memilih suku kata, **then** suara mengucapkan suku kata tersebut. Progress latihan (misal: 1/39) ditampilkan. |
| **AC-108** | US-105 | **Given** kuis "Susun Suku Kata" menampilkan soal "CUCI", **when** layar kuis muncul, **then** suara berkata "Susun suku katanya... cuci!" dan 4-6 opsi suku kata ditampilkan sebagai tombol. Area jawaban kosong dengan slot sesuai jumlah suku kata jawaban benar. |
| **AC-109** | US-105 | **Given** kuis susun suku kata, **when** anak men-tap suku kata dari opsi, **then** suku kata tersebut pindah ke slot jawaban berikutnya yang kosong. **When** anak men-tap "Reset", **then** semua slot jawaban dikosongkan kembali. **When** susunan benar, feedback positif. **When** susunan salah, tampilkan jawaban benar sejenak lalu lanjut. |
| **AC-110** | US-106 | **Given** anak masuk modul "Merakit Kalimat", **when** halaman "Ayo Membaca" tampil, **then** suku kata ditampilkan terpisah (misal: ma | ya | su | ka | sa | te) dan kata utuh di bawahnya (maya suka sate). Suara membacakan kata per kata. |
| **AC-111** | US-106 | **Given** halaman "Ayo Membaca", **when** anak men-tap satu kata utuh, **then** suara membacakan kata tersebut. Tidak ada kuis di halaman ini, murni belajar. |
| **AC-112** | US-107 | **Given** kuis "Susun Kalimat" menampilkan soal "BUDI BACA", **when** layar kuis muncul, **then** suara berkata "Susun kalimatnya... budi baca!" dan 4-6 opsi suku kata/kata pendek ditampilkan. Slot jawaban lebih panjang untuk menampung kalimat. |
| **AC-113** | US-107 | **Given** kuis susun kalimat, **when** anak menyusun kata dengan urutan benar, **then** feedback "Heba! Jawabanmu Benar!". **When** salah, **then** feedback "Kurang tepat, yang benar adalah..." + tampilkan kalimat benar sejenak. |
| **AC-114** | US-108 | **Given** anak belum menyelesaikan modul "Mengenal Abjad" (progress belajar < 100%), **when** mereka melihat modul "Huruf Vokal" di Home, **then** modul tersebut terkunci (ikon gembok, tidak bisa di-tap). **When** modul 1 selesai, **then** modul 2 terbuka otomatis. |

#### 3.3 Gamifikasi & Reward

| AC ID | User Story | Kriteria |
|-------|-----------|----------|
| **AC-201** | US-201 | **Given** anak menjawab benar di kuis, **when** feedback benar ditampilkan, **then** XP bertambah sebesar +10 (atau sesuai aturan modul) dan animasi kecil "+10 XP" muncul lalu menghilang dalam 1.5 detik. |
| **AC-202** | US-201 | **Given** anak menyelesaikan seluruh kuis dalam satu modul, **when** kuis selesai, **then** bonus XP diberikan (misal +50 XP) dan animasi level-up muncul jika XP mencapai threshold level berikutnya. |
| **AC-203** | US-202 | **Given** anak menyelesaikan kuis, **when** layar hasil muncul, **then** bintang 1-5 ditampilkan dengan animasi mengisi satu per satu. Skor 0-40% = 1 bintang, 41-60% = 2, 61-75% = 3, 76-90% = 4, 91-100% = 5 bintang. |
| **AC-204** | US-203 | **Given** anak menyelesaikan minimal 1 sesi belajar atau kuis hari ini, **when** sesi selesai, **then** streak counter bertambah 1. "Streak: 3 hari!" ditampilkan dengan api kecil. |
| **AC-205** | US-203 | **Given** anak memiliki streak 3 hari, **when** mereka tidak membuka aplikasi sama sekali di hari ke-4, **then** streak reset ke 0. Tidak ada notifikasi negatif, cukup tidak muncul api. |
| **AC-206** | US-204 | **Given** anak mencapai target "5 kuis selesai", **when** target tercapai, **then** stiker digital muncul di layar dengan animasi "Koleksi Baru!" dan masuk ke album stiker. |
| **AC-207** | US-205 | **Given** anak menyelesaikan seluruh modul dalam kategori "Literasi Dasar" (3 modul), **when** modul terakhir selesai, **then** badge "Master Abjad" diberikan dengan animasi khusus dan muncul di profil anak. |
| **AC-208** | US-023 | **Given** anak menjawab salah dalam Kuis atau Boss Battle, **when** jawaban diverifikasi, **then** energi (nyawa) berkurang 1. Jika energi habis (0), anak tidak bisa melanjutkan kuis/game dan diarahkan untuk istirahat. |
| **AC-209** | US-023 | **Given** energi anak < 5, **when** waktu berlalu (e.g. 30 menit per nyawa), **then** energi akan terisi kembali secara otomatis, diverifikasi via backend. |
| **AC-210** | US-024 | **Given** anak menyelesaikan modul atau mencapai skor tinggi, **when** kuis selesai, **then** anak mendapatkan sejumlah koin (🪙) dan ditambahkan ke dompet akunnya. |
| **AC-211** | US-025 | **Given** anak menjawab soal di layar, **when** anak benar, **then** maskot merespons dengan animasi positif (tersenyum/melompat). **When** anak salah, **then** maskot berekspresi memberi semangat. |
| **AC-212** | US-026 | **Given** anak mencapai akhir sebuah topik, **when** modul evaluasi (Boss) dimasuki, **then** UI berubah menjadi format serangan ke monster, setiap jawaban benar akan mengurangi health monster tersebut. |
| **AC-213** | US-027 | **Given** modul Fun Game dibuka, **when** anak memainkannya, **then** terdapat sistem Timer hitung mundur, dan setiap jawaban cepat & benar berturut-turut memberikan extra Multiplier (Combo) untuk koin dan poin. |

#### 3.4 Engine Konten & Soal

| AC ID | User Story | Kriteria |
|-------|-----------|----------|
| **AC-301** | US-301 | **Given** admin mengakses form "Tambah Kata", **when** admin mengisi: kata, level (1-5), kategori, emoji, dan menyimpan, **then** kata baru tersimpan di Bank Data dan langsung tersedia untuk Quiz Engine tanpa restart server. |
| **AC-302** | US-301 | **Given** admin memasukkan kata "PESAWAT", **when** data disimpan, **then** sistem otomatis memecah kata menjadi suku kata: "pe", "sa", "wat" dan menyimpannya bersama data kata. |
| **AC-303** | US-302 | **Given** admin mengakses form "Tambah Kalimat", **when** admin mengisi: kalimat utuh ("Budi baca buku"), level (1-5), kategori, dan menyimpan, **then** kalimat baru tersimpan di Bank Data lengkap dengan hasil tokenisasi kata. |
| **AC-304** | US-303 | **Given** modul "Kuis Abjad" meminta 10 soal, **when** Quiz Engine menerima permintaan dengan parameter: tipe="cari_huruf", level=1, jumlah=10, **then** engine menghasilkan 10 soal unik, masing-masing berisi: 1 huruf target (jawaban benar) + 5 huruf distractor, tanpa pengulangan soal dalam sesi yang sama. |
| **AC-305** | US-303 | **Given** modul "Susun Suku Kata" meminta 5 soal, **when** Quiz Engine menerima permintaan dengan parameter: tipe="susun_suku_kata", level=1, jumlah=5, **then** engine menghasilkan 5 soal unik, masing-masing berisi: 1 kata target + suku kata terpecah + distractor suku kata. |
| **AC-306** | US-303 | **Given** Bank Data memiliki 20 kata level 1, **when** Quiz Engine diminta 10 soal, **then** engine mengambil sample acak 10 dari 20 kata. Jika Bank Data memiliki kurang dari jumlah yang diminta (misal hanya 5), engine memberikan SEMUA yang ada dan mencatat warning di log. |
| **AC-307** | US-304 | **Given** soal untuk modul "Mengenal Abjad" dengan target huruf "R", **when** Masking Engine menerima aturan: mode="sembunyikan_semua", target="R", **then** engine memberikan output: jawaban benar="R", tidak ada teks yang ditampilkan selain opsi. Soal murni berupa suara. |
| **AC-308** | US-304 | **Given** soal untuk modul "Susun Kalimat" dengan target "BUDI BACA", **when** Masking Engine menerima aturan: mode="acak_kata", target="BUDI BACA", **then** engine menghasilkan: kata teracak ["BACA", "BUDI"] atau ["BUDI", "BACA"] + 2-3 distractor kata. |
| **AC-309** | US-305 | **Given** jawaban anak = "P" dan jawaban benar = "P", **when** Result Engine memproses, **then** output: `{ benar: true, skor_bintang: (dihitung dari akumulasi sesi), xp: +10, feedback: "benar" }`. |
| **AC-310** | US-305 | **Given** kuis selesai (semua soal terjawab), **when** Result Engine menghitung skor akhir, **then** bintang ditentukan: 0-40% benar = 1★, 41-60% = 2★, 61-75% = 3★, 76-90% = 4★, 91-100% = 5★. XP bonus diberikan sesuai aturan modul. |
| **AC-311** | US-306 | **Given** anak membuka kuis, **when** halaman kuis ditampilkan, **then** semua data soal (teks soal, opsi jawaban, jawaban benar, audio) sudah tersedia di state halaman. Tidak ada loading spinner atau flicker di antara soal. Transisi antar soal <500ms. |

#### 3.5 Kontrol Orang Tua & Dashboard

| AC ID | User Story | Kriteria |
|-------|-----------|----------|
| **AC-401** | US-401 | **Given** orang tua mengakses menu Timer Belajar, **when** mereka memilih durasi (20/30/45/60 menit), **then** timer tersimpan untuk profil anak aktif. Ketika anak belajar dan timer habis, muncul overlay "Waktu Belajar Selesai!" dan anak tidak bisa melanjutkan sampai orang tua mereset/memperpanjang. |
| **AC-402** | US-401 | **Given** timer tersisa 5 menit, **when** anak masih belajar, **then** peringatan halus muncul: ikon jam dengan hitungan mundur "5 menit lagi" di pojok atas, tidak mengganggu aktivitas. |
| **AC-403** | US-402 | **Given** orang tua memilih skala teks "Besar" di Text Control, **when** anak membuka modul apa pun, **then** seluruh teks (soal, opsi, instruksi) dirender dengan ukuran font +4dp dari default. |
| **AC-404** | US-403 | **Given** orang tua menonaktifkan TTS, **when** anak membuka modul, **then** tidak ada suara instruksi, soal, atau feedback. Hanya SFX tombol yang tetap aktif (opsi terpisah). Ikon speaker dengan garis miring muncul di pojok. |
| **AC-405** | US-404 | **Given** orang tua membuka dashboard anak, **when** dashboard dimuat, **then** menampilkan: (1) Modul selesai (X/3), (2) Rata-rata bintang, (3) Total XP, (4) Waktu belajar minggu ini, (5) Streak hari ini. Semua data diperbarui real-time setelah sesi belajar selesai. |
| **AC-406** | US-404 | **Given** anak belum belajar sama sekali, **when** orang tua membuka dashboard, **then** dashboard tetap menampilkan data dengan nilai 0 atau "Belum ada aktivitas" dengan ilustrasi ramah. |
| **AC-407** | US-405 | **Given** orang tua membuka detail modul "Mengenal Abjad", **when** detail ditampilkan, **then** daftar huruf A-Z muncul dengan indikator: centang hijau (dikuasai, >80% benar), bintang kuning (perlu latihan, 50-80%), lingkaran abu-abu (belum dicoba). |
| **AC-408** | US-406 | **Given** orang tua mengaktifkan "Uppercase Only", **when** anak membuka modul, **then** semua teks ditampilkan dalam huruf kapital. **Given** "Font Dyslexic-friendly" dipilih, **then** font berubah ke OpenDyslexic di seluruh aplikasi. **Given** "Hide Hint" aktif, **then** tombol hint di kuis disembunyikan. |

#### 3.6 PWA & Offline

| AC ID | User Story | Kriteria |
|-------|-----------|----------|
| **AC-501** | US-501 | **Given** pengguna membuka SAYA BACA di browser yang mendukung PWA, **when** mereka mengunjungi minimal 2 halaman, **then** prompt "Tambahkan ke Homescreen" muncul. Setelah diinstal, aplikasi terbuka di jendela mandiri tanpa URL bar. |
| **AC-502** | US-502 | **Given** konten modul "Mengenal Abjad" sudah pernah dibuka saat online, **when** perangkat offline dan anak membuka modul yang sama, **then** semua halaman belajar dan kuis tetap bisa diakses tanpa error. Data progres disimpan lokal dan di-sync saat online kembali. |

---

### 4. Acceptance Criteria — Should (v1.1)

| AC ID | User Story | Kriteria |
|-------|-----------|----------|
| **AC-601** | US-601 | **Given** anak mengakses Leaderboard Global, **when** layar terbuka, **then** 20 peringkat teratas berdasarkan XP ditampilkan dengan nama samaran (nama depan + emoji acak). Posisi anak sendiri ditandai dengan highlight khusus. |
| **AC-602** | US-602 | **Given** anak mengakses Leaderboard Misi Harian, **when** layar terbuka, **then** peringkat XP hari ini ditampilkan. Peringkat di-reset setiap pukul 00:00 WIB. |
| **AC-603** | US-603 | **Given** anak membuka mini game "Balon Kata", **when** game dimulai, **then** balon-balon dengan suku kata muncul dari bawah layar, anak harus men-tap balon dengan suku kata yang benar sesuai instruksi suara. Data suku kata berasal dari Bank Data Engine. |
| **AC-604** | US-604 | **Given** admin login ke admin panel, **when** dashboard terbuka, **then** menampilkan: total pengguna terdaftar, modul paling populer, rata-rata skor global. Data bisa difilter 7/30/90 hari terakhir. |
| **AC-605** | US-604 | **Given** admin mengakses kelola bank data, **when** mereka mengklik "Edit Kata", **then** form yang sama dengan "Tambah Kata" muncul dengan data terisi. Admin bisa mengubah kata, level, kategori, atau emoji dan menyimpan. Perubahan langsung berefek ke engine. |

---

### 5. Acceptance Criteria — Could (v1.2+)

| AC ID | User Story | Kriteria |
|-------|-----------|----------|
| **AC-701** | US-701 | **Given** anak ingin menambah teman, **when** mereka mengklik "Tambah Teman" dan memasukkan kode teman, **then** permintaan pertemanan terkirim. Orang tua dari kedua belah pihak harus memasukkan PIN untuk menyetujui. |
| **AC-702** | US-702 | **Given** pertemanan disetujui, **when** anak membuka chat, **then** hanya stiker dan pesan template ("Halo!", "Semangat!", "Heba!") yang bisa dikirim. Tidak ada input teks bebas. |
| **AC-703** | US-703 | **Given** anak mengundang teman ke mini game multiplayer, **when** teman menerima, **then** kedua pemain masuk ke sesi game yang sama dan bisa melihat skor satu sama lain secara real-time. |
| **AC-704** | US-704 | **Given** orang tua mengaktifkan notifikasi, **when** minggu berakhir (Minggu 23:59), **then** ringkasan mingguan terkirim: "Bima belajar 3 jam, naik level ke 5, streak 7 hari!" via push notification atau email. |
| **AC-705** | US-705 | **Given** anak menerima permintaan pertemanan, **when** orang tua melihat notifikasi "Permintaan Teman", **then** mereka bisa menyetujui atau menolak setelah memasukkan PIN. Tanpa PIN, tombol setuju/tolak tidak berfungsi. |
| **AC-706** | US-706 | **Given** admin mengakses dashboard advanced, **when** mereka membuka "Monitoring", **then** metrik real-time server (CPU, memori, request/detik, error rate) ditampilkan dalam grafik. Admin bisa export data sebagai CSV. |