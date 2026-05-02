# 12_api_spec.md

## API Specification: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Final |

---

### 1. Tujuan Dokumen

Dokumen ini mendefinisikan kontrak API untuk SAYA BACA. Setiap endpoint didesain dengan prinsip **API First**, mengikuti konvensi RESTful, dan akan diimplementasikan sebagai Next.js API Route Handlers. Dokumen ini menjadi kontrak bagi Agent Coder untuk implementasi backend dan frontend.

---

### 2. Konvensi API

| Aturan | Detail |
|--------|--------|
| **Base Path** | `/api/v1` |
| **Format** | JSON request/response body |
| **Versioning** | URL prefix (`/v1/`). Versi baru (`/v2/`) jika ada breaking changes. |
| **Auth** | Firebase ID token di header `Authorization: Bearer <token>`. Untuk endpoint anak, token berisi klaim `profile_id`. |
| **Rate Limiting** | 100 request/menit per IP untuk endpoint umum. 30 request/menit untuk endpoint generate quiz. |
| **Pagination** | Query params: `?page=1&limit=20`. Response wrapper: `{ data: [], meta: { page, limit, total } }`. |
| **Error Response** | `{ error: { code: string, message: string, details?: any } }` |

---

### 3. Autentikasi & Profil

#### 3.1 Verify Token & Get/Link Account

| Method | Path | Deskripsi |
|--------|------|-----------|
| `POST` | `/api/v1/auth/verify` | Verifikasi Firebase token, buat akun jika belum ada, kembalikan data akun. |
| `POST` | `/api/v1/auth/link-anonymous` | Tautkan akun anonim ke Google. Body: `{ anonymousToken: string }`. |

**Response `POST /auth/verify` (200)**:
```json
{
  "account_id": "uuid",
  "firebase_uid": "abc123",
  "is_anonymous": false,
  "profiles": [
    {
      "id": "uuid",
      "display_name": "Bima",
      "avatar": "matahari"
    }
  ]
}
```

#### 3.2 Profil Anak

| Method | Path | Deskripsi |
|--------|------|-----------|
| `GET` | `/api/v1/profiles` | Dapatkan semua profil anak dalam akun. |
| `POST` | `/api/v1/profiles` | Buat profil anak baru. |
| `PUT` | `/api/v1/profiles/:id` | Update profil (nama, avatar). |
| `DELETE` | `/api/v1/profiles/:id` | Hapus profil dan semua data terkait. |

**Request `POST /profiles`**:
```json
{
  "display_name": "Bima",
  "avatar": "matahari"
}
```

#### 3.3 PIN

| Method | Path | Deskripsi |
|--------|------|-----------|
| `PUT` | `/api/v1/profiles/:id/pin` | Set atau ubah PIN. Body: `{ pin: "1234" }`. |
| `POST` | `/api/v1/profiles/:id/pin/verify` | Verifikasi PIN. Body: `{ pin: "1234" }`. |

---

### 4. Bank Data Engine (Admin — Should v1.1)

| Method | Path | Deskripsi |
|--------|------|-----------|
| `GET` | `/api/v1/admin/words` | List semua kata (paginated, filterable). |
| `POST` | `/api/v1/admin/words` | Tambah kata baru. |
| `PUT` | `/api/v1/admin/words/:id` | Update kata. |
| `DELETE` | `/api/v1/admin/words/:id` | Soft-delete kata. |
| `GET` | `/api/v1/admin/sentences` | List semua kalimat. |
| `POST` | `/api/v1/admin/sentences` | Tambah kalimat baru. |
| `PUT` | `/api/v1/admin/sentences/:id` | Update kalimat. |
| `DELETE` | `/api/v1/admin/sentences/:id` | Soft-delete kalimat. |

**Request `POST /admin/words`**:
```json
{
  "word": "pesawat",
  "level": 1,
  "category": "transportasi",
  "emoji": "🛫",
  "tags": ["kendaraan", "udara"],
  "audio_url": "https://..."
}
```

---

### 5. Quiz Engine — Generate Soal

| Method | Path | Deskripsi |
|--------|------|-----------|
| `POST` | `/api/v1/quiz/generate` | Generate satu sesi soal berdasarkan aturan modul. |

**Request Body**:
```json
{
  "profile_id": "uuid",
  "module_type": "vokal",
  "quiz_type": "susun_suku_kata",
  "difficulty_level": 1,
  "question_count": 5,
  "mask_rules": {
    "mode": "susun_suku_kata",
    "distractor_count": 3
  },
  "result_rules": {
    "xp_per_correct": 10,
    "bonus_xp_perfect": 50,
    "bintang_thresholds": [40, 60, 75, 90]
  }
}
```

**Response (200)**:
```json
{
  "session_id": "uuid",
  "questions": [
    {
      "index": 0,
      "target_word": "CUCI",
      "target_word_id": "uuid",
      "audio_url": "https://...",
      "slots": 2,
      "options": [
        { "id": "1", "text": "cu", "is_distractor": false },
        { "id": "2", "text": "ci", "is_distractor": false },
        { "id": "3", "text": "ze", "is_distractor": true },
        { "id": "4", "text": "zo", "is_distractor": true }
      ],
      "correct_answer": ["cu", "ci"]
    }
  ]
}
```

