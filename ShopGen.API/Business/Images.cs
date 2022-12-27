namespace ShopGen.API.Business;

public class Images
{
  private const string IMAGE_STORE = "/data/shop-gen/img";
  public static IEnumerable<Guid> GetImages(Guid id)
  {
    var imgs = Db.Images.GetImages(id);
    return imgs;
  }

  public static void InsertImage(Guid recipeId, IFormFile file)
  {
    Guid id = Guid.NewGuid();
    MemoryStream memoryStream = new();
    file.CopyTo(memoryStream);
    File.WriteAllBytes($"{IMAGE_STORE}/{id}", memoryStream.ToArray());
    Db.Images.InsertImage(id, recipeId);
  }

  public static void DeleteImage(Guid id) => Db.Images.DeleteImage(id);

  public static byte[] GetImage(Guid id) => File.ReadAllBytes($"{IMAGE_STORE}/{id}");
}