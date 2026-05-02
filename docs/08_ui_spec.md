# 08_ui_spec.md

## UI Specification: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Dokumen ini menjabarkan spesifikasi antarmuka pengguna (UI) SAYA BACA. Spesifikasi ini akan menjadi acuan bagi perakitan komponen dari UI Kit yang sudah tersedia, pembangunan komponen tambahan yang belum ada, serta wiring ke backend. Dokumen ini **hanya** membahas tampilan, interaksi, dan perilaku UI — tidak membahas logika bisnis atau teknis backend.

---

### 2. Prinsip Desain UI

| Prinsip | Implementasi |
|---------|-------------|
| **Dumb UI** | Komponen UI hanya merender data dan mengirim event. Tidak mengandung business logic. Semua logika ada di service layer. |
| **Atomic Design** | Molekul dan Organisme dirakit dari atom UI Kit yang tersedia. Jika komponen belum ada, akan dibangun sebagai atom/molekul baru. |
| **Accessibility First (Anak)** | Touch target ≥ 64x64dp, jarak antar elemen ≥ 16dp, kontras warna cukup, teks besar default, audio feedback wajib. |
| **Minimal Path** | Maksimal 3 tap dari Home ke konten belajar/kuis pertama. |
| **Audio-Centric** | Setiap layar, tombol navigasi, soal, dan feedback memiliki suara (TTS + SFX) kecuali dinonaktifkan orang tua. |
| **No Flicker** | Semua data soal sudah matang dari engine sebelum UI merender. Tidak ada loading spinner antar soal. |

---

### 3. UI Kit Inventory

#### 3.1 Atom (Komponen Dasar)

| Atom | Deskripsi | Status |
|------|-----------|--------|
| `Button` | Tombol tap dengan 3 varian: `primary` (warna utama, teks putih), `secondary` (outline), `option` (untuk pilihan kuis). Touch target min 64dp. | **Ada** |
| `Icon` | Ikon universal: rumah, bintang, gembok, jam, telinga, panah, centang, dll. | **Ada** |
| `Text` | Teks dengan skala dinamis: `small`, `default`, `large`, `xlarge` (terikat Text Control). | **Ada** |
| `Badge` | Penanda kecil: angka streak, notifikasi baru. | **Ada** |
| `Avatar` | Lingkaran dengan gambar/emoji untuk profil anak. | **Ada** |
| `AudioButton` | **BELUM ADA** — Tombol + ikon speaker yang otomatis memutar TTS saat ditekan. Wajib dibangun. | **Perlu Dibangun** |

#### 3.2 Molekul (Gabungan Atom)

| Molekul | Deskripsi | Status |
|---------|-----------|--------|
| `Card` | Kartu modul belajar (ikon + judul + progress). | **Ada** |
| `ProgressBar` | Batang progress horizontal (untuk progress modul/kuis). | **Ada** |
| `StarRating` | Deretan 5 bintang yang bisa terisi penuh/setengah/kosong. | **Ada** |
| `TimerDisplay` | **BELUM ADA** — Ikon jam + hitungan mundur menit:detik. Tampil di pojok atas saat timer aktif. | **Perlu Dibangun** |
| `StreakIndicator` | **BELUM ADA** — Ikon api + angka streak. Animasi api menyala saat streak bertambah. | **Perlu Dibangun** |
| `OptionGrid` | **BELUM ADA** — Grid 2x3 atau 3x2 berisi `Button` varian `option` untuk pilihan jawaban. | **Perlu Dibangun** |
| `AnswerSlot` | **BELUM ADA** — Deretan slot horizontal tempat suku kata/kata yang telah dipilih anak disusun. Slot kosong bertanda garis bawah putus-putus. | **Perlu Dibangun** |

#### 3.3 Organisme (Gabungan Molekul & Atom)

