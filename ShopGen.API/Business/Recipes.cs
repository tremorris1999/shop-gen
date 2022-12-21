using ShopGen.Data;

namespace ShopGen.Business;

public class Recipes
{
  public static IEnumerable<Recipe> GetRecipes()
  {
    IEnumerable<Recipe> recipes = Db.Recipes.GetRecipes();
    foreach (Recipe recipe in recipes)
      recipe.ImageIds = Images.GetImages(recipe.Id);
  

    return recipes;
  }

  public static Recipe? GetRecipe(Guid id)
  {
    Recipe? recipe = Db.Recipes.GetRecipe(id);
    if (recipe is not null)
    {
      recipe.Ingredients = Ingredients.GetIngredients(recipe.Id);
      recipe.ImageIds = Images.GetImages(recipe.Id);
    }

    return recipe;
  }

  public static Guid InsertRecipe(Recipe recipe)
  {
    Guid id = Db.Recipes.InsertRecipe(recipe);
    foreach (Ingredient i in recipe.Ingredients ?? Array.Empty<Ingredient>())
    {
      i.RecipeId = id;
      Ingredients.InsertIngredient(i);
    }

    return id;
  }

  public static void UpdateRecipe(Recipe recipe)
  {
    Db.Recipes.UpdateRecipe(recipe);
    List<Ingredient> recipeIngredients = (List<Ingredient>)(recipe.Ingredients ?? new List<Ingredient>());
    IEnumerable<Guid> oldIngredientIds = Ingredients.GetIngredients(recipe.Id).Select(ing => ing.Id);
    List<Guid> newIngredientIds = new();
    List<Ingredient> toAdd = new();     
    List<Ingredient> toUpdate = new();  

    recipeIngredients.ForEach(ing => {
      newIngredientIds.Add(ing.Id);
      if (oldIngredientIds.Contains(ing.Id))
        toUpdate.Add(ing);
      else
        toAdd.Add(ing);
    });

    IEnumerable<Guid> toDelete = oldIngredientIds.Where(id => !newIngredientIds.Contains(id));

    foreach (Ingredient ing in toAdd)
    {
      ing.RecipeId = recipe.Id;
      Ingredients.InsertIngredient(ing); 
    }

    foreach (Ingredient ing in toUpdate)
    {
      Ingredients.UpdateIngredient(ing);
    }

    foreach (Guid id in toDelete)
    {
      Ingredients.DeleteIngredient(id);
    }
  }

  public static void DeleteRecipe(Guid id) => Db.Recipes.DeleteRecipe(id);
}