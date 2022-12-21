using Microsoft.AspNetCore.Mvc;
using ShopGen.Business;
using ShopGen.Data;

namespace ShopGen.API.Controllers;

[ApiController]
[Route("[controller]")]
public class IngredientsController : ControllerBase
{
  [HttpGet("All")]
  public IActionResult GetAllIngredients() => new OkObjectResult(Ingredients.GetAllIngredients());

  [HttpGet("Recipe/{recipeId}")]
  public IActionResult GetIngredients(Guid recipeId) => new OkObjectResult(Ingredients.GetIngredients(recipeId));

    [HttpPost("Post")]
  public IActionResult PostIngredient([FromBody] Ingredient ingredient)
  {
    Ingredients.InsertIngredient(ingredient);
    return new OkResult();
  }

  [HttpPut("{id}")]
  public IActionResult PutIngredient(Guid id, [FromBody] Ingredient ingredient)
  {
    Ingredients.UpdateIngredient(ingredient);
    return new OkResult();
  }

  [HttpDelete("{id}")]
  public IActionResult DeleteIngredient(Guid id)
  {
    Ingredients.DeleteIngredient(id);
    return new OkResult();
  }
}