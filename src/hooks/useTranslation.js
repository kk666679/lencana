import { useTranslation as useI18nTranslation } from 'react-i18next';

/**
 * Enhanced translation hook with fallback support
 * @returns {Object} Translation functions and language utilities
 */
export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  /**
   * Translate with fallback to key if translation missing
   * @param {string} key - Translation key
   * @param {Object} options - Translation options
   * @returns {string} Translated text or fallback
   */
  const translate = (key, options = {}) => {
    const translation = t(key, options);
    
    // If translation equals key, it means translation is missing
    if (translation === key && !options.fallback) {
      // Return a human-readable fallback
      return key.split('.').pop().replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
    
    return translation;
  };

  /**
   * Get current language
   * @returns {string} Current language code
   */
  const getCurrentLanguage = () => i18n.language;

  /**
   * Change language
   * @param {string} lng - Language code
   */
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lencana-language', lng);
  };

  /**
   * Get available languages
   * @returns {Array} Available language codes
   */
  const getAvailableLanguages = () => ['en', 'ms'];

  return {
    t: translate,
    i18n,
    getCurrentLanguage,
    changeLanguage,
    getAvailableLanguages,
    isRTL: getCurrentLanguage() === 'ar' // Future RTL support
  };
};

export default useTranslation;