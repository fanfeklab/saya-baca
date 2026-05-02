# 17_coding_standards.md

## Coding Standards: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Dokumen ini mendefinisikan standar penulisan kode yang wajib dipatuhi oleh Agent Coder dan seluruh pengembang **SAYA BACA**. Standar ini memastikan kode bersih, konsisten, aman, dan mudah dipelihara sejalan dengan prinsip arsitektur yang telah ditetapkan.

---

### 2. Prinsip Umum

| Prinsip | Aturan |
|---------|--------|
| **Clean Code** | Kode harus mudah dibaca, sederhana, dan ekspresif. Nama variabel, fungsi, dan kelas harus deskriptif. |
| **No Magic Numbers/Strings** | Semua nilai literal harus diekstrak ke named constant, enum, atau environment variable. |
| **No Credentials in Code** | API key, secret, password, connection string **tidak boleh** ada di source code. Gunakan environment variable. |
| **Small Functions** | Fungsi maksimal 20 baris. Jika lebih, pecah menjadi fungsi lebih kecil dengan satu tanggung jawab. |
| **Pure Functions** | Sebisa mungkin gunakan pure function (tidak ada side effect, output hanya bergantung input). |
| **Immutability** | Data tidak boleh dimutasi langsung. Gunakan spread operator, `map`, `filter`, `reduce`. |
| **Composition over Inheritance** | Gunakan komposisi (HOC, hooks, render props) daripada inheritance class. |
| **No `any`** | Hindari `any`. Gunakan generic atau unknown jika perlu. |
| **No `var`** | Gunakan `const` (default) atau `let` jika perlu reassign. |

---

### 3. Naming Convention

| Elemen | Konvensi | Contoh |
|--------|----------|--------|
| **File** | kebab-case | `audio-button.tsx`, `use-quiz.ts`, `prisma.service.ts` |
| **Folder** | kebab-case | `orang-tua/`, `belajar/`, `audio-button/` |
| **Komponen React** | PascalCase | `AudioButton`, `QuizScreen`, `ResultOverlay` |
| **Hook** | camelCase, prefix `use` | `useQuiz`, `useAuth`, `useTimer` |
| **Fungsi** | camelCase, kata kerja | `generateQuiz`, `checkAnswer`, `calculateBintang` |
| **Variabel** | camelCase, kata benda | `questionCount`, `profileId`, `isPlaying` |
| **Konstanta** | UPPER_SNAKE_CASE | `MAX_QUESTIONS`, `DEFAULT_TIMER_MINUTES` |
| **Enum Member** | PascalCase | `ModuleType.Abjad`, `QuizType.CariHuruf` |
| **Interface/Type** | PascalCase, prefix `I` opsional | `Question`, `QuizSession`, `IOptionItem` |
| **Tabel Database** | snake_case, plural | `profiles`, `quiz_sessions`, `xp_transactions` |
| **Kolom Database** | snake_case, singular | `created_at`, `display_name`, `firebase_uid` |
| **API Route** | kebab-case | `/api/v1/quiz/generate`, `/api/v1/profiles/:id/pin` |

---

### 4. Struktur Kode

#### 4.1 Komponen React

```typescript
// Pola komponen (pseudocode, bukan implementasi)
const NamaKomponen = ({ prop1, prop2 }: NamaKomponenProps) => {
  // 1. Hooks di atas (useState, useEffect, custom hooks)
  // 2. Derived state (useMemo, useCallback)
  // 3. Event handler
  // 4. Render (JSX)
  // 5. Tidak ada business logic di sini!
};
```

#### 4.2 Hook Pattern

```typescript
// Hook harus mengembalikan data matang + action
// Pseudocode:
const useQuiz = (moduleType: ModuleType, profileId: string) => {
  // State management
  // API call via service
  // Transformasi data
  // Kembalikan { data, actions, status }
};
```

#### 4.3 Service Layer

```typescript
// Service hanya berisi fungsi fetch API
// Pseudocode:
const quizApi = {
  generate: async (params: GenerateQuizParams): Promise<QuizSession> => {
    // Panggil API
    // Transform response ke tipe internal
    // Kembalikan data matang
  }
};
```

#### 4.4 Engine Logic (Domain Layer)

```typescript
// Pure function, tidak boleh ada side effect
// Pseudocode:
const splitSyllables = (word: string): string[] => {
  // Algoritma pemecahan suku kata
  // Tidak boleh akses database, API, atau global state
};
```

---

### 5. Aturan Detail

#### 5.1 No Magic Numbers/Strings

| ❌ Dilarang | ✅ Diperbolehkan |
|------------|-----------------|
| `if (streak === 7)` | `if (streak === STREAK_BONUS_THRESHOLD)` |
| `setTimeout(fn, 1500)` | `setTimeout(fn, FEEDBACK_DURATION_MS)` |
| `if (status === "active")` | `if (status === ProfileStatus.Active)` |
| `fetch("/api/v1/quiz")` | `fetch(API_ROUTES.QUIZ_GENERATE)` |

**Semua konstanta** disimpan di `src/lib/constants.ts` atau `src/config/env.ts`.

#### 5.2 No Credentials in Code

