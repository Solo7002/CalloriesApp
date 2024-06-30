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
    public class MealHistoryController : ControllerBase
    {
        private readonly CalloriesDbContext _context;

        public MealHistoryController(CalloriesDbContext context)
        {
            _context = context;
        }

        // GET: api/MealHistory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MealHistoryViewModel>>> GetMealHistories()
        {
            var mealHistories = await _context.MealHistories
                                              .Include(mh => mh.Product)
                                              .Include(mh => mh.Dish)
                                              .Include(mh => mh.User)
                                              .ToListAsync();

            var mealHistoryViewModels = mealHistories.Select(mh => MapToViewModel(mh)).ToList();
            return Ok(mealHistoryViewModels);
        }

        // GET: api/MealHistory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MealHistoryViewModel>> GetMealHistory(int id)
        {
            var mealHistory = await _context.MealHistories
                                            .Include(mh => mh.Product)
                                            .Include(mh => mh.Dish)
                                            .Include(mh => mh.User)
                                            .FirstOrDefaultAsync(mh => mh.MealHistoryId == id);

            if (mealHistory == null)
            {
                return NotFound();
            }

            return Ok(MapToViewModel(mealHistory));
        }

        // PUT: api/MealHistory/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMealHistory(int id, MealHistoryViewModel mealHistoryViewModel)
        {
            if (id != mealHistoryViewModel.MealHistoryId)
            {
                return BadRequest();
            }

            var mealHistory = await _context.MealHistories
                                            .Include(mh => mh.Product)
                                            .Include(mh => mh.Dish)
                                            .Include(mh => mh.User)
                                            .FirstOrDefaultAsync(mh => mh.MealHistoryId == id);

            if (mealHistory == null)
            {
                return NotFound();
            }

            mealHistory = MapToModel(mealHistoryViewModel, mealHistory);

            _context.Entry(mealHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealHistoryExists(id))
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

        // POST: api/MealHistory
        [HttpPost]
        public async Task<ActionResult<MealHistoryViewModel>> PostMealHistory(MealHistoryViewModel mealHistoryViewModel)
        {
            var mealHistory = MapToModel(mealHistoryViewModel);

            _context.MealHistories.Add(mealHistory);
            await _context.SaveChangesAsync();

            return Ok(CreatedAtAction("GetMealHistory", new { id = mealHistory.MealHistoryId }, MapToViewModel(mealHistory)));
        }

        // DELETE: api/MealHistory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMealHistory(int id)
        {
            var mealHistory = await _context.MealHistories.FindAsync(id);
            if (mealHistory == null)
            {
                return NotFound();
            }

            _context.MealHistories.Remove(mealHistory);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool MealHistoryExists(int id)
        {
            return _context.MealHistories.Any(e => e.MealHistoryId == id);
        }

        private MealHistoryViewModel MapToViewModel(MealHistory mealHistory)
        {
            return new MealHistoryViewModel
            {
                MealHistoryId = mealHistory.MealHistoryId,
                ProductId = mealHistory.ProductId,
                DishId = mealHistory.DishId,
                UserId = mealHistory.UserId,
                MealDateTime = mealHistory.MealDateTime,
                ProductName = mealHistory.Product?.ProductName,
                DishName = mealHistory.Dish?.Name,
                UserName = mealHistory.User?.Login
            };
        }

        private MealHistory MapToModel(MealHistoryViewModel mealHistoryViewModel, MealHistory mealHistory = null)
        {
            mealHistory = mealHistory ?? new MealHistory();

            mealHistory.MealHistoryId = mealHistoryViewModel.MealHistoryId;
            mealHistory.ProductId = mealHistoryViewModel.ProductId;
            mealHistory.DishId = mealHistoryViewModel.DishId;
            mealHistory.UserId = mealHistoryViewModel.UserId;
            mealHistory.MealDateTime = mealHistoryViewModel.MealDateTime;

            return mealHistory;
        }
    }
}
