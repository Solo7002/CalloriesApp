using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models.ViewModels
{
    public class DishViewModel
    {
        [Required]
        public int DishId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string Name { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Weight must be a non-negative value.")]
        public double Weight { get; set; }

        public ICollection<int> DishProductIds { get; set; }
        public ICollection<int> MealHistoryIds { get; set; }

        public DishViewModel()
        {
            DishProductIds = new List<int>();
            MealHistoryIds = new List<int>();
        }
    }
}
