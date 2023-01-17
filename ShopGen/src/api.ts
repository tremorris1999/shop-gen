import Recipe from './types/recipe'
import axios from 'axios'
import Ingredient from '@/types/ingredient'
import User from './types/user'

const baseURL = import.meta.env.VITE_API
const api = axios.create({ baseURL })

api.interceptors.response.use(
  value => value.data,
  error => Promise.reject(error.response?.data || error)
)

export default {
  // recipes
  getRecipes: async () => await api.get<null, Recipe[]>('/Recipes/All'),

  getRecipe: async (id: string) =>
    await api.get<null, Recipe>(`/Recipes/${id}`),

  postRecipe: async (recipe: Recipe) =>
    await api.post<null, string>('/Recipes/Post', recipe),

  putRecipe: async (recipe: Recipe) =>
    await api.put(`/Recipes/${recipe.id}`, recipe),

  deleteRecipe: async (id: string) => await api.delete(`/Recipes/${id}`),

  // ingredients
  getIngredients: async (id: string) =>
    await api.get<null, Ingredient[]>(`/Ingredients/Recipe/${id}`),

  getAllIngredients: async () =>
    await api.get<null, Ingredient[]>('/Ingredients/All'),

  // images
  imageURL: `${baseURL}/Images/Get`,

  getImages: async (recipeId: string) =>
    await api.get<null, string[]>(`/Images/${recipeId}`),

  deleteImage: async (imageId: string) =>
    await api.delete(`/Images/Delete/${imageId}`),

  postImage: async (recipeId: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    await api.post(`/Images/Upload?recipeId=${recipeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // auth
  login: async (user: User) => await api.post<null, User>('/Auth/Login', user),

  register: async (user: User) =>
    await api.post<null, User>('/Auth/Register', user),

  // list
  generateList: async (recipes: string[]) =>
    await api.post<null, Ingredient[]>('/Ingredients/Generate', recipes),
}
