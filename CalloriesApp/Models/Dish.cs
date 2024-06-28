namespace CalloriesApp.Models
{
    public class Dish
    {
        public int DishId { get; set; }
        public string Name { get; set; }
        public double Weight { get; set; }
        public virtual ICollection<DishProduct> DishProducts { get; set; }
        public virtual ICollection<MealHistory> MealHistories { get; set; }
        public Dish() {
        DishProducts=new List<DishProduct>();
        MealHistories=new List<MealHistory>();
        }

    }
}
