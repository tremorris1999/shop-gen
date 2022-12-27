const Ingredient = () => ({
  id: '',
  recipeId: '',
  creatorId: '',
  name: '',
  quantity: undefined as number | undefined,
  unit: ''
})

type Ingredient = ReturnType<typeof Ingredient>
export default Ingredient
