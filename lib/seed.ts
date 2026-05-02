import { db } from './firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';

export interface WordBankData {
  id: string;
  word: string;
  syllables: string[];
  levels: {
    1: string; // e.g. P _ S A W A T
    2: string; // e.g. PE __ SA WA T
    3: string; // e.g. PE SA ___
  };
  category: 'benda' | 'hewan' | 'makanan' | 'kerja' | 'kalimat';
  emoji: string;
  difficulty: number; // 1: simple, 2: complex, 3: phrase, 4: sentence
}

const RAW_WORDS = [
  // LVL 1: 2 syllables vokal
  { word: 'SAYA', syllables: ['SA', 'YA'], cat: 'kerja', emoji: '🙋', diff: 1 },
  { word: 'MAYA', syllables: ['MA', 'YA'], cat: 'benda', emoji: '✨', diff: 1 },
  { word: 'BOLA', syllables: ['BO', 'LA'], cat: 'benda', emoji: '⚽', diff: 1 },
  { word: 'BUDI', syllables: ['BU', 'DI'], cat: 'benda', emoji: '👦', diff: 1 },
  { word: 'MEJA', syllables: ['ME', 'JA'], cat: 'benda', emoji: '🪑', diff: 1 },
  { word: 'BUKU', syllables: ['BU', 'KU'], cat: 'benda', emoji: '📖', diff: 1 },
  { word: 'TOPI', syllables: ['TO', 'PI'], cat: 'benda', emoji: '🎩', diff: 1 },
  { word: 'BAJU', syllables: ['BA', 'JU'], cat: 'benda', emoji: '👕', diff: 1 },
  { word: 'BABI', syllables: ['BA', 'BI'], cat: 'hewan', emoji: '🐷', diff: 1 },
  
  // LVL 2: 2 vokal & 3 konsonan
  { word: 'KURSI', syllables: ['KUR', 'SI'], cat: 'benda', emoji: '🪑', diff: 2 },
  { word: 'PAGAR', syllables: ['PA', 'GAR'], cat: 'benda', emoji: '🚧', diff: 2 },
  { word: 'MOBIL', syllables: ['MO', 'BIL'], cat: 'benda', emoji: '🚗', diff: 2 },
  { word: 'MOTOR', syllables: ['MO', 'TOR'], cat: 'benda', emoji: '🏍️', diff: 2 },
  { word: 'MELON', syllables: ['ME', 'LON'], cat: 'makanan', emoji: '🍈', diff: 2 },
  { word: 'BAKSO', syllables: ['BAK', 'SO'], cat: 'makanan', emoji: '🍲', diff: 2 },
  { word: 'TIDUR', syllables: ['TI', 'DUR'], cat: 'kerja', emoji: '😴', diff: 2 },
  
  // Phrasal items
  { word: 'SAYA SUKA SATE', syllables: ['SA', 'YA', 'SU', 'KA', 'SA', 'TE'], cat: 'kalimat', emoji: '🍢', diff: 3 },
  { word: 'BUDI BELI TOPI', syllables: ['BU', 'DI', 'BE', 'LI', 'TO', 'PI'], cat: 'kalimat', emoji: '🛒', diff: 3 },
  { word: 'MOBIL JALAN MALAM', syllables: ['MO', 'BIL', 'JA', 'LAN', 'MA', 'LAM'], cat: 'kalimat', emoji: '🌃', diff: 4 },
];

function generateMasks(word: string, syllables: string[]) {
  // Simple logic for level-based masking
  if (word.includes(' ')) {
    // For sentences, mask words
    const words = word.split(' ');
    return {
      1: words.map((w, i) => i === 1 ? '_'.repeat(w.length) : w).join(' '),
      2: words.map((w, i) => i > 0 ? '_'.repeat(w.length) : w).join(' '),
      3: words[0] + ' ' + '_'.repeat(word.length - words[0].length - 1)
    };
  }

  // For single words, mask syllables
  return {
    1: syllables.map((s, i) => i === 1 ? '_'.repeat(s.length) : s).join(' '),
    2: syllables.map((s, i) => i % 2 !== 0 ? '_'.repeat(s.length) : s).join(' '),
    3: syllables[0] + ' ' + '_'.repeat(word.length - syllables[0].length)
  };
}

export async function seedWordBank() {
  const batch = writeBatch(db);
  const wordBankRef = collection(db, 'wordBank');

  RAW_WORDS.forEach((item) => {
    const id = item.word.toLowerCase().replace(/\s+/g, '-');
    const docRef = doc(wordBankRef, id);
    const data: WordBankData = {
      id,
      word: item.word,
      syllables: item.syllables,
      levels: generateMasks(item.word, item.syllables),
      category: item.cat as any,
      emoji: item.emoji,
      difficulty: item.diff
    };
    batch.set(docRef, data);
  });

  await batch.commit();
  console.log('Word bank seeded successfully!');
}
