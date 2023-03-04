import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translationEN.json';
import translationJP from './locales/jp/translationJP.json';

const resources = {
    en: {
        translation: translationEN
    },
    jp: {
        translation: translationJP
    } 
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        
        keySeparator: ".",
        
        interpolation: {
            escapeValue: false
        }
    })