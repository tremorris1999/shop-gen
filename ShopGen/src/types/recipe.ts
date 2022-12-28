import Ingredient from "./ingredient";

const Recipe = () => ({
  id: '',
  creatorId: '',
  name: '',
  description: '',
  ingredients: [] as Ingredient[],
  imageIds: [] as string[]
})

type Recipe = ReturnType<typeof Recipe>

export default Recipe
