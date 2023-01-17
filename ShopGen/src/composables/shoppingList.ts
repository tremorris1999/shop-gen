import { ref, computed } from 'vue'
import ShoppingListItem from '@/types/shoppingListItem'
import useRecipes from './recipes'
import api from '@/api'
import { toast } from 'vue3-toastify'

const localList = JSON.parse(
  localStorage.getItem('shopgen-mylist-items') || '[]'
) as ShoppingListItem[]

const shoppingList = ref<ShoppingListItem[]>([])
if (localList.length) shoppingList.value = localList

const setActive = (id: string) => {
  const index = shoppingList.value?.findIndex(i => i.ingredient.id === id)
  if (index > -1) {
    shoppingList.value[index].status = 'Active'
  }

  localStorage.setItem(
    'shopgen-mylist-items',
    JSON.stringify(shoppingList.value)
  )
}

const setInactive = (id: string) => {
  const index = shoppingList.value.findIndex(i => i.ingredient.id === id)
  if (index > -1) {
    shoppingList.value[index].status = 'Inactive'
  }

  localStorage.setItem(
    'shopgen-mylist-items',
    JSON.stringify(shoppingList.value)
  )
}

const { recipes } = useRecipes()
const generateList = async () => {
  try {
    const ingredients = await api.generateList(
      recipes.value.map(recipe => recipe.id)
    )

    shoppingList.value = ingredients.map(ingredient => ({
      ingredient,
      status: 'Active',
    }))
  } catch {
    toast.error('Unable to generate list.')
  }
}

const clearList = () => {
  shoppingList.value = []
  localStorage.removeItem('shopgen-mylist-items')
}

export const useShoppingList = () => {
  return {
    shoppingListItems: computed(() => [...shoppingList.value]),
    setActive,
    setInactive,
    generateList,
    clearList,
  }
}

export default useShoppingList
