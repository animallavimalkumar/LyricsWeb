import express from 'express';
import { transliterateText } from '../utils/transliteration.js';

const router = express.Router();

// Language detection regex patterns
function detectLanguage(text) {
  // Telugu detection
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
  // Hindi detection
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  // Default to English
  return 'en';
}

// Function to add transliteration alongside original text
function addTransliteration(text, sourceLang) {
  if (!text) return text;
  
  const lines = text.split('\n');
  const transliteratedLines = lines.map(line => {
    if (!line.trim()) return line; // Keep empty lines as is
    
    const transliterated = transliterateText(line, sourceLang);
    // Format: original text followed by transliteration
    return `${line} ${transliterated}`;
  });
  
  return transliteratedLines.join('\n');
}

// Translation function
function performTranslation(text, targetLanguage) {
  try {
    const sourceLang = detectLanguage(text);
    
    // If already in target language
    if (sourceLang === targetLanguage) {
      return text;
    }
    
    // For English target - transliterate to Roman script
    if (targetLanguage === 'en') {
      if (sourceLang === 'te' || sourceLang === 'hi') {
        return transliterateText(text, sourceLang, 'en');
      }
      return text;
    }
    
    // For Hindi target
    if (targetLanguage === 'hi') {
      if (sourceLang === 'te') {
        // Convert Telugu script to Hindi script
        return transliterateText(text, 'te', 'hi');
      }
      if (sourceLang === 'hi') {
        return text;
      }
      if (sourceLang === 'en') {
        // Convert English to Hindi script (phonetic)
        return transliterateText(text, 'en', 'hi');
      }
      return text;
    }
    
    // For Telugu target
    if (targetLanguage === 'te') {
      if (sourceLang === 'te') {
        return text;
      }
      if (sourceLang === 'hi') {
        // Convert Hindi script to Telugu script
        return transliterateText(text, 'hi', 'te');
      }
      if (sourceLang === 'en') {
        // Convert English to Telugu script (phonetic)
        return transliterateText(text, 'en', 'te');
      }
      return text;
    }
    
    return text;
  } catch (error) {
    console.error('Translation error:', error.message);
    return text;
  }
}

// POST endpoint for translation
router.post('/', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing text or targetLanguage' 
      });
    }

    if (typeof text !== 'string' || typeof targetLanguage !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Text and targetLanguage must be strings'
      });
    }

    const translated = performTranslation(text, targetLanguage);

    return res.json({
      success: true,
      original: text,
      translated: translated,
      targetLanguage: targetLanguage
    });
  } catch (error) {
    console.error('Translation endpoint error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Translation failed', 
      details: error.message 
    });
  }
});

export default router;