| Organisme | Deskripsi | Status |
|-----------|-----------|--------|
| `ModuleCard` | Kartu modul lengkap: `Card` + `ProgressBar` + ikon gembok jika terkunci. | **Ada** |
| `BottomNav` | Navigasi bawah: Home, History, Leaderboard, Profile (4 ikon). | **Ada** |
| `QuizScreen` | **BELUM ADA** — Layar kuis penuh: `ProgressBar` kuis, area soal (`Text` + `AudioButton`), `OptionGrid` atau `AnswerSlot`, tombol `Reset`. Ini adalah organisme kompleks yang perlu dirakit. | **Perlu Dibangun** |
| `ResultOverlay` | **BELUM ADA** — Overlay setelah kuis selesai: `StarRating` animasi, XP yang bertambah, `StreakIndicator`. | **Perlu Dibangun** |
| `PinPad` | **BELUM ADA** — Numeric keypad 4x3 + 4 titik indikator PIN. Untuk input PIN orang tua. | **Perlu Dibangun** |
| `DashboardCard` | **BELUM ADA** — Kartus ringkasan di dashboard orang tua: judul metrik + nilai besar + ikon. | **Perlu Dibangun** |
| `TextControlPanel` | **BELUM ADA** — Panel pengaturan: slider skala teks, toggle TTS, dropdown font, toggle uppercase, toggle hide hint. | **Perlu Dibangun** |

---

### 4. Deskripsi Layar Utama

#### 4.1 Layar: Home (Anak)

```
┌────────────────────────────┐
│  🔒  Selamat datang, Bima! │  ← Ikon gembok (Orang Tua) + sapaan
│                            │
│  ┌──────────────────────┐  │
│  │ 🕐 Timer: 28:34      │  │  ← TimerDisplay (jika timer aktif)
│  └──────────────────────┘  │
│                            │
│  PELAJARAN HARI INI       │
│                            │
│  ┌──────────────────────┐  │  ← ModuleCard (Mengenal Abjad)
│  │ 🔤 Mengenal Huruf    │  │
│  │ A-Z dengan cara...   │  │
│  │ ████████░░░ 2/3      │  │
│  └──────────────────────┘  │
│                            │
│  ┌──────────────────────┐  │  ← ModuleCard (Huruf Vokal)
│  │ 🔡 Huruf Vokal        │  │
│  │ Belajar menggabung.. │  │
│  │ ████░░░░░░░ 1/3      │  │
│  └──────────────────────┘  │
│                            │
│  ┌──────────────────────┐  │  ← ModuleCard (Merakit Kalimat) - terkunci
│  │ 🔒 Merakit Kalimat    │  │
│  │ Menyusun suku kata.. │  │
│  │ ░░░░░░░░░░░ 0/3      │  │
│  └──────────────────────┘  │
│                            │
│  ┌──┬──┬──┬──┐            │
│  │🏠│📋│🏆│👤│            │  ← BottomNav
│  └──┴──┴──┴──┘            │
└────────────────────────────┘
```

**Aturan**:
- Sapaan "Selamat datang, [nama]!" dibacakan oleh TTS saat layar dimuat.
- Modul yang terkunci berwarna lebih redup dan tidak merespons tap.
- BottomNav selalu terlihat di semua layar utama anak.

---

#### 4.2 Layar: Belajar Huruf (Modul Mengenal Abjad)

```
┌────────────────────────────┐
│  ← Belajar Abjad    1/27  │  ← Progress halaman
│                            │
│                            │
│           A                │  ← Huruf besar di tengah
│                            │
│          🔈                │  ← AudioButton (putar ulang suara)
│                            │
│                            │
│   ◀        ▶              │  ← Navigasi (panah kiri/kanan)
│                            │
│  ┌──┬──┬──┬──┐            │
│  │🏠│📋│🏆│👤│            │
│  └──┴──┴──┴──┘            │
└────────────────────────────┘
```

**Aturan**:
- Huruf dirender dengan font besar (~72dp).
- Suara otomatis diputar saat masuk halaman baru ("a").
- Swipe kiri/kanan bisa menggantikan tap panah.
- Halaman terakhir menampilkan tombol "Selesai Belajar" → kembali ke Home.

---

#### 4.3 Layar: Kuis Cari Huruf

