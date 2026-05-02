# 09_adr.md

## Architecture Decision Records: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Setuju |

---

### 1. Tujuan Dokumen

Mencatat seluruh keputusan arsitektur signifikan yang diambil untuk SAYA BACA. Setiap ADR mendokumentasikan konteks, keputusan, alternatif yang dipertimbangkan, dan konsekuensi. Dokumen ini menjadi referensi bagi Agent Coder dan pengembang masa depan untuk memahami *mengapa* arsitektur dirancang demikian.

---

### 2. ADR-001: Microkernel / Plug-in Architecture

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-01 |
| **Konteks** | Aplikasi akan terus berkembang dengan modul belajar baru. Admin harus bisa menambah konten tanpa menyentuh kode inti. |
| **Keputusan** | Menggunakan arsitektur Microkernel. Core system menyediakan kerangka (routing, DI container, event bus, 4 Engine). Setiap modul belajar adalah plug-in yang mendaftarkan diri ke core. |
| **Alternatif** | (1) Monolith modular — lebih sederhana, tapi setiap modul baru butuh deploy ulang. (2) Microservices — overkill untuk skala ini, kompleksitas operasional tinggi. |
| **Konsekuensi** | ✅ Modul baru bisa ditambahkan tanpa ubah core. ✅ Admin cukup isi bank data. ❌ Disiplin tinggi diperlukan untuk menjaga batas core dan plug-in. Agent Coder wajib mematuhi kontrak interface. |

---

### 3. ADR-002: 4 Engine sebagai Core System

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-01 |
| **Konteks** | Bank data, pembuatan soal, masking, dan penilaian harus terpusat agar modul tidak redundan. |
| **Keputusan** | Memecah logika konten menjadi 4 engine: Bank Data Engine, Quiz Engine, Masking Engine, Result Engine. Setiap engine bertanggung jawab pada satu bounded context DDD. |
| **Alternatif** | (1) Setiap modul membawa logikanya sendiri — redundan, tidak skalabel. (2) Satu engine monolitik — kopling tinggi, sulit diubah. |
| **Konsekuensi** | ✅ Modul hanya kirim aturan, engine yang bekerja. ✅ UI terima data matang. ❌ Desain antar-engine harus jelas (anti-corruption layer). Agent Coder harus implementasi kontrak API antar-engine. |

---

### 4. ADR-003: DDD Bounded Context

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-01 |
| **Konteks** | Sistem memiliki domain yang berbeda: Konten (Bank Data), Kuis (Quiz Engine), Gamifikasi (XP/Streak), Pengguna (Auth/Profil). |
| **Keputusan** | Setiap domain menjadi bounded context terpisah dengan model domain sendiri. Komunikasi antar context melalui event bus atau interface. |
| **Bounded Context** | 1. **Content Context** (Bank Data, masking rules). 2. **Quiz Context** (Quiz Engine, Masking Engine, Result Engine). 3. **Gamification Context** (XP, Level, Streak, Leaderboard). 4. **User Context** (Auth, Profil, PIN). 5. **Parental Control Context** (Timer, Text Control). |
| **Konsekuensi** | ✅ Setiap tim/agen bisa bekerja paralel di context berbeda. ❌ Anti-corruption layer wajib antar context. Tidak boleh ada direct DB access lintas context. |

---

### 5. ADR-004: Next.js + PWA

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-01 |
| **Konteks** | Aplikasi harus bisa diinstal di homescreen, offline-ready, dan tetap menggunakan ekosistem React. |
| **Keputusan** | Menggunakan Next.js dengan konfigurasi PWA (manifest, service worker, offline caching). |
| **Alternatif** | (1) React + Vite + PWA plugin — tidak ada SSR/SSG, SEO jelek (tidak prioritas). (2) React Native — lebih native, tapi dua codebase. |
| **Konsekuensi** | ✅ Satu codebase web + PWA. ✅ Next.js mendukung SSG untuk konten belajar (load cepat). ❌ Offline sync butuh strategi jelas (IndexedDB/lokal storage). |

---