---

### 6. Result Engine — Submit Jawaban & Skor Akhir

#### 6.1 Submit Jawaban Per Soal

| Method | Path | Deskripsi |
|--------|------|-----------|
| `POST` | `/api/v1/quiz/:sessionId/answer` | Submit jawaban untuk satu soal. |

**Request Body**:
```json
{
  "question_index": 0,
  "user_answer": ["cu", "ci"]
}
```

**Response (200)**:
```json
{
  "is_correct": true,
  "xp_earned": 10,
  "correct_answer": ["cu", "ci"]
}
```

#### 6.2 Selesaikan Sesi

| Method | Path | Deskripsi |
|--------|------|-----------|
| `POST` | `/api/v1/quiz/:sessionId/complete` | Akhiri sesi kuis, hitung skor akhir. |

**Response (200)**:
```json
{
  "total_questions": 5,
  "correct_count": 4,
  "percentage": 80,
  "bintang": 4,
  "total_xp_earned": 40,
  "bonus_xp": 0,
  "streak": 5,
  "level_up": false
}
```

---

### 7. Gamification

| Method | Path | Deskripsi |
|--------|------|-----------|
| `GET` | `/api/v1/gamification/:profileId/stats` | Dapatkan statistik gamifikasi (XP, level, streak). |
| `GET` | `/api/v1/gamification/:profileId/xp-history` | Riwayat transaksi XP (paginated). |

**Response `GET /stats`**:
```json
{
  "total_xp": 850,
  "current_level": 4,
  "xp_to_next_level": 150,
  "current_streak": 5,
  "longest_streak": 7
}
```

---

### 8. Parental Control

#### 8.1 Timer & Text Control

| Method | Path | Deskripsi |
|--------|------|-----------|
| `GET` | `/api/v1/parental/:profileId/settings` | Dapatkan semua pengaturan. |
| `PUT` | `/api/v1/parental/:profileId/timer` | Update timer. Body: `{ timer_minutes: 30 }`. |
| `PUT` | `/api/v1/parental/:profileId/text-control` | Update text control. Body: `{ font_scale: "large", tts_enabled: true, ... }`. |

#### 8.2 Dashboard

| Method | Path | Deskripsi |
|--------|------|-----------|
| `GET` | `/api/v1/parental/:profileId/dashboard` | Ringkasan dashboard. |
| `GET` | `/api/v1/parental/:profileId/dashboard/module/:moduleType` | Detail per modul. |

**Response `GET /dashboard`**:
```json
{
  "modules_completed": "2/3",
  "average_bintang": 4.2,
  "total_xp": 850,
  "weekly_learning_minutes": 135,
  "streak": 5,
  "module_details": [
    {
      "type": "abjad",
      "progress": "2/3",
      "average_bintang": 4.5,
      "items": [
        { "char": "a", "status": "mastered" },
        { "char": "b", "status": "mastered" }
      ]
    }
  ]
}
```

---

### 9. Leaderboard (Should v1.1)

| Method | Path | Deskripsi |
|--------|------|-----------|
| `GET` | `/api/v1/leaderboard/global` | Global leaderboard (top 20). |
| `GET` | `/api/v1/leaderboard/daily` | Daily leaderboard (reset 00:00 WIB). |

**Response**:
```json
{
  "leaderboard": [
    { "rank": 1, "display_name": "Bim***", "avatar": "matahari", "xp": 1200 },
    { "rank": 2, "display_name": "Din***", "avatar": "bintang", "xp": 1150 }
  ],
  "my_rank": 15
}
```

---

### 10. Offline Sync

| Method | Path | Deskripsi |
|--------|------|-----------|
| `POST` | `/api/v1/sync/push` | Kirim data progres offline ke server. |
| `GET` | `/api/v1/sync/pull?since=timestamp` | Tarik data terbaru sejak timestamp. |

---

### 11. API Route Map (Next.js App Router)

```
src/app/api/v1/
├── auth/
│   ├── verify/route.ts
│   └── link-anonymous/route.ts
├── profiles/
│   ├── route.ts
│   └── [id]/
│       ├── route.ts
│       └── pin/
│           ├── route.ts
│           └── verify/route.ts
├── admin/
│   ├── words/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── sentences/
│       ├── route.ts
│       └── [id]/route.ts
├── quiz/
│   ├── generate/route.ts
│   └── [sessionId]/
│       ├── answer/route.ts
│       └── complete/route.ts
├── gamification/
│   └── [profileId]/
│       ├── stats/route.ts
│       └── xp-history/route.ts
├── parental/
│   └── [profileId]/
│       ├── settings/route.ts
│       ├── timer/route.ts
│       ├── text-control/route.ts
│       ├── dashboard/
│       │   ├── route.ts
│       │   └── module/[moduleType]/route.ts
├── leaderboard/
│   ├── global/route.ts
│   └── daily/route.ts
└── sync/
    ├── push/route.ts
    └── pull/route.ts
```