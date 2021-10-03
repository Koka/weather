import ruMessages from '../locales/ru.json'
import frMessages from '../locales/fr.json'
import enMessages from '../locales/en.json'

const MESSAGES = {
  en: enMessages,
  ru: ruMessages,
  fr: frMessages,
}

export const getMessages = (locale: string) =>
  MESSAGES[locale.substring(0, 2) as keyof typeof MESSAGES] || MESSAGES['en']
