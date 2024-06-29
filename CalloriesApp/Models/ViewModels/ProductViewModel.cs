using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models.ViewModels
{
    public class ProductViewModel
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Calories must be a non-negative value.")]
        public double Calories { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Fats must be a non-negative value.")]
        public double Fats { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Proteins must be a non-negative value.")]
        public double Proteins { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Carbohydrates must be a non-negative value.")]
        public double Carbohydrates { get; set; }

        public ICollection<int> DishProductIds { get; set; }
        public ICollection<int> MealHistoryIds { get; set; }

        public ProductViewModel()
        {
            DishProductIds = new List<int>();
            MealHistoryIds = new List<int>();
        }
    }
}
