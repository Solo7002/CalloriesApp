using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models.ViewModels
{
    public class DishProductViewModel
    {
        [Required]
        public int DishProductId { get; set; }

        [Required(ErrorMessage = "DishId is required.")]
        public int DishId { get; set; }

        [Required(ErrorMessage = "ProductId is required.")]
        public int ProductId { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Quantity must be a non-negative value.")]
        public double Quantity { get; set; }
    }
}
