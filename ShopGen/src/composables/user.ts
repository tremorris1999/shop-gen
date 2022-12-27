import { ref } from 'vue'
import User from '@/types/user'

const user = ref<User>(JSON.parse(localStorage.getItem('shopgen-current-user') || '{}') || User())

const getCurrentUser = () => {
  return {...user.value}
}

const setCurrentUser = (newUser?: User) => {
  user.value = newUser || User()
  localStorage.setItem('shopgen-current-user', JSON.stringify(user.value))
}

export const useUser = () => {
  return {
    getCurrentUser,
    setCurrentUser
  }
}

export default useUser