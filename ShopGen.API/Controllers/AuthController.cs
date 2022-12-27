using Microsoft.AspNetCore.Mvc;
using ShopGen.API.Data;
using ShopGen.API.Business;

namespace ShopGen.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : Controller
{
  [HttpPost("Login")]
  public IActionResult Login([FromBody] User user)
  {
    try
    {
      return new OkObjectResult(Users.GetUser(user));
    }
    catch
    {
      return new BadRequestObjectResult("User does not exist with that email/password combination.");
    }
  }

  [HttpPost("Register")]
  public IActionResult Register([FromBody] User user)
  {
    try 
    {
      return new OkObjectResult(Users.UserInsert(user));
    }
    catch (Exception e)
    {
      return new BadRequestObjectResult(e.Message);
    }
    
  }
}