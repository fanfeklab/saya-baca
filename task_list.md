# Task List - SAYA BACA

## 🏗️ Phase 1: Scaffolding & Setup [DONE]
- [x] Initial Scaffolding (Next.js + Tailwind v4)
- [x] Font Configuration (Space Grotesk, Inter, Comic Neue)
- [x] Global CSS & Theme Setup (Neobrutalism Style)
- [x] Firebase Setup (Auth, Firestore)
- [x] Project Metadata & ADR Update
- [x] Route Groups Setup: `(auth)`, `(main)`, `(parent)`, `(admin)`

## 🎨 Phase 2: UI Components (Atomic Design)
- [x] Initialize Shadcn/UI
- [x] Setup Atomic Design Folder Structure
  - [x] `components/atoms` (Shadcn + Base elements)
  - [x] `components/molecules` (ModuleCard, Progress Bars, Stat Cards)
  - [x] `components/organisms` (TopBar, BottomNav, AuthForms)
  - [ ] `components/templates` (Page Context Layouts)
- [x] Implement Neobrutalism Theme (Border 2px, Solid Shadows, Radius 0)
- [x] Fix Tailwind v4 CSS issues (globals.css optimized)
- [ ] Parent PIN Keypad (Radix Dialog + Numeric Keypad Atom) (AC-007)
- [ ] Child Profile Creator (Forms + Avatar Selection) (AC-003)

## 🧪 Phase 3: Core Logic & Context [ON HOLD]
- [x] Auth Context (Google & Anonymous) (AC-001, AC-002)
- [x] TTS Engine Hook (Native Browser) (AC-404)
- [x] Seed Data Logic (Word Bank) (AC-301)
- [x] Firestore Error Handling & Connection Guard (Security Requirement)
- [ ] Profile Store (Switching profil + State persistence) (AC-004)
- [ ] Parent Guard (PIN Logic + 60s Lockout + Reset via Email) (AC-006, AC-008)
- [ ] Progress Tracker (Firestore Sync: Word mastery, XP, Streaks) (AC-201, AC-204)
- [ ] Quiz Engine (Sequence unlocking logic: Modul 1 -> Modul 2) (AC-114)
- [x] UI Grid Engine (Pagination dinamis, no-scroll UI) untuk Learn Pages
- [x] TTS Override Logic (Logika baca `speechText` vs `displayText`)
- [ ] Gamification Store (Zustand: Energy, Points, Streak, HUD Layout Visibility) (AC-208, AC-209, AC-210)

## 🎮 Phase 4: Modules & Gamification [ON HOLD]
- [ ] UI/UX Restructure: Isolated Profile Screen & Randomizer Avatar DiceBear (US-003, ADR-012)
- [ ] UI/UX Restructure: Immersive HUD TopBar & Context-Aware BottomNav (ADR-012)
- [ ] Module: Mengenal Abjad (Visual + TTS + Quiz) (AC-102)
- [ ] Module: Suku Kata (Masking Logic: ba-bi-bu) (AC-104)
- [ ] Module: Merakit Kalimat (Tokenization logic) (AC-110)
- [ ] Reward System (Star Animation 1-5, Stickers, Level Up) (AC-203, AC-206)
- [ ] Game Feature: Mascot Dinamis (Feedback Senyum/Semangat) (AC-211)
- [ ] Game Feature: Boss Battle Engine (Monster di akhir topik) (AC-212)
- [ ] Game Feature: Fun Games / Minigame Mode (Timer, Combo Multiplier) (AC-213)

## 🔒 Phase 5: Parent Portal & Admin
- [ ] Parent Dashboard (Real-time charts: Progress, Time spent) (AC-405)
- [ ] Settings (TTS Toggle, Text Scaling, Uppercase Toggle) (AC-107, AC-404, AC-408)
- [ ] Admin Bank Data (CRUD ContentItem via Dynamic Form) (AC-301)

## 🚀 Phase 6: Finalization & PWA
- [ ] PWA Configuration (Manifest, Service Worker, Offline Assets) (AC-501)
- [ ] Global Error Handling (Firestore specific handlers)
- [ ] E2E Testing (Auth flow, Quiz flow)
- [ ] Final Build & Cloud Run Optimization
