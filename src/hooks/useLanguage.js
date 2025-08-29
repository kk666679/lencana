import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('lencana-language', langCode);
  };

  const getCurrentLanguage = () => {
    return i18n.language || 'en';
  };

  const getAvailableLanguages = () => [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'ms', name: 'Bahasa Malaysia', flag: '🇲🇾', nativeName: 'Bahasa Malaysia' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' }
  ];

  const isRTL = () => {
    const rtlLanguages = ['ar', 'he', 'fa'];
    return rtlLanguages.includes(getCurrentLanguage());
  };

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    isRTL,
    currentLanguage: getCurrentLanguage()
  };
};