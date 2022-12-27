using System.Security.Cryptography;
using System.Text;

namespace ShopGen.API.Utility;

public class StringHasher
{
  private static HMACSHA256? Hasher;

  public static void Configure(string secretString)
  {
    ASCIIEncoding encoder = new();
    byte[] key = encoder.GetBytes(secretString);
    Hasher = new(key);
  }

  public static string GetHash(string stringValue)
  {
    ASCIIEncoding encoder = new();
    byte[] value = encoder.GetBytes(stringValue);
    byte[] hashedValue = Hasher?.ComputeHash(value)
      ?? throw new ApplicationException("Unable to compute hash.");
    return Convert.ToBase64String(hashedValue);
  }
}