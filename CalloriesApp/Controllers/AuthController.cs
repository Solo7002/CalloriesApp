using CalloriesApp.Helpers.DBClasses;
using CalloriesApp.Models;
using CalloriesApp.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CalloriesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly CalloriesDbContext _context;
        public AuthController(CalloriesDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login(UserLoginModel model)
        {
            try
            {
                if (_context != null) { 
                User user = _context.Users.First(u => u.Login == model.Login);
                if (BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                {

                    var token = GenerateJwtToken(user.Login);

                    return Ok(new { token });
                }}
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
            return BadRequest();
           
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register(UserRegisterModel userRegisterModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                if (_context.Users.Any(u => u.Login == userRegisterModel.Login))
                {
                    return BadRequest($"Such login already exists");
                }
                

                string hashPassword = BCrypt.Net.BCrypt.HashPassword(userRegisterModel.Password, 10).ToString();
                User newUser = new User
                {
                    Login = userRegisterModel.Login,
                    Password = hashPassword,
                    Email=userRegisterModel.Email,
                    Aim=userRegisterModel.Aim,
                    Weight=userRegisterModel.Weight,
                    IsMan=userRegisterModel.IsMan,
                };

               

                _context.Users.Add(newUser);
                _context.SaveChanges();
                return Ok("User registered successfully.");
            }
        }
        private string GenerateJwtToken(string userName)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtkey = _configuration["Jwt:Key"];
            var key = jwtkey != null ? Encoding.ASCII.GetBytes(jwtkey) : null;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name,userName )
                   
                }),
                Expires = DateTime.UtcNow.Add(TimeSpan.FromHours(2)),//time live token,
                NotBefore = DateTime.UtcNow,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
