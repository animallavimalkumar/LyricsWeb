// Comprehensive Telugu to Roman transliteration mappings
const teluguToRoman = {
  // Independent vowels
  'అ': 'a', 'ఆ': 'aa', 'ఇ': 'i', 'ఈ': 'ee', 'ఉ': 'u', 'ఊ': 'uu',
  'ఋ': 'ru', 'ఌ': 'lu', 'ఎ': 'e', 'ఏ': 'e', 'ఐ': 'ai', 'ఒ': 'o', 'ఓ': 'o', 'ఔ': 'ou',

  // Consonants (with inherent 'a')
  'క': 'ka', 'ఖ': 'kha', 'గ': 'ga', 'ఘ': 'gha', 'ఙ': 'nga',
  'చ': 'cha', 'ఛ': 'chha', 'జ': 'ja', 'ఝ': 'jha', 'ఞ': 'nja',
  'ట': 'ta', 'ఠ': 'tha', 'డ': 'da', 'ఢ': 'dha', 'ణ': 'na',
  'త': 'ta', 'థ': 'tha', 'ద': 'da', 'ధ': 'dha', 'న': 'na',
  'ప': 'pa', 'ఫ': 'pha', 'బ': 'ba', 'భ': 'bha', 'మ': 'ma',
  'య': 'ya', 'ర': 'ra', 'ల': 'la', 'వ': 'va', 'శ': 'sha', 'ష': 'sha', 'స': 'sa', 'హ': 'ha',
  'ఱ': 'rra', 'ళ': 'lla',

  // Vowel marks (matras)
  'ా': 'aa', 'ి': 'i', 'ీ': 'ee', 'ు': 'u', 'ూ': 'uu', 'ృ': 'ru', 'ె': 'e', 'ే': 'e', 'ൈ': 'ai', 'ο': 'o', 'ೋ': 'o', 'ೌ': 'ou',

  // Special characters
  '్': '', // Virama (halant)
};

// Telugu to Hindi (Devanagari) script conversion
const teluguToHindi = {
  // Independent vowels
  'అ': 'अ', 'ఆ': 'आ', 'ఇ': 'इ', 'ఈ': 'ई', 'ఉ': 'उ', 'ఊ': 'ऊ',
  'ఋ': 'ऋ', 'ఌ': 'ऌ', 'ఎ': 'ए', 'ఏ': 'ए', 'ఐ': 'ऐ', 'ఒ': 'ओ', 'ఓ': 'ओ', 'ఔ': 'औ',

  // Consonants
  'క': 'क', 'ఖ': 'ख', 'గ': 'ग', 'ఘ': 'घ', 'ఙ': 'ङ',
  'చ': 'च', 'ఛ': 'छ', 'జ': 'ज', 'ఝ': 'झ', 'ఞ': 'ञ',
  'ట': 'ट', 'ఠ': 'ठ', 'డ': 'ड', 'ఢ': 'ढ', 'ణ': 'ण',
  'త': 'त', 'థ': 'थ', 'ద': 'द', 'ధ': 'ध', 'న': 'न',
  'ప': 'प', 'ఫ': 'फ', 'బ': 'ब', 'భ': 'भ', 'మ': 'म',
  'య': 'य', 'ర': 'र', 'ల': 'ल', 'వ': 'व', 'శ': 'श', 'ష': 'ष', 'స': 'स', 'హ': 'ह',
  'ఱ': 'ड', 'ళ': 'ल',

  // Vowel marks (matras)
  'ా': 'ा', 'ి': 'ि', 'ీ': 'ी', 'ు': 'ु', 'ూ': 'ू', 'ృ': 'ृ', 'ె': 'े', 'ే': 'े', 'ை': 'ै', 'ొ': 'ो', 'ో': 'ो', 'ౌ': 'ौ',

  // Special characters
  '్': '्', // Virama (halant)
  'ఁ': 'ं', 'ం': 'ं', 'ః': 'ः',

  'ఁ': 'n', 'ం': 'n', 'ः': 'h',

  // Numerals
  '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4',
  '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9',
};

// Hindi to Telugu (Devanagari to Telugu script) conversion
const hindiToTelugu = {
  // Independent vowels
  'अ': 'అ', 'आ': 'ఆ', 'इ': 'ఇ', 'ई': 'ఈ', 'उ': 'ఉ', 'ऊ': 'ఊ',
  'ऋ': 'ఋ', 'ऌ': 'ఌ', 'ए': 'ఎ', 'ऐ': 'ఐ', 'ओ': 'ఒ', 'औ': 'ఔ',

  // Consonants
  'क': 'క', 'ख': 'ఖ', 'ग': 'గ', 'घ': 'ఘ', 'ङ': 'ఙ',
  'च': 'చ', 'छ': 'ఛ', 'ज': 'జ', 'झ': 'ఝ', 'ञ': 'ఞ',
  'ट': 'ట', 'ठ': 'ఠ', 'ड': 'డ', 'ढ': 'ఢ', 'ण': 'ణ',
  'त': 'త', 'थ': 'థ', 'द': 'ద', 'ध': 'ధ', 'न': 'న',
  'प': 'ప', 'फ': 'ఫ', 'ब': 'బ', 'भ': 'భ', 'म': 'మ',
  'य': 'య', 'र': 'ర', 'ल': 'ల', 'ळ': 'ళ', 'व': 'వ',
  'श': 'శ', 'ष': 'ష', 'स': 'స', 'ह': 'హ',

  // Vowel marks (matras)
  'ा': 'ా', 'ि': 'ి', 'ी': 'ీ', 'ु': 'ు', 'ू': 'ూ', 'ृ': 'ృ', 'ॄ': 'ృ',
  'े': 'ె', 'ै': 'ై', 'ो': 'ో', 'ौ': 'ౌ',

  // Special characters
  '्': '్', // Halant/Virama
  'ँ': 'ఁ', 'ं': 'ం', 'ः': 'ః',
};

