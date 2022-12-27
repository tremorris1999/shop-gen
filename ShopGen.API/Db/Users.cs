using ShopGen.API.Data;

using TreMorrisDev.DataAdapterSharp.DataAdapter;

namespace ShopGen.API.Db;

public class Users
{
  public static User? GetUser(User user) => DataAdapter.GetT<User>(
    "UserGetSingle",
    new Dictionary<string, object?>()
    {
      { "@Email", user.Email },
      { "@PasswordHash", user.PasswordHash}
    });

  public static string? GetUserByEmail(string email) => DataAdapter.GetT<string>(
    "UserGetSingleFromEmail",
    new Dictionary<string, object?>()
    {
      { "@Email", email }
    });

  public static void InsertUser(User user) => DataAdapter.ExecuteNonQuery(
    "UserInsert",
    new Dictionary<string, object?>()
    {
      { "@Id", user.Id },
      { "@Email", user.Email },
      { "@PasswordHash", user.PasswordHash }
    });

  public static void UpdateUser(User user) => DataAdapter.ExecuteNonQuery(
    "UserUpdate",
    new Dictionary<string, object?>()
    {
      { "@Id", user.Id },
      { "@PasswordHash", user.PasswordHash }
    });
}