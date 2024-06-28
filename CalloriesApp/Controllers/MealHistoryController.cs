using CalloriesApp.Helpers.DBClasses;
using CalloriesApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CalloriesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealHistoryController : ControllerBase
    {
        private readonly CalloriesDbContext _context;

        public MealHistoryController(CalloriesDbContext context)
        {
            _context = context;
        }

        // GET: api/MealHistory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MealHistory>>> GetMealHistories()
        {
            return await _context.MealHistories.ToListAsync();
        }

        // GET: api/MealHistory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MealHistory>> GetMealHistory(int id)
        {
            var mealHistory = await _context.MealHistories.FindAsync(id);

            if (mealHistory == null)
            {
                return NotFound();
            }

            return mealHistory;
        }

        // PUT: api/MealHistory/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMealHistory(int id, MealHistory mealHistory)
        {
            if (id != mealHistory.MealHistoryId)
            {
                return BadRequest();
            }

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

            return NoContent();
        }

        // POST: api/MealHistory
        [HttpPost]
        public async Task<ActionResult<MealHistory>> PostMealHistory(MealHistory mealHistory)
        {
            _context.MealHistories.Add(mealHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMealHistory", new { id = mealHistory.MealHistoryId }, mealHistory);
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

            return NoContent();
        }

        private bool MealHistoryExists(int id)
        {
            return _context.MealHistories.Any(e => e.MealHistoryId == id);
        }
    }
}
