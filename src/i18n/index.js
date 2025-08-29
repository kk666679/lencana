import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ms from './locales/ms.json';
import tamil from './locales/tamil.json';
import mandarin from './locales/mandarin.json';

const isDev = import.meta.env.DEV;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ms: { translation: ms },
      ta: { translation: tamil },
      zh: { translation: mandarin }
    },
    lng: localStorage.getItem('lencana-language') || 'en',
    fallbackLng: 'en',
    debug: isDev,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'lencana-language'
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;