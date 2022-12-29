import { ref } from "vue"
import Recipe from "@/types/recipe"
import api from "@/api"
import { toast } from "vue3-toastify"

const recipes = ref([] as Recipe[])
api
  .getRecipes()
  .then(res => recipes.value = res)
  .catch(() => toast.error('Unable to fetch recipes.'))

const useRecipes = () => {
  return {
    recipes
  }
}

export default useRecipes