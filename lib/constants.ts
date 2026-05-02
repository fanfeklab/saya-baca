export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const ALPHABET_EXAMPLES: Record<string, { word: string, icon: string }> = {
  'A': { word: 'APEL', icon: '🍎' },
  'B': { word: 'BOLA', icon: '⚽' },
  'C': { word: 'CICAK', icon: '🦎' },
  'D': { word: 'DOMBA', icon: '🐑' },
  'E': { word: 'ELANG', icon: '🦅' },
  'F': { word: 'FERI', icon: '⛴️' },
  'G': { word: 'GAJAH', icon: '🐘' },
  'H': { word: 'HARIMAU', icon: '🐅' },
  'I': { word: 'IKAN', icon: '🐟' },
  'J': { word: 'JERUK', icon: '🍊' },
  'K': { word: 'KUCING', icon: '🐱' },
  'L': { word: 'LEBAH', icon: '🐝' },
  'M': { word: 'MATAHARI', icon: '☀️' },
  'N': { word: 'NYAMUK', icon: '🦟' },
  'O': { word: 'OBAT', icon: '💊' },
  'P': { word: 'PISANG', icon: '🍌' },
  'Q': { word: 'QURAN', icon: '📖' },
  'R': { word: 'RUSA', icon: '🦌' },
  'S': { word: 'SAPI', icon: '🐄' },
  'T': { word: 'TELUR', icon: '🥚' },
  'U': { word: 'ULAR', icon: '🐍' },
  'V': { word: 'VAS', icon: '🏺' },
  'W': { word: 'WORTEL', icon: '🥕' },
  'X': { word: 'XYLOFON', icon: '🎹' },
  'Y': { word: 'YOYO', icon: '🪀' },
  'Z': { word: 'ZEBRA', icon: '🦓' },
};

export const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ".split("");
export const VOWELS = "AIUEO".split("");

export const SYLLABLES_POOL = [
  'BA', 'BI', 'BU', 'BE', 'BO',
  'CA', 'CI', 'CU', 'CE', 'CO',
  'DA', 'DI', 'DU', 'DE', 'DO',
  'FA', 'FI', 'FU', 'FE', 'FO',
  'GA', 'GI', 'GU', 'GE', 'GO',
  'HA', 'HI', 'HU', 'HE', 'HO',
  'JA', 'JI', 'JU', 'JE', 'JO',
  'KA', 'KI', 'KU', 'KE', 'KO',
  'LA', 'LI', 'LU', 'LE', 'LO',
  'MA', 'MI', 'MU', 'ME', 'MO',
  'NA', 'NI', 'NU', 'NE', 'NO',
  'PA', 'PI', 'PU', 'PE', 'PO',
  'RA', 'RI', 'RU', 'RE', 'RO',
  'SA', 'SI', 'SU', 'SE', 'SO',
  'TA', 'TI', 'TU', 'TE', 'TO',
  'VA', 'VI', 'VU', 'VE', 'VO',
  'WA', 'WI', 'WU', 'WE', 'WO',
  'YA', 'YI', 'YU', 'YE', 'YO',
  'ZA', 'ZI', 'ZU', 'ZE', 'ZO',
];

export interface SentenceTrial {
  id: string;
  image: string;
  template: string[]; 
  correctWords: string[]; 
  options: string[];
}

export const SENTENCE_TRIALS: SentenceTrial[] = [
  {
    id: 's1',
    image: '🐱',
    template: ['[ ]', 'sedang', '[ ]'],
    correctWords: ['KUCING', 'MAKAN'],
    options: ['KUCING', 'MAKAN', 'TIDUR', 'ANJING']
  },
  {
    id: 's2',
    image: '⚽',
    template: ['BIMA', 'main', '[ ]'],
    correctWords: ['BOLA'],
    options: ['BOLA', 'AIR', 'BUKU', 'PISANG']
  },
  {
    id: 's3',
    image: '🍎',
    template: ['SAYA', 'makan', '[ ]'],
    correctWords: ['APEL'],
    options: ['APEL', 'JERUK', 'BOLEH', 'ADA']
  }
];
