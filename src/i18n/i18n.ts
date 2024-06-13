import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationTH from './translations/th-TH.json'
import translationEN from './translations/en-GB.json'

const resources = {
    th: {
        translation: translationTH
    },
    en: {
        translation: translationEN
    },
}

i18next
.use(initReactI18next)
.init({
    resources,
    lng: "en",
})

export default i18next