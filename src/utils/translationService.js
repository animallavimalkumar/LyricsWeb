// Detect language of text
export function detectLanguage(text) {
  // Telugu detection
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
  // Hindi detection
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  // Default to English
  return 'en';
}

// Translate text using backend endpoint
export async function translateText(text, targetLang) {
  if (!text) return '';
  
  try {
    const sourceLang = detectLanguage(text);
    
    // If source and target are the same, return original
    if (sourceLang === targetLang) {
      return text;
    }

    // Call backend API
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        targetLanguage: targetLang
      })
    });

    if (!response.ok) {
      console.error('Translation API error:', response.statusText);
      return text;
    }

    // Check if response has content
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid response type:', contentType);
      return text;
    }

    if (contentLength === '0') {
      console.error('Empty response from translation API');
      return text;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      return text;
    }
    
    if (data.success && data.translated) {
      return data.translated;
    }
    
    return text; // Return original if translation fails
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original on error
  }
}

// Get language name for display
export function getLanguageName(langCode) {
  const names = {
    'te': 'Telugu',
    'hi': 'Hindi',
    'en': 'English'
  };
  return names[langCode] || langCode;
}
