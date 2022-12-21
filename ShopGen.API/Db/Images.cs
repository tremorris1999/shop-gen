using DataAdapterSharp.DataAdapter;

namespace ShopGen.Db;

public class Images
{
  public static void InsertImage(Guid id, Guid recipeId) => DataAdapter.ExecuteNonQuery("ImageInsert", new()
  {
    { "@Id", id },
    { "@RecipeId", recipeId }
  });

  public static IEnumerable<Guid> GetImages(Guid recipeId) => DataAdapter.GetEnumerable<Guid>("ImageGetList", new()
  {
    { "@RecipeId", recipeId}
  });

  public static void DeleteImage(Guid id) => DataAdapter.ExecuteNonQuery("ImageDelete", new()
  {
    { "@Id", id }
  });
}