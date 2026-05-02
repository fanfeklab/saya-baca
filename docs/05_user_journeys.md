# 05_user_journeys.md

## User Journeys: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Memetakan perjalanan end-to-end kedua persona utama (Ibu Sari dan Bima) saat menggunakan SAYA BACA. Setiap journey mencakup tahapan, titik sentuh, emosi, dan pain points. Journey ini akan menjadi acuan untuk menyusun User Stories dan Acceptance Criteria.

---

### 2. Journey 1: Ibu Sari — Onboarding & Setup Pertama Kali

**Adegan**: Ibu Sari baru mengunduh/membuka SAYA BACA untuk pertama kali. Ia ingin menyiapkan akun untuk Bima.

| Tahap | Aksi Ibu Sari | Respons Sistem | Emosi | Pain Point / Notes |
|-------|--------------|----------------|-------|-------------------|
| **1. Landing** | Membuka URL/instal PWA. | Splash screen "SAYA BACA", lalu dua tombol besar: "Masuk dengan Google" dan "Langsung Belajar" (Anonim). | Netral, ingin cepat. | Jangan ada onboarding panjang. |
| **2. Login** | Klik "Masuk dengan Google". | Popup Google sign-in. | Lega, cepat. | 1 klik selesai. |
| **3. Buat Profil Anak** | Klik "Tambah Profil Anak". Input nama "Bima", pilih avatar. | Form sederhana: nama + 6 pilihan avatar. | Antusias. | Jangan minta umur, gender, atau data lain dulu. |
| **4. Atur PIN** | Input PIN 4 digit, konfirmasi ulang. | Numeric keypad besar, konfirmasi "PIN tersimpan". | Aman. | Jelaskan fungsi PIN dengan teks pendek + ikon. |
| **5. Atur Timer** | Pilih durasi timer: 20/30/45/60 menit. | Slider atau pilihan tombol, default 30 menit. | Peduli. | Opsional, bisa di-skip. |
| **6. Masuk ke Home** | Klik "Mulai Belajar". | Home dengan profil Bima aktif: "Selamat datang, Bima!" + 3 modul. | Siap. | Ibu Sari serahkan tablet ke Bima sekarang. |

---

### 3. Journey 2: Bima — Belajar Modul "Mengenal Abjad"

**Adegan**: Bima sudah di Home, Ibu Sari mendampingi di samping. Bima memilih modul pertama.

| Tahap | Aksi Bima | Respons Sistem | Emosi | Pain Point / Notes |
|-------|----------|----------------|-------|-------------------|
| **1. Pilih Modul** | Tap kartu "Mengenal Abjad" (ikon A-Z, warna cerah). | Layar modul: "Progress Modul 0/3" + tombol "Mulai Belajar" besar. | Penasaran. | Tombol "Mulai Kuis" disabled sampai belajar selesai. |
| **2. Belajar Huruf** | Tap "Mulai Belajar". | Tampil huruf A besar + suara "a". Tap lanjut ke B, dst. 3 halaman (a-i, j-r, s-z). | Senang, menirukan suara. | Setiap huruf ada animasi ringan & suara jelas. |
| **3. Selesai Belajar** | Tap selesai di halaman terakhir. | "Heba! Kamu sudah belajar semua huruf!" + bintang animasi. Tombol "Mulai Kuis" sekarang aktif. | Bangga. | Progress Modul jadi 1/3. |
| **4. Mulai Kuis** | Tap "Mulai Kuis". | Masuk kuis "Cari Huruf yang Disebut!" — Progress Kuis 1/10. | Antusias. | Soal sudah matang dari engine, tanpa loading. |
| **5. Jawab Soal** | Dengar suara "cari huruf... R!" lalu tap huruf yang benar dari 6 opsi. | Jika benar: "Heba! Jawabanmu Benar!" + SFX. Jika salah: "Yuk, coba lagi!" + opsi yang salah redup. | Senang kalau benar, penasaran kalau salah. | Opsi tidak hilang, hanya redup agar tidak frustasi. |
| **6. Selesai Kuis** | 10 soal selesai. | Animasi bintang 1-5 + XP + "Streak 1 hari!" | Sangat bangga. | Lihat bintang penuh sangat memuaskan. |
| **7. Kembali ke Home** | Tap "Home" (ikon rumah). | Home dengan progress terbaru. | Puas. | Modul berikutnya ("Huruf Vokal") mungkin masih terkunci atau sudah terbuka tergantung aturan. |

