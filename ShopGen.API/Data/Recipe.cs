namespace ShopGen.API.Data;

public class Recipe
{
  public Guid Id { get; set; }
  public Guid CreatorId { get; set; }
  public string Name { get; set; } = "";
  public string Description { get; set; } = "";
  public IEnumerable<Ingredient>? Ingredients { get; set; }
  public IEnumerable<Guid>? ImageIds { get; set; }
}