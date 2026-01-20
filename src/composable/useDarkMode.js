import { ref, watch, onMounted } from 'vue'

const THEME_KEY = 'theme'
const DARK_CLASS = 'dark'
const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'

export function useDarkMode() {
  const isDark = ref(false)

  const applyTheme = (dark) => {
    document.documentElement.classList.toggle(DARK_CLASS, dark)
    localStorage.setItem(THEME_KEY, dark ? THEME_DARK : THEME_LIGHT)
  }

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  const setDarkMode = (value) => {
    isDark.value = value
  }

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    isDark.value = savedTheme === THEME_DARK || (!savedTheme && systemPrefersDark)
  }

  watch(isDark, applyTheme, { immediate: true })
  onMounted(initializeTheme)

  return {
    isDark,
    toggleDarkMode,
    setDarkMode
  }
}