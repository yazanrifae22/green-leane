import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import ar from './locales/ar.json';

// Check if we're in a browser environment and storage is available
const canUseStorage = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Custom language detector that doesn't use localStorage if unavailable
const customLanguageDetector = {
  type: 'languageDetector' as const,
  async: false,
  detect: (): string => {
    // Try localStorage first if available
    if (canUseStorage()) {
      try {
        const stored = window.localStorage.getItem('i18nextLng');
        if (stored) return stored;
      } catch (e) {
        // Ignore storage errors
      }
    }
    
    // Fall back to navigator language
    if (typeof navigator !== 'undefined') {
      const navLang = navigator.language || (navigator as any).userLanguage;
      if (navLang) {
        return navLang.split('-')[0]; // Return just 'en' from 'en-US'
      }
    }
    
    // Default to English
    return 'en';
  },
  init: () => {},
  cacheUserLanguage: (lng: string) => {
    if (canUseStorage()) {
      try {
        window.localStorage.setItem('i18nextLng', lng);
      } catch (e) {
        // Ignore storage errors silently
      }
    }
  }
};

// i18n configuration - using custom detector to avoid storage access errors
i18n
  .use(customLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;

