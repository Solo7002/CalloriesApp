namespace CalloriesApp.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Aim { get; set; }
        public double Weight { get; set; }
        public bool IsMan { get; set; }
        public ICollection<MealHistory> MealHistories { get; set; }
        public User() {
        MealHistories = new List<MealHistory>();
        }
    }
}