```
┌────────────────────────────┐
│  Kuis Abjad               │
│  ██████████░ 1/10         │  ← ProgressBar kuis
│                            │
│        🔈                  │  ← AudioButton (putar ulang instruksi)
│                            │
│    ┌───┬───┬───┐          │
│    │ N │ P │ X │          │  ← OptionGrid 2x3
│    ├───┼───┼───┤          │
│    │ V │ R │ G │          │
│    └───┴───┴───┘          │
│                            │
│  ┌──┬──┬──┬──┐            │
│  │🏠│📋│🏆│👤│            │
│  └──┴──┴──┴──┘            │
└────────────────────────────┘
```

**Aturan**:
- Suara berkata "Cari huruf... [huruf]!" saat soal dimuat. Anak bisa tap `🔈` untuk mengulang.
- Opsi huruf berupa tombol besar (min 80dp), mudah di-tap.
- Jika benar: Animasi centang hijau di tombol + "Heba!". Langsung lanjut soal berikutnya dalam <500ms.
- Jika salah: Tombol yang salah diredupkan (tidak dihapus) + "Yuk, coba lagi!". Anak bisa mencoba tombol lain.

---

#### 4.4 Layar: Kuis Susun Suku Kata

```
┌────────────────────────────┐
│  Huruf Vokal              │
│  ██████████░ 1/5          │
│                            │
│  Susun suku katanya!      │
│        🔈                  │
│                            │
│    "CUCI"                  │  ← Kata target (dibacakan)
│                            │
│  ┌────┬────┐               │  ← AnswerSlot (2 slot)
│  │ cu │ ci │               │
│  └────┴────┘               │
│                            │
│    ┌───┬───┬───┐          │
│    │ ci│ ze│ cu│          │  ← OptionGrid (opsi suku kata)
│    │ zo│   │   │          │
│    └───┴───┴───┘          │
│                            │
│       [ Reset ]            │  ← Tombol Reset
│                            │
│  ┌──┬──┬──┬──┐            │
│  │🏠│📋│🏆│👤│            │
│  └──┴──┴──┴──┘            │
└────────────────────────────┘
```

**Aturan**:
- Anak men-tap suku kata dari grid opsi → suku kata pindah ke slot jawaban kosong pertama.
- Tap slot yang sudah terisi → suku kata kembali ke grid.
- Tap Reset → semua slot kosong.
- Jika slot penuh dan benar → "Heba! Jawabanmu Benar!" → lanjut soal.
- Jika slot penuh dan salah → "Kurang tepat, yang benar adalah..." → tampilkan jawaban benar 2 detik → lanjut soal.

---

#### 4.5 Layar: Hasil Kuis (ResultOverlay)

```
┌────────────────────────────┐
│                            │
│      ⭐ ⭐ ⭐ ⭐ ☆          │  ← StarRating (4 dari 5)
│                            │
│     Hebat!                 │
│                            │
│    +30 XP                  │  ← XP animasi bertambah
│                            │
│  🔥 Streak: 3 Hari!       │  ← StreakIndicator
│                            │
│  ┌────────────────────┐   │
│  │   Lanjutkan         │   │  ← Button primary
│  └────────────────────┘   │
│                            │
└────────────────────────────┘
```

**Aturan**:
- Bintang mengisi satu per satu dengan animasi (delay 300ms antar bintang).
- XP bertambah dengan animasi angka naik (counter).
- Jika streak 7 hari, animasi api besar + badge "Minggu Hebat!".
- Tombol "Lanjutkan" kembali ke Home.

---

#### 4.6 Layar: Dashboard Orang Tua

```
┌────────────────────────────┐
│  ← Dashboard Bima         │
│                            │
│  ┌──────────┬──────────┐  │
│  │ Modul    │ ⭐ Rata  │  │  ← DashboardCard
│  │ 2/3      │ 4.2      │  │
│  └──────────┴──────────┘  │
│  ┌──────────┬──────────┐  │
│  │ Total XP │ Waktu    │  │
│  │ 850      │ 2j 15m   │  │
│  └──────────┴──────────┘  │
│  ┌──────────────────────┐  │
│  │ 🔥 Streak: 5 Hari   │  │
│  └──────────────────────┘  │
│                            │
│  Detail Modul              │
│  ┌──────────────────────┐  │
│  │ 🔤 Mengenal Abjad   │  │
│  │ ✅✅✅✅✅✅⭐✅⭐✅  │  │  ← Indikator per huruf
│  │ ...                  │  │
│  └──────────────────────┘  │
│                            │
│  ┌──┬──┬──┬──┐            │
│  │🏠│📋│🏆│👤│            │
│  └──┴──┴──┴──┘            │
└────────────────────────────┘
```

