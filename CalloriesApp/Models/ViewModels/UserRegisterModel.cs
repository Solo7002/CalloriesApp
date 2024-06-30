using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models.ViewModels
{
    public class UserRegisterModel
    {
        [Required(ErrorMessage = "Login is required.")]
        [StringLength(50, ErrorMessage = "Login must not exceed 50 characters.")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }
        [Required(ErrorMessage = "The field must be filled")]
        [Compare(nameof(Password), ErrorMessage = "Values do not match")]
        public string ConfirmPassword { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        [StringLength(200, ErrorMessage = "Aim must not exceed 200 characters.")]
        public string Aim { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Weight must be a non-negative value.")]
        public double Weight { get; set; }

        public bool IsMan { get; set; }
    }
}
