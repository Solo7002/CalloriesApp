namespace CalloriesApp.Models
{
    public class DishProduct
    {
        public int DishProductId { get; set; }
        public int DishId { get; set; }
        public virtual Dish Dish { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public double Quantity { get; set; }
    }
}
