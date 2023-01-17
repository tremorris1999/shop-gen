import { ref, computed } from 'vue'

const favorites = ref<string[]>(
  localStorage
    .getItem('shopgen-favorites')
    ?.split(',')
    .filter(value => !!value) || []
)
const addToFavorites = (recipeId: string) => {
  favorites.value.splice(favorites.value.length, 0, recipeId)
  localStorage.setItem('shopgen-favorites', favorites.value.join(','))
}
const removeFromFavorites = (recipeId: string) => {
  const index = favorites.value.indexOf(recipeId)
  if (index > -1) {
    favorites.value.splice(index, 1)
    localStorage.setItem('shopgen-favorites', favorites.value.join(','))
  }
}

const useFavorites = () => {
  return {
    favorites: computed(() => [...favorites.value]),
    addToFavorites,
    removeFromFavorites,
  }
}

export default useFavorites
