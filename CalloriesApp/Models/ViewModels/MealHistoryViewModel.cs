using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models.ViewModels
{
    public class MealHistoryViewModel
    {
        [Required]
        public int MealHistoryId { get; set; }

        public int? ProductId { get; set; }
        public int? DishId { get; set; }
        public int? UserId { get; set; }

        public string? ProductName { get; set; }
        public string? DishName { get; set; }
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Meal date and time are required.")]
        public DateTime MealDateTime { get; set; }
    }
}
