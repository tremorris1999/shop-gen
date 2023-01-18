using ShopGen.API.Data;

namespace ShopGen.API.Business;

public class Ingredients
{
  public static IEnumerable<Ingredient> GetAllIngredients() => Db.Ingredients.GetAllIngredients();

  public static IEnumerable<Ingredient> GetIngredients(Guid id) => Db.Ingredients.GetIngredients(id);

  public static void InsertIngredient(Ingredient ingredient) => Db.Ingredients.InsertIngredient(ingredient);

  public static void UpdateIngredient(Ingredient ingredient) => Db.Ingredients.UpdateIngredient(ingredient);

  public static void DeleteIngredient(Guid id) => Db.Ingredients.DeleteIngredient(id);

  public static List<Ingredient> GenerateList(Guid[] recipeIds)
  {
    List<Ingredient> ingredients = new();
    recipeIds.ToList().ForEach(id => {
      Recipe? recipe = Recipes.GetRecipe(id);
      if (recipe?.Ingredients is not null)
        recipe.Ingredients.ToList().ForEach(ingredient => {
          Ingredient? i = ingredients.FirstOrDefault(i => i.Name.Trim() == ingredient.Name.Trim());
          if (i is not null)
          {
            i.Quantity += ingredient.Quantity;
          }
          else
          {
            ingredients.Add(ingredient);
          }
        });
    });

    return ingredients;
  }
}