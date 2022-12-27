using Microsoft.AspNetCore.Mvc;
using ShopGen.API.Business;
using ShopGen.API.Data;

namespace ShopGen.API.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipesController : ControllerBase
{
  [HttpGet("All")]
  public IActionResult GetAllRecipes() => new OkObjectResult(Recipes.GetRecipes());

  [HttpGet("{id}")]
  public IActionResult GetRecipe(Guid id) => new OkObjectResult(Recipes.GetRecipe(id));

  [HttpPost("Post")]
  public IActionResult PostRecipe([FromBody] Recipe recipe)
  {
    return new OkObjectResult(Recipes.InsertRecipe(recipe));
  }

  [HttpPut("{id}")]
  public IActionResult PutRecipe(Guid id, [FromBody] Recipe recipe)
  {
    Recipes.UpdateRecipe(recipe);
    return new OkResult();
  }

  [HttpDelete("{id}")]
  public IActionResult DeleteRecipe(Guid id)
  {
    Recipes.DeleteRecipe(id);
    return new OkResult();
  }
}
