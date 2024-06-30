using CalloriesApp.Helpers.DBClasses;
using CalloriesApp.Models;
using CalloriesApp.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CalloriesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DishController : ControllerBase
    {
        private readonly CalloriesDbContext _context;

        public DishController(CalloriesDbContext context)
        {
            _context = context;
        }

        // GET: api/Dish
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DishViewModel>>> GetDishes()
        {
            var dishes = await _context.Dishes
                                       .Include(d => d.DishProducts)
                                       .Include(d => d.MealHistories)
                                       .ToListAsync();

            var dishViewModels = dishes.Select(d => MapToViewModel(d)).ToList();
            return Ok(dishViewModels);
        }

        // GET: api/Dish/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DishViewModel>> GetDish(int id)
        {
            var dish = await _context.Dishes
                                     .Include(d => d.DishProducts)
                                     .Include(d => d.MealHistories)
                                     .FirstOrDefaultAsync(d => d.DishId == id);

            if (dish == null)
            {
                return BadRequest();
            }

            return Ok(MapToViewModel(dish));
        }

        // PUT: api/Dish/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDish(int id, DishViewModel dishViewModel)
        {
            if (id != dishViewModel.DishId)
            {
                return BadRequest();
            }

            var dish = await _context.Dishes
                                     .Include(d => d.DishProducts)
                                     .Include(d => d.MealHistories)
                                     .FirstOrDefaultAsync(d => d.DishId == id);

            if (dish == null)
            {
                return NotFound();
            }

            dish = MapToModel(dishViewModel, dish);

            _context.Entry(dish).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Dish
        [HttpPost]
        public async Task<ActionResult<DishViewModel>> PostDish(DishViewModel dishViewModel)
        {
            var dish = MapToModel(dishViewModel);

            _context.Dishes.Add(dish);
            await _context.SaveChangesAsync();

            return Ok(CreatedAtAction("GetDish", new { id = dish.DishId }, MapToViewModel(dish)));
        }

        // DELETE: api/Dish/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDish(int id)
        {
            var dish = await _context.Dishes.FindAsync(id);
            if (dish == null)
            {
                return NotFound();
            }

            _context.Dishes.Remove(dish);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool DishExists(int id)
        {
            return _context.Dishes.Any(e => e.DishId == id);
        }

        private DishViewModel MapToViewModel(Dish dish)
        {
            return new DishViewModel
            {
                DishId = dish.DishId,
                Name = dish.Name,
                Weight = dish.Weight,
                DishProductIds = dish.DishProducts?.Select(dp => dp.DishProductId).ToList(),
                MealHistoryIds = dish.MealHistories?.Select(mh => mh.MealHistoryId).ToList()
            };
        }

        private Dish MapToModel(DishViewModel dishViewModel, Dish dish = null)
        {
            dish = dish ?? new Dish();

            dish.DishId = dishViewModel.DishId;
            dish.Name = dishViewModel.Name;
            dish.Weight = dishViewModel.Weight;

            return dish;
        }
    }
}
