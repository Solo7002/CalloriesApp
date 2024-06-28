namespace CalloriesApp.Models
{
    public class MealHistory
    {
        public int MealHistoryId { get; set; }
        public int? ProductId { get; set; }
        public virtual Product Product { get; set; }
        public int? DishId { get; set; }
        public virtual Dish Dish { get; set; }
        public int? UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime MealDateTime { get; set; }

    }
}
