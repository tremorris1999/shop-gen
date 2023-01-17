import Ingredient from './ingredient'

export const ShoppingListItem = () => ({
  ingredient: Ingredient(),
  status: '',
})

export type ShoppingListItem = ReturnType<typeof ShoppingListItem>
export default ShoppingListItem