// English (Roman) to Telugu phonetic conversion
const englishToTelugu = {
  'a': 'అ', 'b': 'బ', 'c': 'క', 'd': 'డ', 'e': 'ె', 'f': 'ఫ', 'g': 'గ', 'h': 'హ',
  'i': 'ి', 'j': 'జ', 'k': 'క', 'l': 'ల', 'm': 'మ', 'n': 'న', 'o': 'ో', 'p': 'ప',
  'q': 'క', 'r': 'ర', 's': 'స', 't': 'త', 'u': 'ు', 'v': 'వ', 'w': 'వ', 'x': 'క్స',
  'y': 'య', 'z': 'జ',
  'A': 'ఆ', 'B': 'బ', 'C': 'క', 'D': 'డ', 'E': 'ఎ', 'F': 'ఫ', 'G': 'గ', 'H': 'హ',
  'I': 'ఈ', 'J': 'జ', 'K': 'క', 'L': 'ల', 'M': 'మ', 'N': 'న', 'O': 'ఓ', 'P': 'ప',
  'Q': 'క', 'R': 'ర', 'S': 'స', 'T': 'త', 'U': 'ఉ', 'V': 'వ', 'W': 'వ', 'X': 'క్స',
  'Y': 'య', 'Z': 'జ',
};

// English (Roman) to Hindi phonetic conversion
const englishToHindi = {
  'a': 'अ', 'b': 'ब', 'c': 'क', 'd': 'ड', 'e': 'े', 'f': 'फ', 'g': 'ग', 'h': 'ह',
  'i': 'ि', 'j': 'ज', 'k': 'क', 'l': 'ल', 'm': 'म', 'n': 'न', 'o': 'ो', 'p': 'प',
  'q': 'क', 'r': 'र', 's': 'स', 't': 'त', 'u': 'ु', 'v': 'व', 'w': 'व', 'x': 'क्स',
  'y': 'य', 'z': 'ज',
  'A': 'आ', 'B': 'ब', 'C': 'क', 'D': 'ड', 'E': 'ए', 'F': 'फ', 'G': 'ग', 'H': 'ह',
  'I': 'ई', 'J': 'ज', 'K': 'क', 'L': 'ल', 'M': 'म', 'N': 'न', 'O': 'ओ', 'P': 'प',
  'Q': 'क', 'R': 'र', 'S': 'स', 'T': 'त', 'U': 'उ', 'V': 'व', 'W': 'व', 'X': 'क्स',
  'Y': 'य', 'Z': 'ज',
};

// Comprehensive Hindi to Roman transliteration
const hindiToRoman = {
  // Independent vowels
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'uu',
  'ऋ': 'ri', 'ॠ': 'ri', 'ऌ': 'li', 'ॡ': 'li', 'ए': 'e', 'ऐ': 'ai',
  'ओ': 'o', 'औ': 'au',

  // Consonants
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
  'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
  'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'ळ': 'lla', 'व': 'va',
  'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',

  // Vowel marks (matras)
  'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'uu', 'ृ': 'ri', 'ॄ': 'ri',
  'ॅ': 'e', 'े': 'e', 'ै': 'ai', 'ॉ': 'o', 'ो': 'o', 'ौ': 'au',

  // Special characters
  '्': '', // Halant/Virama
  'ँ': 'n', 'ं': 'n', 'ः': 'h', '़': '', '।': '.', '॥': '.',
};

function transliterateText(text, fromLang, toLang = 'en') {
  if (!text) return '';

  let result = '';
  let mapping;

  // Determine which mapping to use
  if (toLang === 'hi' && fromLang === 'te') {
    // Telugu to Hindi script conversion
    mapping = teluguToHindi;
  } else if (toLang === 'te' && fromLang === 'hi') {
    // Hindi to Telugu script conversion
    mapping = hindiToTelugu;
  } else if (toLang === 'hi' && fromLang === 'en') {
    // English to Hindi script conversion
    mapping = englishToHindi;
  } else if (toLang === 'te' && fromLang === 'en') {
    // English to Telugu script conversion
    mapping = englishToTelugu;
  } else if (toLang === 'en' || toLang === 'roman') {
    // Telugu or Hindi to English/Roman conversion
    mapping = fromLang === 'te' ? teluguToRoman : hindiToRoman;
  } else {
    // Default to Roman for unknown targets
    mapping = fromLang === 'te' ? teluguToRoman : hindiToRoman;
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (mapping[char]) {
      result += mapping[char];
    } else if ((toLang === 'hi' && fromLang === 'te') || (toLang === 'te' && fromLang === 'hi') || 
               (toLang === 'hi' && fromLang === 'en') || (toLang === 'te' && fromLang === 'en')) {
      // For script conversion, keep unmapped characters (like spaces, punctuation)
      result += char;
    } else if (!/[\u0C00-\u0C7F\u0900-\u097F]/.test(char)) {
      // For Roman conversion, keep only non-script characters
      result += char;
    }
  }

  // Clean up while preserving newlines
  if (toLang === 'en' || toLang === 'roman') {
    // For Roman: remove double spaces but preserve newlines
    result = result.split('\n').map(line => {
      return line.replace(/\s+/g, ' ').trim();
    }).join('\n');
    // Remove any remaining non-ASCII characters except newlines
    result = result.replace(/[^\x20-\x7E\n]/g, '');
  } else {
    // For script conversion: clean spaces within lines but preserve newlines
    result = result.split('\n').map(line => {
      return line.replace(/\s+/g, ' ').trim();
    }).join('\n');
  }

  return result;
}

export { transliterateText };
