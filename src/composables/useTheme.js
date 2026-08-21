import { ref } from 'vue'

const isDark = ref(JSON.parse(localStorage.getItem('isDark') ?? 'true'))

export const useTheme = () => {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('isDark', JSON.stringify(isDark.value))
  }

  return {
    isDark,
    toggleTheme
  }
}