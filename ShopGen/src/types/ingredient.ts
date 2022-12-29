const Ingredient = () => ({
  id: '',
  recipeId: '',
  name: '',
  quantity: undefined as number | undefined,
  unit: '',
})

type Ingredient = ReturnType<typeof Ingredient>
export default Ingredient
