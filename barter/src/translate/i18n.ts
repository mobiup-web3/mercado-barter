import { initReactI18next } from 'react-i18next';

import { en } from './languages/en';
import { pt } from './languages/pt';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
//import Backend from 'i18next-http-backend';

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      pt: {
        translation: pt
      }
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
