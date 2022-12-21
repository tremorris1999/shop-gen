using System.Text.Json;
using System.Text.Json.Serialization;

namespace ShopGen.Utility;

public class GuidJsonConverter : JsonConverter<Guid>
{
  public override Guid Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    string? value = reader.GetString();
    Guid guid;
    try
    {
      guid = string.IsNullOrWhiteSpace(value) ? Guid.Empty : Guid.Parse(value);
    }
    catch
    {
      guid = Guid.Empty;
    }

    return guid;
  }

  public override void Write(Utf8JsonWriter writer, Guid value, JsonSerializerOptions options)
  {
    writer.WriteStringValue($"{value}");
  }
}