import { ref } from 'vue'

export type Theme = 'dark' | 'light'

const globalTheme = ref<Theme>(
  (localStorage.getItem('shopgen-theme-preference') as Theme) || 'dark'
)
const setTheme = (theme: Theme) => {
  localStorage.setItem('shopgen-theme-preference', theme)
  globalTheme.value = theme
}

const getTheme = () => globalTheme.value

const useTheme = () => {
  return {
    setTheme,
    getTheme,
  }
}

export default useTheme
