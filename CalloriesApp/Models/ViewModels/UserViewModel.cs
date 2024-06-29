using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models.ViewModels
{
    public class UserViewModel
    {
        [Required]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Login is required.")]
        [StringLength(50, ErrorMessage = "Login must not exceed 50 characters.")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        [StringLength(200, ErrorMessage = "Aim must not exceed 200 characters.")]
        public string Aim { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Weight must be a non-negative value.")]
        public double Weight { get; set; }

        public bool IsMan { get; set; }

        public ICollection<int> MealHistoryIds { get; set; }

        public UserViewModel()
        {
            MealHistoryIds = new List<int>();
        }
    }
}
