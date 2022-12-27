namespace ShopGen.API.Data;

public class User
{
  public Guid Id { get; set; }
  public string Email { get; set; } = "";
  public string PasswordHash { get; set; } = "";
  public DateTime DateCreated { get; set; }
  public string Password { get; set; } = "";
}