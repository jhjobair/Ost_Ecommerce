using Microsoft.AspNetCore.Mvc;
using Ost_Ecommerce.Models;

namespace Ost_Ecommerce.Controllers
{
    public class ProductAPIController : Controller
    {
        public IActionResult Index()
        {
            List<Product> listProduct = new List<Product>();
            Product product = new Product();
            product.Name = "Leptop";
            product.Picture = "https://i.pinimg.com/736x/6b/63/55/6b6355e0923ac8b0d19757e996c969d6.jpg";
            product.Price = "100";
            product.Quantity = "10";
            listProduct.Add(product);
            product = new Product();
            product.Name = "Leptop";
            product.Picture = "/lib/Image/leptop.jpg";
            product.Price = "100";
            product.Quantity = "10";
            listProduct.Add(product); 
            product = new Product();
            product.Name = "Leptop";
            product.Picture = "/lib/Image/leptop.jpg";
            product.Price = "100";
            product.Quantity = "10";
            listProduct.Add(product);
            product = new Product();
            product.Name = "Leptop";
            product.Picture = "/lib/Image/leptop.jpg";
            product.Price = "100";
            product.Quantity = "10";
            listProduct.Add(product);
            product = new Product();
            product.Name = "Leptop";
            product.Picture = "https://i.pinimg.com/736x/6b/63/55/6b6355e0923ac8b0d19757e996c969d6.jpg";
            product.Price = "100";
            product.Quantity = "10";
            listProduct.Add(product);
            return Ok(listProduct);

        }
    }
}
