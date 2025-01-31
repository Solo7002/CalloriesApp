﻿using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models
{
    public class DishProduct
    {
        [Key]
        public int DishProductId { get; set; }

        [Required(ErrorMessage = "DishId is required.")]
        public int DishId { get; set; }
        public virtual Dish Dish { get; set; }

        [Required(ErrorMessage = "ProductId is required.")]
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Quantity must be a non-negative value.")]
        public double Quantity { get; set; }
    }
}
