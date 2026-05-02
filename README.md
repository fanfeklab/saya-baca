# Saya Baca

Aplikasi belajar membaca interaktif berbasis web untuk anak usia prasekolah dan pendidikan usia dini. Dirancang dengan desain Neobrutalism yang memikat anak, modul ini berisikan belajar huruf abjad, suku kata vokal, susun kalimat, beserta gamifikasi ringan. 

## Fitur Unggulan

- **Modul Baca Terstruktur:** Dari abjad, suku kata hingga membaca kalimat sederhana.
- **Audio & TTS (Text-to-Speech):** Ejaan disesuaikan dengan pengucapan asli per suku kata bahasa Indonesia.
- **Parental Controls:** Modul ini memiliki mode Dashboard Orang Tua yang dilindungi fitur PIN 4-digit secara aman.
- **UI Aman Anak:** Tidak ada scroll di area bermain (Single touch layout). UI dinamis melalui custom pagination.

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS V4 + Neobrutalism 
- **Database:** Firebase (Firestore) & Firebase Auth (Google Login)
- **Animations:** Framer Motion

## Setup & Development

Sistem dideploy melalui CI/CD ke Vercel. 
Terdapat `.env.example` file untuk merujuk pada variable environment yang dibutuhkan (Khususnya variabel Firebase & Gemini).

```sh
npm install
npm run dev
```

### Konfigurasi Variabel Environment

Buat `.env.local` berdasarkan `env.example`.

### Architecture & Routing

- `/main/*`: Layout utama bagi anak dan dashboard orang tua.
- `/admin/*`: Administrator area untuk input dan CRUD Bank Data Soal.
