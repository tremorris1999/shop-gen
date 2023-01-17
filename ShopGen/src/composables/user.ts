import { ref, computed } from 'vue'
import User from '@/types/user'

const localUser = JSON.parse(
  localStorage.getItem('shopgen-current-user') || '{}'
) as User

const user = ref<User>()
if (localUser.id) user.value = localUser

const setCurrentUser = (newUser?: User) => {
  user.value = newUser || User()
  localStorage.setItem('shopgen-current-user', JSON.stringify(user.value))
}

export const useUser = () => {
  return {
    user: computed(() => user.value),
    setCurrentUser,
  }
}

export default useUser
