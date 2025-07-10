using Microsoft.AspNetCore.Mvc;
using Ost_Ecommerce.Models;

namespace Ost_Ecommerce.Controllers
{
    public class AccountAPIController : Controller
    {
        [HttpPost]
        public IActionResult varifyUser(Account modelAccount)
        {
            
            if (modelAccount.username == "jobair" && modelAccount.password == "0000")
            {
                return Ok("Successfully Authorised");
            }
            else
            {
                return NotFound(new { message = "Unauth Access" });
            } 
                
        }
    }
}
