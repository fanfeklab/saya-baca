# Saya Baca - UI Kit

Aplikasi ini merupakan **UI Kit murni (Mocks & Templates)** tanpa backend wiring untuk saat ini, didesain untuk departemen terkait dalam pengerjaan wiring dan bisnis logik. 

Ini adalah versi UI Kit. Repository asli (real apps) akan berdampingan dengan [fanfeklab/saya-baca](https://github.com/fanfeklab/saya-baca), sedangkan ini adalah repository prototype [fanfeklab/saya-baca-ui-kit](https://github.com/fanfeklab/saya-baca-ui-kit).

Platform "Saya Baca" merupakan platform edukasi interaktif untuk anak dengan pendekatan gamifikasi (mobile-first), dipadukan dengan sistem dashboard bergaya ERP untuk fungsi admin dalam hal manajemen pengguna, analitik, dan kurikulum (desktop-first).

&copy; fanfek Tech Lab. All Rights Reserved.

## 🚀 Fitur Utama & Struktur Proyek

Proyek ini dibangun berdasarkan prinsip **Atomic Design** dan **Domain-Driven Design**.

- `(marketing)`: Halaman pendaratan (Landing Page) publik.
- `(main-app)`: Area interaktif untuk Anak dan Orang Tua bergaya *mobile-native* (Home, Games, Profil).
- `(dashboard)`: Area admin dan instruktur (Analytics, Content Management) bergaya ERP/Dashboard desktop.
- `components/devtools`: Tools khusus pengembang untuk bernavigasi dan mengontrol *state* (Tersedia tombol floating di layar saat mode non-production).

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library UI**: [React 19](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: Framer Motion (Soon)
- **Icons**: Lucide React

## 📦 Panduan Menjalankan di Lokal (Local Development)

Pastikan Anda memiliki Node.js versi 18 atau 20 ke atas.

1. Install dependensi:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka browser dan arahkan ke [http://localhost:3000](http://localhost:3000).

## 📂 Struktur Folder
- `app/`: Routing aplikasi utama berbasis Next.js App Router.
- `components/`: Kumpulan komponen React terpisah menjadi `atoms`, `molecules`, `organisms`, `templates`, dan `ui` (shadcn).
- `lib/`: Fungsi utilitas bantuan (`cn()`).

## ⚙️ CI/CD & Deployment

Konfigurasi aksi otomatis (GitHub Actions) tersedia di dalam direktori `.github/workflows`:
- **ci.yml**: Menjalankan *linting*, *type checking*, dan uji bangun (build) setiap kali ada *Push* atau *Pull Request* ke branch `main`.
- **deploy.yml**: Placeholder untuk proses pengiriman (deployment) ke Vercel atau Cloud Run.
