using DataAdapterSharp.DataAdapter;
using ShopGen.Data;

namespace ShopGen.Db;

public class Recipes
{
  public static IEnumerable<Recipe> GetRecipes() => DataAdapter.GetEnumerable<Recipe>("RecipeGetList");

  public static Recipe? GetRecipe(Guid id) => DataAdapter.GetT<Recipe>("RecipeGetSingle", new(){
    { "@Id", id }
  });

  public static Guid InsertRecipe(Recipe recipe)
  {
    Guid id = Guid.NewGuid();
    DataAdapter.ExecuteNonQuery("RecipeInsert", new()
    {
      { "@Id", id },
      { "@Name", recipe.Name },
      { "@Description", recipe.Description }
    });

    return id;
  }

  public static void UpdateRecipe(Recipe recipe) => DataAdapter.ExecuteNonQuery("RecipeUpdate", new()
  {
    { "@Id", recipe.Id },
    { "@Name", recipe.Name },
    { "@Description", recipe.Description }
  });

  public static void DeleteRecipe(Guid id) => DataAdapter.ExecuteNonQuery("RecipeDelete", new()
  {
    { "@Id", id }
  });
}