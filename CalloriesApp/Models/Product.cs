﻿using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        public string ProductName { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Calories must be a non-negative value.")]
        public double Calories { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Fats must be a non-negative value.")]
        public double Fats { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Proteins must be a non-negative value.")]
        public double Proteins { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Carbohydrates must be a non-negative value.")]
        public double Carbohydrates { get; set; }

        public virtual ICollection<DishProduct> DishProducts { get; set; }

        public virtual ICollection<MealHistory> MealHistories { get; set; }

        public Product()
        {
            DishProducts = new List<DishProduct>();
            MealHistories = new List<MealHistory>();
        }
    }
}
