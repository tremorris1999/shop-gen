import Recipe from "./types/recipe"
import axios from "axios"
import Ingredient from "@/types/ingredient"

const baseURL = import.meta.env.VITE_API
const api = axios.create({ baseURL })

api.interceptors.response.use(value => value.data, error => Promise.reject(error))

export default ({
  imageURL: `${baseURL}/Images/Get`,
  getRecipes: async () => await api.get<null, Recipe[]>('/Recipes/All'),
  getRecipe: async (id: string) => await api.get<null, Recipe>(`/Recipes/${id}`),
  postRecipe: async (recipe: Recipe) => await api.post<null, string>('/Recipes/Post', recipe),
  putRecipe: async (recipe: Recipe) => await api.put(`/Recipes/${recipe.id}`, recipe ),
  deleteRecipe: async (id: string) => await api.delete(`/Recipes/${id}`),

  getIngredients: async (id: string) => await api.get<null, Ingredient[]>(`/Ingredients/Recipe/${id}`),
  getAllIngredients: async () => await api.get<null, Ingredient[]>("/Ingredients/All"),

  getImages: async (recipeId: string) => await api.get<null, string[]>(`/Images/${recipeId}`),
  deleteImage: async (imageId: string) => await api.delete(`/Images/Delete/${imageId}`),
  postImage: async (recipeId: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    await api.post(`/Images/Upload?recipeId=${recipeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
})
