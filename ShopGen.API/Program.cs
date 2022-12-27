using System.Text.Json;
using System.Text.Json.Nodes;
using ShopGen.API.Utility;

string hashKey = JsonSerializer.Deserialize<JsonNode>(
  File.ReadAllText("appsettings.json"))
    ?["Keys"]
    ?["HashKey"]
    ?.GetValue<string>()
    ?? throw new ApplicationException("Unable to load hash key");
    
StringHasher.Configure(hashKey);

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
  .AddControllers()
  .AddJsonOptions(options => {
    options.JsonSerializerOptions.Converters.Add(new GuidJsonConverter());
  });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Configuration.AddCommandLine(args);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors(policyBuilder => policyBuilder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
