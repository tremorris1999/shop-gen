using System.Text.RegularExpressions;
using ShopGen.API.Data;
using ShopGen.API.Utility;

namespace ShopGen.API.Business;

public class Users
{
  private static bool IsValid(string? email)
  {
    if (string.IsNullOrWhiteSpace(email))
      return false;

    string[] invalid = { "\'", "`", "<", ">", "-", "&lt;", "&gt;" };
    return invalid.ToList().Where(str => email.Contains(str)).ToArray().Length == 0;
  }

  public static User UserInsert(User user)
  {
    if (!IsValid(user.Email))
      throw new ApplicationException("Invalid email input");

    string? email = Db.Users.GetUserByEmail(user.Email);
    if (email is not null)
      throw new ApplicationException("User with that email already exists.");

    Guid id = Guid.NewGuid();
    string passHash = StringHasher.GetHash(user.Password);
    user.Id = id;
    user.PasswordHash = passHash;
    Db.Users.InsertUser(user);
    User dbUser = Db.Users.GetUser(user)
      ?? throw new ApplicationException("Unable to find user.");

    dbUser.PasswordHash = "";
    return dbUser;
  }

  public static void UserUpdate(User user)
  {
    if (!IsValid(user.Email))
      throw new ApplicationException("Invalid email input");

    User dbUser = GetUser(user)
      ?? throw new ApplicationException("Unable to find user.");

    string passHash = StringHasher.GetHash(user.Password);
    dbUser.PasswordHash = passHash;
    Db.Users.UpdateUser(dbUser);
  }

  public static User GetUser(User user)
  {
    if (!IsValid(user.Email))
      throw new ApplicationException("Invalid email input");

    user.PasswordHash = StringHasher.GetHash(user.Password);
    User dbUser = Db.Users.GetUser(user)
      ?? throw new ApplicationException("Unable to find user.");
    dbUser.PasswordHash = "";
    return dbUser;
  }
}