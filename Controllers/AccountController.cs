using Microsoft.AspNetCore.Mvc;

namespace Ost_Ecommerce.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
    }
}
