using Microsoft.AspNetCore.Mvc;

namespace Ost_Ecommerce.Controllers
{
    public class AccountAPIController : Controller
    {
        public IActionResult varifyUser(string userName , string password)
        {
            if (userName == "jobair" && password == "0000")
            {
                return Ok("Successfully Authorised");
            }
            else 
                return Unauthorized(new {message ="unAuth Access"});
        }
    }
}
