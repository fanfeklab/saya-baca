# Main App UI Assembly Roadmap

Tujuan: Membangun ratusan screen dan variasi UI untuk ekosistem Edu-App yang konsisten, identik dengan branding, dan intuitif.

## 1. Authentication & Entry Level
Membangun pintu masuk yang ramah anak dan aman namun tetap efisien.
- [x] **Login Screen**: Welcome card dengan branding Saya Baca tinggi (Sudah Polished ✨).
- [x] **PIN Security Screen**: Input PIN dengan keypad angka berukuran besar untuk orang tua. (Polished ✨)
- [ ] **Avatar Creation Room**: Step-by-step UI pemilihan karakter dasar.
- [ ] **Avatar Customization**: UI untuk mengubah aksesoris, warna, dan ekspresi avatar.
- [ ] **Onboarding Carousel**: 3-5 slides ilustrasi cara menggunakan aplikasi.
- [ ] **Terms & Privacy Kid-Friendly**: Penjelasan privasi dengan bahasa sederhana dan ikonik.

## 2. Shared Core UI (Layout & Orchestra)
Memastikan semua screen memiliki "jiwa" yang sama.
- [x] **Background Orchestra**: Satu background konsisten di semua page.
- [ ] **Dynamic Page Transition**: Animasi khusus saat berpindah antar modul (misal: efek zoom masuk ke peta).
- [ ] **Global Sound Controller**: Molecule untuk handle suara narasi/SFX global.
- [ ] **Universal Loading State**: Animasi loading unik (karakter sedang berlari/belajar).

## 3. Home & Exploration
Pusat navigasi utama harian anak.
- [x] **Main Dashboard (Misi Harian)**: List misi yang harus diselesaikan hari ini (Sudah Polished ✨).
- [ ] **Learning Map (Adventure Mode)**: Visual path/peta petualangan tingkat level.
- [ ] **Daily Streak Panel**: UI yang menunjukkan berapa hari beruntun anak sudah belajar.
- [ ] **Daily Reward Unseal**: Animasi dan UI saat mendapatkan hadiah login harian.
- [ ] **Notifications Center**: Daftar pesan dari "Guru AI" atau teman.
- [ ] **Quick Play Bar**: Shortcut ke game yang paling sering dimainkan.
- [ ] **Offline Mode Dashboard**: UI khusus saat koneksi internet terputus.

## 4. Modul Berhitung (Numeracy Path)
Setiap screen memiliki layout edukasi yang fokus.
- [ ] **Lobby Berhitung**: Seleksi sub-topik (tambah, kurang, kali, bagi).
- [ ] **Number Match Table**: UI mencocokkan angka dengan jumlah benda.
- [ ] **Logic Pattern Grid**: Menyusun pola berurut.
- [ ] **Shape Sorting Space**: Mengenal bentuk geometri.
- [ ] **Clock Learning UI**: Interaksi belajar membaca jam analog/digital.
- [ ] **Simple Addition UI**: Visualisasi penjumlahan dengan objek.
- [ ] **Mental Math Blitz**: UI untuk latihan cepat menjawab soal.
- [ ] **Math Mastery Result**: Screen laporan hasil belajar berhitung (Bintang & XP).

## 5. Modul Membaca & Literasi (Literacy Path)
- [x] **Lobby Membaca**: Seleksi level (Polished ✨).
- [ ] **Phonics Station**: UI untuk mendengarkan bunyi huruf.
- [x] **Spelling Bee Screen**: Mengetik/menyusun huruf menjadi kata (Polished ✨).
- [ ] **Word Match UI**: Menghubungkan kata dengan gambar yang sesuai.
- [ ] **Sentence Builder**: Drag and drop kata menjadi kalimat.
- [ ] **Interactive Storybook**: Layar baca cerita dengan teks highlight otomatis.
- [ ] **Vocabulary Deck**: UI flashcard untuk kosakata baru.
- [ ] **Handwriting Guide**: UI area menulis/tracing huruf di layar.

## 6. Modul Kreativitas (Mewarnai & Musik)
- [ ] **Gallery Pilihan Gambar**: List template gambar untuk diwarnai.
- [ ] **Creative Canvas**: UI utama mewarnai dengan tool selection di samping.
- [ ] **Color by Number**: Variasi mewarnai berdasarkan panduan angka.
- [ ] **Music Library**: List lagu anak-anak untuk dinyanyikan.
- [ ] **Karaoke Mode**: UI lirik berjalan dengan visual spectrum suara.
- [ ] **Instrument Playground**: UI mencoba berbagai suara alat musik (Piano, Drum, dll).

## 7. Progression & Social
- [ ] **Trophy Room**: Rak koleksi piala yang sudah didapatkan.
- [ ] **Badge Collection**: Detail deskripsi setiap lencana keahlian.
- [ ] **Friend List**: Melihat progres teman tanpa fitur chat bebas (Aman).
- [ ] **Leaderboard Global**: Skor tertinggi mingguan di seluruh dunia.
- [ ] **Milestone Celebration**: Fullscreen animation saat mencapai level tertentu.

## 8. Parent Control Center
Dashboad khusus untuk orang tua dengan UI yang lebih profesional tapi tetap harmonis.
- [ ] **Executive Summary**: Chart waktu belajar dan topik favorit anak.
- [ ] **Skill Radar Chart**: Visualisasi kelebihan dan kekurangan anak di berbagai bidang.
- [ ] **Screen Time Limiter**: UI pengaturan durasi penggunaan aplikasi.
- [ ] **Curriculum Customization**: Memilih sub-topik yang ingin difokuskan.
- [ ] **Subscription & Billing**: Manajemen paket langganan.
- [ ] **Reward Store Management**: Orang tua menentukan hadiah real (misal: es krim) jika misi selesai.

## 9. Profil & Pengaturan Dasar
- [ ] **Profil Detail**: Statistik total jam belajar dan total XP.
- [ ] **Account Settings**: Ganti email, password, dan security PIN.
- [ ] **Theme Customization**: Ganti warna aksen UI (Pink, Blue, Green, dll).
- [ ] **Help & Support**: FAQ dan kontak bantuan.
- [ ] **Credits**: Daftar tim pembuat aplikasi.

---

### Strategi Eksekusi:
1. **Asembly by Jerih Payah**: Tidak menggunakan data mock. UI dibangun per partikel menggunakan Atoms yang ada.
2. **Consistency First**: Background Orchestra harus selalu menyatu. Border, Shadow, dan Corner-radius harus identik.
3. **Task Completion**: Setiap screen yang selesai akan di-checklist di file ini.
