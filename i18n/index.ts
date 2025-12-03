import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import ar from './locales/ar.json';

// Check if localStorage is available (can fail in some contexts like private browsing)
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__i18n_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Configure detection based on localStorage availability
const detectionOptions = isLocalStorageAvailable()
  ? {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  : {
      order: ['navigator', 'htmlTag'],
      caches: [], // Don't cache if localStorage is unavailable
    };

// i18n configuration
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
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
    detection: detectionOptions,
  });

export default i18n;