**Aturan**:
- Dashboard hanya bisa diakses setelah PIN benar.
- Data diperbarui setelah setiap sesi belajar selesai.
- Indikator per huruf/kata: ✅ (>80% benar), ⭐ (50-80%), ○ (<50% atau belum dicoba).
- Tap modul untuk melihat detail lebih lanjut.

---

#### 4.7 Layar: PinPad (Input PIN Orang Tua)

```
┌────────────────────────────┐
│                            │
│   Masukkan PIN Orang Tua  │
│                            │
│        ● ● ● ○            │  ← Indikator (4 digit)
│                            │
│   ┌───┬───┬───┐           │
│   │ 1 │ 2 │ 3 │           │
│   ├───┼───┼───┤           │
│   │ 4 │ 5 │ 6 │           │
│   ├───┼───┼───┤           │
│   │ 7 │ 8 │ 9 │           │
│   ├───┼───┼───┤           │
│   │ ⌫ │ 0 │ ✓ │           │  ← Hapus & Konfirmasi
│   └───┴───┴───┘           │
│                            │
│       [ Batal ]            │
│                            │
└────────────────────────────┘
```

**Aturan**:
- Indikator berubah ● (terisi) setiap digit dimasukkan.
- PIN otomatis diverifikasi setelah 4 digit (tanpa tekan konfirmasi).
- Jika salah: getar + indikator merah + reset. 3x salah → kunci 60 detik.
- Tombol ⌫ menghapus digit terakhir. Tombol ✓ bisa digunakan untuk konfirmasi manual.

---

### 5. Spesifikasi Teknis UI (untuk Agent Coder)

#### 5.1 State Management

| State | Deskripsi |
|-------|-----------|
| `idle` | Layar awal, belum ada interaksi. |
| `loading` | **Hanya** untuk fetching data besar (misal: sinkronisasi awal). Tidak boleh muncul di antara soal kuis. |
| `ready` | Data soal sudah matang, UI siap dirender tanpa flicker. |
| `correct` | Jawaban benar. Animasi positif. |
| `incorrect` | Jawaban salah. Opsi diredupkan, anak bisa coba lagi. |
| `timeout` | Timer belajar habis. Overlay muncul. |
| `error` | Koneksi bermasalah. Pesan ramah dengan ikon. |

#### 5.2 Audio Mapping

| Event | Audio |
|-------|-------|
| Halaman dimuat | TTS bacakan judul/instruksi |
| Tap tombol | SFX "klik" |
| Jawaban benar | TTS "Heba! Jawabanmu Benar!" + SFX celebrasi |
| Jawaban salah | TTS "Yuk, coba lagi!" + SFX lembut |
| Kuis selesai | SFX celebrasi + TTS bacakan skor |
| Timer habis | SFX alarm lembut |
| Streak bertambah | SFX api menyala |

#### 5.3 Responsive Behavior

- **Target**: Mobile-first (smartphone Android, layar 360-414dp lebar).
- **Tablet**: Layout yang sama, tapi ukuran elemen proporsional membesar (bukan layout berbeda).
- **Landscape**: Didukung, terutama tablet. Grid opsi bisa berubah dari 2x3 menjadi 3x2.

---

### 6. Komponen yang Perlu Dibangun

| Komponen | Tipe | Prioritas | Estimasi Kompleksitas |
|----------|------|-----------|----------------------|
| `AudioButton` | Atom | Must | Rendah |
| `TimerDisplay` | Molekul | Must | Rendah |
| `StreakIndicator` | Molekul | Must | Rendah |
| `OptionGrid` | Molekul | Must | Menengah |
| `AnswerSlot` | Molekul | Must | Menengah |
| `QuizScreen` | Organisme | Must | Tinggi |
| `ResultOverlay` | Organisme | Must | Menengah |
| `PinPad` | Organisme | Must | Menengah |
| `DashboardCard` | Organisme | Should | Rendah |
| `TextControlPanel` | Organisme | Should | Menengah |