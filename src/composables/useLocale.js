import { ref } from 'vue'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const messages = { ru, en }

const currentLocale = ref(localStorage.getItem('locale') || 'ru')

const t = (key) => {
  return messages[currentLocale.value]?.[key] || key
}

const setLocale = (locale) => {
  currentLocale.value = locale
  localStorage.setItem('locale', locale)
}

export const useLocale = () => {
  return {
    currentLocale,
    t,
    setLocale
  }
}