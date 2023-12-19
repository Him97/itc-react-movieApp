import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from '../locales/en.json';
import HE from '../locales/he.json';
import ZH_HANS from '../locales/zh_hans.json';
import ZH_HANT from '../locales/zh_hant.json';
import FR from '../locales/fr.json'
import SW from '../locales/sw.json'

const resources = {
  en: {
    translation: EN
  },
  he: {
    translation: HE
  },
  fr: {
    translation: FR
  },
  sw: {
    translation: SW
  },
  zh_hans: {
    translation: ZH_HANS
  },
  zh_hant: {
    translation: ZH_HANT
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language')||"en",
    debug: true,
    fallbackLng: localStorage.getItem('language') ?? 'en',
    interpolation: {
      escapeValue: false
    },
    ns: "translation",
    defaultNS: "translation"
  });

export default i18n;