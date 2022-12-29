import { ref } from "vue"
import Recipe from "@/types/recipe"
import api from "@/api"

const recipes = ref([] as Recipe[])
api
  .getRecipes()
  .then(res => recipes.value = res)
  .then(() => console.log(recipes.value))

const useRecipes = () => {
  return {
    recipes
  }
}

export default useRecipes