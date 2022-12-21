namespace ShopGen.Data;

public class Ingredient
{
  public Guid Id { get; set; }
  public Guid RecipeId { get; set; }
  public string Name { get; set; } = "";
  public double Quantity { get; set; }
  public string Unit { get; set; } = "";
}