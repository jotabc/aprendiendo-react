import { i18n } from '../i18n'

export const useI18n = (lang) => {
  return i18n[lang] || i18n
}