| ❌ Dilarang | ✅ Diperbolehkan |
|------------|-----------------|
| `const apiKey = "sk-123..."` | `const apiKey = process.env.API_KEY` |
| `const dbUrl = "postgres://..."` | `const dbUrl = process.env.DATABASE_URL` |
| `const secret = "mysecret"` | `const secret = process.env.JWT_SECRET` |

**Semua kredensial** diambil dari environment variable dan tidak pernah di-hardcode atau di-commit.

#### 5.3 Small Functions

| ❌ Dilarang | ✅ Diperbolehkan |
|------------|-----------------|
| Fungsi 50 baris dengan banyak tanggung jawab. | Fungsi 5-20 baris dengan satu tanggung jawab jelas. |

**Aturan**:
- Fungsi maksimal 20 baris (tidak termasuk signature dan komentar).
- Jika lebih, pecah menjadi fungsi pembantu yang dinamai dengan jelas.
- Satu fungsi = satu aksi (Single Responsibility Principle).

#### 5.4 Pure Functions

| ❌ Dilarang | ✅ Diperbolehkan |
|------------|-----------------|
| Fungsi yang mengubah variabel global, memodifikasi parameter input, atau punya side effect tersembunyi. | Fungsi yang outputnya hanya bergantung pada inputnya. |

**Contoh Pure** (pseudocode): `calculateXP(answers: Answer[]): number`
**Contoh Impure** (hindari jika mungkin): `updateProfileAndNotify()` (pecah jadi dua: update + notify).

#### 5.5 Immutability

| ❌ Dilarang | ✅ Diperbolehkan |
|------------|-----------------|
| `obj.key = newValue` | `{ ...obj, key: newValue }` |
| `arr.push(item)` | `[...arr, item]` |
| `arr.sort()`  (mutasi in-place) | `[...arr].sort()` |

#### 5.6 Composition over Inheritance

| ❌ Dilarang | ✅ Diperbolehkan |
|------------|-----------------|
| `class MyButton extends BaseButton` | Komposisi: `const AudioButton = (props) => <Button icon={<Speaker />} {...props} />` |
| Mixin, deep inheritance chain. | Custom hooks, HOC, render props. |

---

### 6. TypeScript Strict Rules

| Aturan | Deskripsi |
|--------|-----------|
| `strict: true` | Wajib di `tsconfig.json`. |
| `noImplicitAny` | Tidak boleh ada `any` implisit. |
| `noUnusedLocals` | Tidak boleh ada variabel lokal yang tidak digunakan. |
| `noUnusedParameters` | Tidak boleh ada parameter fungsi yang tidak digunakan. |
| `exactOptionalPropertyTypes` | Opsional properti tidak boleh di-set `undefined` secara eksplisit. |
| `noUncheckedIndexedAccess` | Akses array/objek harus dicek undefined-nya. |

---

### 7. Import Order

Urutan import wajib (berdasarkan `.eslintrc`):

1.  Library eksternal (React, Next.js, Firebase)
2.  Library internal (UI Kit)
3.  Komponen (`@/components/*`)
4.  Hooks (`@/hooks/*`)
5.  Services (`@/services/*`)
6.  Stores (`@/stores/*`)
7.  Lib (`@/lib/*`)
8.  Types (`@/lib/types`)
9.  Styles

**Contoh**:
```
// 1. Eksternal
import { useState } from "react";
// 2. UI Kit
import { Button } from "@ui/atoms";
// 3. Komponen
import { QuizScreen } from "@/components/organisms";
// 4. Hooks
import { useQuiz } from "@/hooks";
```

---

### 8. Komentar & Dokumentasi

| Aturan | Deskripsi |
|--------|-----------|
| **JSDoc untuk API publik** | Setiap fungsi yang diekspor dari service, hook, atau engine wajib punya JSDoc dengan `@param` dan `@returns`. |
| **No dead comments** | Tidak boleh ada komentar yang di-comment-out (kode mati). Hapus saja. |
| **Explain WHY, not WHAT** | Komentar menjelaskan kenapa kode seperti itu, bukan apa yang dilakukan (karena kode sudah bicara). |

---

### 9. CSS / Styling

| Aturan | Deskripsi |
|--------|-----------|
| **CSS Modules atau Tailwind** | Gunakan yang sudah ada di UI Kit. Jangan campur pendekatan. |
| **No inline style** | Hindari inline style kecuali untuk nilai dinamis (progress bar width, animasi). |
| **Class naming** | Ikuti BEM jika CSS Modules: `Block__Element--Modifier`. |

---

### 10. Keamanan Kode

| Aturan | Deskripsi |
|--------|-----------|
| **Input Validation** | Semua input dari pengguna (parameter API, form) wajib divalidasi (Zod atau Yup). |
| **SQL Injection** | Gunakan Prisma ORM. Tidak boleh raw query dengan string interpolation. |
| **XSS** | Jangan gunakan `dangerouslySetInnerHTML` kecuali sangat terpaksa dan sudah disanitasi. |
| **Hardcoded Tokens** | Dilarang keras. `trufflehog` akan mendeteksi di CI. |
| **Logging** | Jangan log data sensitif (PIN, token, email lengkap). Gunakan structured logging (`pino`). |