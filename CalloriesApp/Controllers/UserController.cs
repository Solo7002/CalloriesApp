using CalloriesApp.Helpers.DBClasses;
using CalloriesApp.Models;
using CalloriesApp.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CalloriesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CalloriesDbContext _context;

        public UserController(CalloriesDbContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            var userViewModels = users.Select(user => MapToViewModel(user)).ToList();
            return Ok(userViewModels);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserViewModel>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(MapToViewModel(user));
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserViewModel userViewModel)
        {
            if (id != userViewModel.UserId)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user = MapToModel(userViewModel, user);

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<UserViewModel>> PostUser(UserViewModel userViewModel)
        {
            var user = MapToModel(userViewModel);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(CreatedAtAction("GetUser", new { id = user.UserId }, MapToViewModel(user)));
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        private UserViewModel MapToViewModel(User user)
        {
            return new UserViewModel
            {
                UserId = user.UserId,
                Login = user.Login,
                Password = user.Password,
                Email = user.Email,
                Aim = user.Aim,
                Weight = user.Weight,
                IsMan = user.IsMan
            };
        }

        private User MapToModel(UserViewModel userViewModel, User user = null)
        {
            user = user ?? new User();

            user.UserId = userViewModel.UserId;
            user.Login = userViewModel.Login;
            user.Password = userViewModel.Password;
            user.Email = userViewModel.Email;
            user.Aim = userViewModel.Aim;
            user.Weight = userViewModel.Weight;
            user.IsMan = userViewModel.IsMan;

            return user;
        }
    }
}
