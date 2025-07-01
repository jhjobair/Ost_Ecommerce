using Microsoft.AspNetCore.Mvc;

namespace Ost_Ecommerce.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