### 7. ADR-007: Neobrutalism UI Design

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-02 |
| **Konteks** | Aplikasi membutuhkan identitas visual yang kuat, ramah anak namun tetap modern dan berkarakter. |
| **Keputusan** | Menggunakan gaya **Neobrutalism**. Karakteristik: Background warm cream, border hitam tebal (2px+), shadow hitam tajam (hard shadow), dan tipografi bold. |
| **Konsekuensi** | ✅ Tampilan sangat distingtif dan kontras (bagus untuk aksesibilitas anak). ✅ Mudah diimplementasikan dengan Tailwind utility. ❌ Membutuhkan konsistensi tinggi pada setiap komponen agar tidak terlihat berantakan. |

---

### 8. ADR-008: Dual TTS Engine Strategy

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-02 |
| **Konteks** | Kualitas suara sangat krusial. Browser native TTS bervariasi kualitasnya, sementara Cloud TTS lebih konsisten namun berbiaya. |
| **Keputusan** | Mengimplementasikan dua engine: (1) Native Browser TTS sebagai default, (2) Google Cloud TTS sebagai opsi premium/lanjutan. Sistem wajib memiliki mekanisme "Global Wait" — interaksi dihentikan sampai suara selesai diputar. |
| **Konsekuensi** | ✅ Fleksibilitas kualitas suara. ✅ Menghindari audio overlap yang membingungkan anak. ❌ Implementasi lebih kompleks karena harus menangani state `isSpeaking` secara global. |

---

### 6. ADR-005: Firebase Auth + Anonim

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-01 |
| **Konteks** | Orang tua harus login cepat (Google) atau langsung pakai (anonim). Akun anonim harus bisa ditautkan nanti. |
| **Keputusan** | Menggunakan Firebase Authentication dengan 2 provider: Google Sign-In dan Anonymous Sign-In. |
| **Alternatif** | (1) Auth kustom — perlu kelola password, reset, dll. Mahal. (2) Hanya Google — hambatan untuk yang mau coba dulu. |
| **Konsekuensi** | ✅ Implementasi cepat, aman. ✅ Firebase menyediakan account linking bawaan. ❌ Vendor lock-in Firebase. ❌ Perlu strategi migrasi data anonim ke Google (Firebase handle ini). |

---

### 7. ADR-006: Data Soal Matang (Pre-Processed)

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-01 |
| **Konteks** | Anak tidak boleh melihat flicker atau loading antar soal. Data harus sudah siap di frontend sebelum ditampilkan. |
| **Keputusan** | Semua soal untuk satu sesi kuis/latihan di-generate sekaligus oleh engine sebelum layar kuis dirender. Frontend menerima array soal lengkap (teks, opsi, jawaban benar, audio URL/base64). |
| **Alternatif** | (1) Fetch soal satu per satu — flicker, latency terasa. (2) Semua soal di-generate di frontend — melanggar Dumb UI, logika di UI. |
| **Konsekuensi** | ✅ UX mulus, transisi <500ms. ✅ Frontend tetap Dumb UI. ❌ Ukuran payload lebih besar untuk satu sesi (10 soal + opsi). Mitigasi: payload kecil (teks + URL audio). |

---

### 8. ADR-009: Educational Content Structure & UI/TTS Mapping

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-02 |
| **Konteks** | Kurikulum (abjad, vokal, suku kata, kalimat) memerlukan pemetaan bertahap. UI belajar tidak boleh memiliki scroll (menjaga fokus anak) sehingga butuh pagination dengan grid dinamis. Selain itu, TTS native sering salah melafalkan gabungan 2 huruf (misal: "ba" dibaca "b-a") sehingga butuh override teks khusus untuk speech. Schema Firestore harus berbahasa Inggris, meski kontennya bahasa Indonesia. |
| **Keputusan** | 1. **Database Schema:** Menggunakan entity `ContentItem` abstrak dengan field `type` (letter, syllable, word), `text` (untuk UI), dan `speechText` (override opsional untuk TTS Native). <br/> 2. **UI Grid Engine:** Menggunakan paginated grid (contoh: 3x3) dinamis yang otomatis memotong array list dan berpindah halaman tanpa scroll. Mendukung text scaling ke depan. <br/> 3. **TTS Wrapper:** Logika pelafalan diutamakan pada `item.speechText || item.text`. |
| **Konsekuensi** | ✅ Admin bisa inject konten via form dinamis dengan schema JSON. ✅ Anak selalu disiplin dalam grid tanpa scroll. ✅ Pelafalan TTS sangat akurat untuk suku kata. ❌ Kompleksitas dalam pengolahan pagination dinamis dan styling responsif text size. |

