using CalloriesApp.Helpers.DBClasses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CalloriesApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly CalloriesDbContext _context;
        public WeatherForecastController(ILogger<WeatherForecastController> logger,CalloriesDbContext context)
        {
            _logger = logger;
            _context=context;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            _context.Products.Add(new Models.Product {Calories=50,Carbohydrates=50,Fats=50,Proteins=50});
            _context.SaveChanges();

            foreach (var item in _context.Products)
            {
                Console.WriteLine(item.Proteins);
            }
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
