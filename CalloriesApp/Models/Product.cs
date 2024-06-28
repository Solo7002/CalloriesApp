namespace CalloriesApp.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public double Calories { get; set; }
        public double Fats { get; set; }
        public double Proteins { get; set; }
        public double Carbohydrates { get; set; }
        public virtual ICollection<DishProduct> DishProducts { get; set; }

        public virtual ICollection<MealHistory> MealHistories { get; set; }
        public Product() {
            DishProducts = new List<DishProduct>();
            MealHistories=new List<MealHistory>();
        }
    }
}