---

### 9. ADR-010: Normalisasi Data Server (Menghindari Circular JSON)

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-02 |
| **Konteks** | Terjadi risiko error saat Next.js Server Components mengirim data kompleks yang memiliki relasi melingkar (circular JSON) ke Client Components sebagai props. Webpack atau bundler internal Next.js (khususnya update versi terbaru) bisa crash atau menghasilkan payload tidak valid bila merender data referensi rekursif. |
| **Keputusan** | Menetapkan standarisasi formating sisi server sebelum data dikirim ke frontend: <br/>1. **Gunakan DTO (Data Transfer Object)**: Bentuk representasi data sederhana/flat (plain object). Relasi resiprokal dilepas.<br/>2. **Aturan ESLint**: Menambahkan dan menegakkan rule `import/no-cycle` untuk mendeteksi dependensi file/modul yang siklik sedini mungkin di level pengembangan.<br/>3. **Penggunaan Pustaka `flatted`**: Bila mutlak membutuhkan pengiriman grafik data utuh dengan referensi melingkar, gunakan `flatted` (`parse` / `stringify`). Namun DTO tetap menjadi standar utama. |
| **Konsekuensi** | ✅ Mencegah error crash rendering di Next.js saat pass props dari server ke client.<br/>✅ Kode API / Server action menjadi lebih bersih karena memfilter properti sebelum dikirim, mengurangi ukuran payload.<br/>❌ Ada extra effort membuat dan me-maintain interface DTO khusus respons. |

---

### 10. ADR-011: Upgrade ke Next.js 16.2.4 (Stable Version)

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-02 |
| **Konteks** | Tedapat notifikasi bahwa versi Webpack pada Next.js 15 telah kadaluarsa / outdated. Terdapat dua pilihan upgrade: ke versi Canary atau versi stabil 16.2.4. |
| **Keputusan** | Menggunakan rilis **Stable 16.2.4**. Menjadikan versi ini sebagai referensi utama framework frontend SAYA BACA. |
| **Alternatif** | Menggunakan Next.js Canary. Ditolak karena fitur terbaru tidak dibutuhkan segera dan risiko ketidakstabilan pada environment CI/CD. |
| **Konsekuensi** | ✅ Perbaikan pada isu webpack bawaan Next 15.<br/>✅ Stabilitas framework jangka panjang di production. |

---

### 11. ADR-012: Arsitektur Gamified Navigation & Context-Aware Layout

| Atribut | Detail |
|---------|--------|
| **Status** | Disetujui |
| **Tanggal** | 2026-05-02 |
| **Konteks** | Flow UI aplikasi perlu mencerminkan standar "*Gamified Ed-Tech*" terbaik. Saat ini logic profile terperangkap dalam Modal Dashboard, BottomNav mengganggu area layar saat belajar, format Quiz kurang *immersive*, dan tidak ada Avatar randomizer generator. |
| **Keputusan** | Mengaplikasikan desain flow berdasarkan `UI_UX_FLOW.md`: <br/>1. **Isolated Profile Screen**: Mengubah popup profil menjadi Screen khusus `/profiles` sebelum masuk Main Dashboard.<br/>2. **Avatar DiceBear Integration**: Menerapkan 6 *randomized grid avatar* di layar Add Profile.<br/>3. **Context-Aware Navigation**: Merekayasa `BottomNav` untuk hilang (*hidden*) dan `TopBar` berubah menjadi **HUD Game** (Menyajikan sapaan, Badge Level, Pill Points, Pill EXP, Dropdown Options) saat berada di rute Learning/Quiz.<br/>4. **Auto-Next Engine**: Pagination dan pergerakan antar soal quiz berjalan automatis + instant feedback, tanpa scroll vertikal. Layar result quiz dipisah jadi Full Screen Score Page. |
| **Konsekuensi** | ✅ Flow lebih profesional layaknya game betulan.<br/>✅ Area sentuh belajar menjadi 100% *no-scroll interference*.<br/>❌ Kompleksitas routing dan state management akan meningkat dan memaksa penggunakan *Zustand store global* untuk memanipulasi visibility layout. |
