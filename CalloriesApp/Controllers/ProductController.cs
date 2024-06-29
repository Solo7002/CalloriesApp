using CalloriesApp.Helpers.DBClasses;
using CalloriesApp.Models;
using CalloriesApp.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CalloriesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly CalloriesDbContext _context;

        public ProductController(CalloriesDbContext context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductViewModel>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            var productViewModels = products.Select(p => MapToViewModel(p)).ToList();
            return Ok(productViewModels);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductViewModel>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return BadRequest();
            }

            return Ok(MapToViewModel(product));
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductViewModel productViewModel)
        {
            if (id != productViewModel.ProductId)
            {
                return BadRequest();
            }

            var product = MapToModel(productViewModel);
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return BadRequest();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ActionResult<ProductViewModel>> PostProduct(ProductViewModel productViewModel)
        {
            var product = MapToModel(productViewModel);
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(CreatedAtAction("GetProduct", new { id = product.ProductId }, MapToViewModel(product)));
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }

        private ProductViewModel MapToViewModel(Product product)
        {
            return new ProductViewModel
            {
                ProductId = product.ProductId,
                Calories = product.Calories,
                Fats = product.Fats,
                Proteins = product.Proteins,
                Carbohydrates = product.Carbohydrates,
                DishProductIds = product.DishProducts?.Select(dp => dp.DishProductId).ToList(),
                MealHistoryIds = product.MealHistories?.Select(mh => mh.MealHistoryId).ToList()
            };
        }

        private Product MapToModel(ProductViewModel productViewModel)
        {
            return new Product
            {
                ProductId = productViewModel.ProductId,
                Calories = productViewModel.Calories,
                Fats = productViewModel.Fats,
                Proteins = productViewModel.Proteins,
                Carbohydrates = productViewModel.Carbohydrates
            };
        }
    }
}
