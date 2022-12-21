using Microsoft.AspNetCore.Mvc;
using ShopGen.Business;
using ShopGen.Data;

namespace ShopGen.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ImagesController : ControllerBase
{
  [HttpGet("{recipeId}")]
  public IActionResult GetImages(Guid recipeId) => new OkObjectResult(Images.GetImages(recipeId));

  [HttpGet("Get/{id}")]
  public IActionResult GetImage(Guid id) => File(Images.GetImage(id), "image/*");

  [HttpPost("Upload")]
  public IActionResult PostImage(Guid recipeId, [FromForm] IFormFile file)
  {
    Images.InsertImage(recipeId, file);
    return new OkResult();
  }

  [HttpDelete("Delete/{id}")]
  public IActionResult DeleteImage(Guid id)
  {
    Images.DeleteImage(id);
    return new OkResult();
  }
}
