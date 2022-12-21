const Ingredient = () => ({
  id: '',
  recipeId: '',
  name: '',
  quantity: undefined as unknown as number,
  unit: ''
})

type Ingredient = ReturnType<typeof Ingredient>
export default Ingredient
