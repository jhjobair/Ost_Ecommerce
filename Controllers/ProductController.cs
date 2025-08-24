using Microsoft.AspNetCore.Mvc;

namespace Ost_Ecommerce.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult CheckOut()
        {
            return View();
        }
        public IActionResult SingleProduct(int id)
        {
            ViewBag.productID = id;
            return View();
        }
        public IActionResult CategoryProduct(string id)
        {
            ViewBag.CategoryName = id;
            return View();
        }
    }
}
