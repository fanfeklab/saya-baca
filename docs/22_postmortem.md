# 22_postmortem.md

## Postmortem Template: SAYA BACA

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | SAYA BACA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-05-01 |
| **Status** | Template |

---

### 1. Tujuan Dokumen

Dokumen ini adalah **template postmortem** untuk setiap insiden yang terjadi di production. Postmortem wajib ditulis dalam 48 jam setelah insiden selesai ditangani. Tujuannya untuk belajar dari kegagalan, bukan untuk menyalahkan. Setiap postmortem yang sudah selesai disimpan di folder `docs/postmortem/` dengan nama file `YYYY-MM-DD-deskripsi-singkat.md`.

---

### 2. Template

```markdown
# Postmortem: [Judul Singkat Insiden]

| Atribut | Detail |
|---------|--------|
| **Tanggal Insiden** | YYYY-MM-DD |
| **Waktu Mulai** | HH:MM WIB |
| **Waktu Selesai** | HH:MM WIB |
| **Durasi** | X jam Y menit |
| **Severity** | [CRITICAL / HIGH / MEDIUM / LOW] |
| **Penulis** | [Nama] |
| **Status** | [Draft / Review / Selesai] |

---

### 1. Ringkasan

[Dalam 2-3 kalimat, jelaskan apa yang terjadi, dampaknya, dan siapa yang terdampak.]

---

### 2. Timeline

| Waktu | Kejadian |
|-------|----------|
| HH:MM | [Apa yang terjadi. Siapa yang mendeteksi. Bagaimana mendeteksinya (alert, user report, monitoring).] |
| HH:MM | [Tindakan pertama yang diambil.] |
| HH:MM | [eskalasi, jika ada.] |
| HH:MM | [Insiden selesai. Layanan pulih.] |

---

### 3. Dampak

- **Pengguna Terdampak**: [Estimasi jumlah/%. Semua? Hanya yang login Google? Hanya modul tertentu?]
- **Fitur Terganggu**: [Daftar fitur yang tidak berfungsi.]
- **Data Hilang/Rusak**: [Ya/Tidak. Jika ya, detail.]

---

### 4. Akar Masalah

[Penjelasan teknis tentang penyebab utama insiden. Bukan gejala, tapi akar terdalam. Gunakan "5 Whys" jika perlu.]

**Why 1**: [Kenapa insiden terjadi?]
**Why 2**: [Kenapa penyebab itu terjadi?]
**Why 3**: [Kenapa penyebab itu tidak terdeteksi?]
**Why 4**: [Kenapa monitoring/alert tidak bekerja?]
**Why 5**: [Kenapa proses tidak mencegah ini?]

---

### 5. Resolusi

[Langkah-langkah yang diambil untuk memulihkan layanan. Sebutkan jika ada rollback, feature flag dimatikan, atau perbaikan darurat.]

---

### 6. Action Items (Pencegahan)

| No | Tindakan | Penanggung Jawab | Deadline | Status |
|----|----------|-----------------|----------|--------|
| 1 | [Tindakan untuk mencegah akar masalah.] | [Nama] | YYYY-MM-DD | ☐ |
| 2 | [Tindakan untuk mendeteksi lebih cepat.] | [Nama] | YYYY-MM-DD | ☐ |
| 3 | [Tindakan untuk memitigasi dampak.] | [Nama] | YYYY-MM-DD | ☐ |

---

### 7. Pelajaran

- [Apa yang kita pelajari dari insiden ini?]
- [Apa yang bisa kita lakukan berbeda?]
- [Apakah ada asumsi yang salah?]

---

### 8. Lampiran

- [Link ke Sentry issue]
- [Link ke Slack diskusi]
- [Link ke PR fix]
- [Screenshot/grafik monitoring]
```

---

### 3. Contoh Pengisian (Hipotetis)

```markdown
# Postmortem: Quiz Engine Gagal Generate Soal Level 3

| Atribut | Detail |
|---------|--------|
| **Tanggal Insiden** | 2026-06-15 |
| **Waktu Mulai** | 14:30 WIB |
| **Waktu Selesai** | 15:15 WIB |
| **Durasi** | 45 menit |
| **Severity** | HIGH |
| **Penulis** | DevOps Agent |
| **Status** | Selesai |

---

### 1. Ringkasan

Quiz Engine gagal menghasilkan soal untuk modul "Merakit Kalimat" level 3. Error terjadi karena Bank Data Engine mengembalikan array kosong untuk level 3, dan Quiz Engine tidak menangani edge case array kosong dengan graceful degradation. 12 sesi kuis gagal dimulai.

---

### 2. Timeline

| Waktu | Kejadian |
|-------|----------|
| 14:30 | Alert Sentry: `TypeError: Cannot read property 'length' of undefined` di Quiz Engine. |
| 14:35 | Developer cek log, temukan bahwa query Bank Data level 3 mengembalikan [ ]. |
| 14:45 | Ditemukan bahwa admin belum mengisi data level 3 di Bank Data. |
| 15:00 | Feature flag `ENABLE_LEVEL_3` dimatikan untuk mencegah error lebih lanjut. |
| 15:15 | Layanan pulih. Modul level 3 tidak tersedia sementara. |

---

### 3. Dampak

- **Pengguna Terdampak**: 12 anak yang mencoba memulai kuis "Merakit Kalimat" level 3.
- **Fitur Terganggu**: Kuis level 3 di modul "Merakit Kalimat".
- **Data Hilang**: Tidak ada.

---

### 4. Akar Masalah

**Why 1**: Quiz Engine error saat Bank Data mengembalikan array kosong.
**Why 2**: Quiz Engine tidak punya handling untuk edge case array kosong.
**Why 3**: Unit test tidak mencakup edge case array kosong.
**Why 4**: Review code tidak menangkap hal ini.
**Why 5**: Standar "edge case testing" tidak ditegakkan di proses review.

---

### 5. Resolusi

Matikan level 3 via feature flag. Admin mengisi data level 3 malam itu. Fix di-merge keesokan harinya.

---

### 6. Action Items

| No | Tindakan | Penanggung Jawab | Deadline | Status |
|----|----------|-----------------|----------|--------|
| 1 | Tambahkan handling array kosong di semua engine. | Dev A | 2026-06-17 | ✅ |
| 2 | Tambahkan unit test untuk edge case array kosong. | Dev A | 2026-06-17 | ✅ |
| 3 | Perbarui checklist code review: "Apakah edge case sudah di-test?" | Tech Lead | 2026-06-18 | ✅ |
| 4 | Admin panel tambahkan peringatan jika modul aktif tapi Bank Data kosong. | Dev B | 2026-06-22 | ☐ |

---

### 7. Pelajaran

- Semua engine harus menangani edge case input kosong.
- Feature flag sangat memudahkan mitigasi cepat.
- Unit test harus mencakup "happy path" dan "sad path".
```

---

### 4. Aturan Postmortem

| Aturan | Detail |
|--------|--------|
| **Blameless** | Fokus pada sistem dan proses, bukan individu. Tidak boleh menyalahkan orang tertentu. |
| **Wajib untuk Severity CRITICAL & HIGH** | Setiap insiden besar wajib ada postmortem. |
| **48 Jam** | Postmortem harus mulai ditulis dalam 48 jam setelah insiden selesai. |
| **Review Tim** | Postmortem direview oleh tim teknis sebelum ditutup. |
| **Action Items Terukur** | Setiap action item harus punya penanggung jawab dan deadline. |