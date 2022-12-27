using ShopGen.API.Data;

namespace ShopGen.API.Business;

public class Ingredients
{
  public static IEnumerable<Ingredient> GetAllIngredients() => Db.Ingredients.GetAllIngredients();

  public static IEnumerable<Ingredient> GetIngredients(Guid id) => Db.Ingredients.GetIngredients(id);

  public static void InsertIngredient(Ingredient ingredient) => Db.Ingredients.InsertIngredient(ingredient);

  public static void UpdateIngredient(Ingredient ingredient) => Db.Ingredients.UpdateIngredient(ingredient);

  public static void DeleteIngredient(Guid id) => Db.Ingredients.DeleteIngredient(id);
}