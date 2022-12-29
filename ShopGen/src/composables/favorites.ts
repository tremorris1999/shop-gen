import { ref } from 'vue'

const favorites = ref<string[]>(
  localStorage.getItem('shopgen-favorites')?.split(',') || []
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
const getFavorites = () => [...favorites.value]

const useFavorites = () => {
  return {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
  }
}

export default useFavorites
