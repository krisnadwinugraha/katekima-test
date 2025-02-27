import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import id from '../locales/id.json';

// Get saved locale with fallback
const savedLocale = localStorage.getItem('locale');
const defaultLocale = (savedLocale === 'en' || savedLocale === 'id') ? savedLocale : 'en';

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    id
  },
  sync: true 
});

i18n.global.locale.value = defaultLocale;

export default i18n;