---

### 4. Journey 3: Bima — Kuis "Susun Suku Kata"

**Adegan**: Bima sudah menyelesaikan modul Huruf Vokal dan sekarang masuk ke kuisnya.

| Tahap | Aksi Bima | Respons Sistem | Emosi | Pain Point / Notes |
|-------|----------|----------------|-------|-------------------|
| **1. Mulai Kuis** | Tap "Mulai Kuis" di modul Huruf Vokal. | "Progress Kuis 1/5" + soal pertama: susun suku kata "CUCI". | Fokus. | Soal dengan audio "susun suku katanya... cuci!" |
| **2. Susun Kata** | Tap suku kata "cu", lalu "ci" dari 4 opsi. | Suku kata terpilih pindah ke area jawaban. | Konsentrasi. | Tombol "Reset" tersedia jelas. |
| **3. Jawaban Benar** | Susunan benar: "cu" + "ci". | "Heba! Jawabanmu Benar!" lanjut otomatis ke soal berikutnya. | Senang. | Transisi halus. |
| **4. Jawaban Salah** | Susunan salah. | "Kurang tepat, yang benar adalah..." + tampilkan jawaban benar sejenak, lalu lanjut ke soal berikutnya. | Sedikit kecewa, tapi belajar. | Tidak ada hukuman. Tetap dapat XP lebih kecil. |
| **5. Selesai Kuis** | 5 soal selesai. | Bintang 1-5 + XP + update streak. | Bangga. | — |

---

### 5. Journey 4: Ibu Sari — Cek Dashboard

**Adegan**: Besok Sabtu pagi. Ibu Sari membuka SAYA BACA untuk melihat kemajuan Bima.

| Tahap | Aksi Ibu Sari | Respons Sistem | Emosi | Pain Point / Notes |
|-------|--------------|----------------|-------|-------------------|
| **1. Buka Aplikasi** | Buka SAYA BACA, sudah login. | Home dengan profil Bima. Ibu Sari tap ikon gembok "Orang Tua" di pojok kanan atas. | Rutinitas. | Ikon gembok selalu di posisi konsisten. |
| **2. Input PIN** | Masukkan PIN 4 digit. | Numeric keypad, lalu akses terbuka ke menu Orang Tua. | Aman. | Hanya butuh 2 detik. |
| **3. Lihat Dashboard** | Tap "Dashboard Bima". | Ringkasan: Modul selesai (2/3), Rata-rata bintang (4.2), Total XP (850), Waktu belajar minggu ini (2 jam 15 menit), Streak (5 hari). | Puas, terinformasi. | Grafik sederhana, bukan tabel rumit. |
| **4. Cek Detail Modul** | Tap modul "Mengenal Abjad". | Detail: huruf yang sudah dikuasai (centang hijau), huruf yang masih salah (tanda bintang). | Insightful. | Membantu Ibu Sari tahu harus mengulang apa di rumah. |
| **5. Atur Text Control** | Tap "Text Control". | Slider skala teks, toggle TTS on/off, dropdown font. | Peduli. | Setting berlaku untuk semua sesi Bima selanjutnya. |
| **6. Tutup Dashboard** | Tap "Kembali". | Kembali ke Home anak. | Selesai. | — |

---

### 6. Journey 5: Admin — Menambah Konten Baru (Should — v1.1)

**Adegan**: Admin mendapat buku materi baru dan ingin menambahkan kata-kata baru ke bank data.

| Tahap | Aksi Admin | Respons Sistem | Emosi | Pain Point / Notes |
|-------|-----------|----------------|-------|-------------------|
| **1. Akses Admin Panel** | Buka `/admin`, login. | Dashboard admin: statistik global. | Profesional. | Role-based access. |
| **2. Buka Bank Data** | Klik "Bank Data" > "Tambah Kata". | Form: kata, level (1-5), kategori, suku kata (auto-split), emoji, tags. | Fokus. | Auto-split suku kata dengan algoritma sederhana. |
| **3. Simpan** | Klik "Simpan". | Kata baru tersimpan, langsung tersedia untuk semua engine. | Puas. | Tanpa deploy, tanpa restart. |