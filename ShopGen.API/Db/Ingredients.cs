using DataAdapterSharp.DataAdapter;
using ShopGen.Data;

namespace ShopGen.Db;

public class Ingredients
{
  public static IEnumerable<Ingredient> GetAllIngredients() => DataAdapter.GetEnumerable<Ingredient>("IngredientGetAll");

  public static IEnumerable<Ingredient> GetIngredients(Guid id) => DataAdapter.GetEnumerable<Ingredient>("IngredientGetList", new()
  {
    { "@RecipeId", id }
  });

  public static void InsertIngredient(Ingredient ingredient) => DataAdapter.ExecuteNonQuery("IngredientInsert", new()
  {
    { "@RecipeId", ingredient.RecipeId },
    { "@Name", ingredient.Name },
    { "@Quantity", ingredient.Quantity },
    { "@Unit", ingredient.Unit }
  });

  public static void UpdateIngredient(Ingredient ingredient) => DataAdapter.ExecuteNonQuery("IngredientUpdate", new()
  {
    { "@Id", ingredient.Id },
    { "@Name", ingredient.Name },
    { "@Quantity", ingredient.Quantity },
    { "@Unit", ingredient.Unit }
  });

  public static void DeleteIngredient(Guid id) => DataAdapter.ExecuteNonQuery("IngredientDelete", new()
  {
    { "@Id", id }
  });
}